#!/usr/bin/env python3
"""Verify all generated localized pages using only the Python standard library."""
import hashlib
import json
import re
from collections import Counter
from datetime import date, datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = json.loads((ROOT / "scripts/page-manifest.json").read_text())
ORIGIN, PAGES = MANIFEST["origin"], MANIFEST["pages"]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.assets = set(), [], []
        self.alternates, self.language_links, self.meta = {}, {}, {}
        self.project_links, self.jsonld, self.errors = [], [], []
        self.h1_count = self.forms = 0
        self.canonical = self.lang = self.title = ""
        self.capture = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            if a["id"] in self.ids:
                self.errors.append(f"duplicate id {a['id']}")
            self.ids.add(a["id"])
        if tag == "html": self.lang = a.get("lang", "")
        if tag == "h1": self.h1_count += 1
        if tag == "form": self.forms += 1
        if tag == "title": self.capture = "title"
        if tag == "script" and a.get("type") == "application/ld+json": self.capture = "jsonld"
        if tag == "meta": self.meta[a.get("name", a.get("property", ""))] = a.get("content", "")
        if tag == "link":
            if a.get("rel") == "canonical": self.canonical = a["href"]
            elif a.get("rel") == "alternate": self.alternates[a["hreflang"]] = a["href"]
            elif a.get("href"): self.assets.append(a["href"])
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
            if "data-language-link" in a: self.language_links[a["lang"]] = a["href"]
            if "footer-project-link" in a.get("class", "").split(): self.project_links.append(a["href"])
        if tag in {"img", "script"} and a.get("src"): self.assets.append(a["src"])
        if tag in {"img", "source"} and a.get("srcset"):
            self.assets.extend(item.strip().split()[0] for item in a["srcset"].split(","))
        if tag == "img" and ("alt" not in a or not a.get("width", "").isdigit() or not a.get("height", "").isdigit()):
            self.errors.append(f"missing alt or dimensions: {a.get('src')}")

    def handle_data(self, data):
        if self.capture == "title": self.title += data
        elif self.capture == "jsonld": self.jsonld.append(json.loads(data))

    def handle_endtag(self, tag):
        if tag in {"title", "script"}: self.capture = None


def target(page, raw):
    u = urlsplit(raw)
    if u.netloc and f"{u.scheme}://{u.netloc}" != ORIGIN: return None, u.fragment
    if u.scheme and not u.netloc: return None, u.fragment
    path = unquote(u.path)
    candidate = ROOT / path.lstrip("/") if path.startswith("/") else page.parent / path if path else page
    if path.endswith("/") or candidate.is_dir(): candidate /= "index.html"
    return candidate.resolve(), u.fragment


def main():
    failures, parsed, inbound = [], {}, Counter()
    def check(condition, message):
        if not condition: failures.append(message)
    expected = {p["file"] for p in PAGES}
    actual = {str(p.relative_to(ROOT)) for p in ROOT.rglob("index.html") if not {".git", ".vercel", "node_modules"}.intersection(p.relative_to(ROOT).parts)}
    check(actual == expected, f"Route coverage mismatch: {actual ^ expected}")
    check(len(PAGES) == 28 and Counter(p["lang"] for p in PAGES) == {"en": 14, "ja": 14}, "Expected 14 EN and 14 JA pages")
    titles, descriptions = set(), set()
    for entry in PAGES:
        page = ROOT / entry["file"]
        if not page.exists(): continue
        raw = page.read_text(encoding="utf-8")
        p = PageParser()
        p.feed(raw)
        parsed[page.resolve()] = p
        prefix = entry["route"] + ": "
        check(p.lang == entry["lang"] and p.h1_count == 1, prefix + "incorrect language or h1 count")
        check(not p.forms and not any(a.startswith("mailto:") for a in p.links), prefix + "fictional inquiry routing")
        check(p.canonical == ORIGIN + entry["route"], prefix + "wrong self canonical")
        check(p.title == entry["title"] and p.title not in titles, prefix + "incorrect or duplicate title")
        titles.add(p.title)
        description = p.meta.get("description", "")
        check(bool(description) and description not in descriptions, prefix + "empty or duplicate description")
        descriptions.add(description)
        check(p.meta.get("og:url") == p.canonical and p.meta.get("og:image") == ORIGIN + entry["social"], prefix + "OG metadata mismatch")
        check(p.meta.get("twitter:card") == "summary_large_image", prefix + "missing social card")
        check(p.project_links == ["https://x.com/geoffwoo"], prefix + "incorrect credit")
        check(not any(s in raw for s in ["antifund.com", "instagram.com", "geoffreywoo.com"]), prefix + "retired personal links")
        check(p.alternates == {**entry["alternates"], "x-default": entry["alternates"]["en"]}, prefix + "hreflang mismatch")
        check(set(p.language_links) == {"en", "ja"}, prefix + "missing ordinary language links")
        for lang, href in p.language_links.items():
            check(target(page, href)[0] == target(page, entry["alternates"][lang])[0], prefix + "wrong language destination")
        check(hashlib.sha256(raw.encode()).hexdigest() == entry["hash"], prefix + "HTML hash mismatch")
        check(date.fromisoformat(entry["lastmod"]) <= datetime.now(timezone.utc).date(), prefix + "future lastmod")
        check(bool(p.jsonld) and "speculative" in str(p.jsonld), prefix + "missing honest structured data")
        check("FinancialService" not in raw and '"@type":"Corporation"' not in raw, prefix + "misleading organization schema")
        check(not p.errors, prefix + str(p.errors))
        if entry["lang"] == "ja": check(bool(re.search(r"[\u3040-\u30ff]", raw)), prefix + "missing rendered Japanese")
        for asset in p.assets + [entry["image"], entry["social"]]:
            file, _ = target(page, asset)
            check(file is None or file.is_file(), prefix + "missing asset " + asset)
    for file, p in parsed.items():
        for href in p.links:
            dest, fragment = target(file, href)
            if dest is None: continue
            check(dest.is_file(), f"{file.relative_to(ROOT)}: broken link {href}")
            if dest in parsed:
                if dest != file: inbound[dest] += 1
                check(not fragment or fragment in parsed[dest].ids, f"{file.relative_to(ROOT)}: missing fragment {href}")
    for file in parsed: check(inbound[file] > 0, f"Orphaned page: {file.relative_to(ROOT)}")
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9", "x": "http://www.w3.org/1999/xhtml", "i": "http://www.google.com/schemas/sitemap-image/1.1"}
    entries = ET.parse(ROOT / "sitemap.xml").getroot().findall("s:url", ns)
    sitemap = {e.findtext("s:loc", namespaces=ns): e for e in entries}
    check(set(sitemap) == {ORIGIN + p["route"] for p in PAGES} and len(entries) == 28, "Sitemap coverage mismatch")
    for p in PAGES:
        e = sitemap.get(ORIGIN + p["route"])
        if e is None: continue
        check(e.findtext("s:lastmod", namespaces=ns) == p["lastmod"], p["route"] + ": sitemap date mismatch")
        check(e.findtext("i:image/i:loc", namespaces=ns) == ORIGIN + p["image"], p["route"] + ": image sitemap mismatch")
        check({a.get("hreflang"): a.get("href") for a in e.findall("x:link", ns)} == {**p["alternates"], "x-default": p["alternates"]["en"]}, p["route"] + ": sitemap alternates mismatch")
    redirects = json.loads((ROOT / "vercel.json").read_text())["redirects"]
    routes = {p["route"] for p in PAGES}
    check(len({r["source"] for r in redirects}) == len(redirects), "Duplicate redirect sources")
    for r in redirects: check(r["destination"] in routes and r["permanent"] and r["source"] not in routes, f"Conflicting/invalid redirect: {r}")
    retired = {"/products/soulkiller/": "/research/engram-technology/", "/products/securenet/": "/businesses/security/", "/products/perimeter/": "/businesses/security/", "/products/custody/": "/businesses/banking/", "/industries/": "/businesses/"}
    for old, dest in retired.items():
        for prefix in ["", "/ja"]: check(any(r["source"] == prefix + old and r["destination"] == prefix + dest for r in redirects), "Missing redirect " + prefix + old)
    check(f"Sitemap: {ORIGIN}/sitemap.xml" in (ROOT / "robots.txt").read_text(), "robots.txt sitemap mismatch")
    if failures:
        print("Site verification failed:\n" + "\n".join("- " + f for f in failures))
        raise SystemExit(1)
    print(f"PASS: 28 localized pages; links, assets, metadata, language pairs, sitemap, and {len(redirects)} redirects")


if __name__ == "__main__": main()
