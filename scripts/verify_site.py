#!/usr/bin/env python3

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent.parent
EXPECTED_PAGES = {
    Path("index.html"),
    Path("products/index.html"),
    Path("products/relic/index.html"),
    Path("products/securenet/index.html"),
    Path("products/custody/index.html"),
    Path("products/perimeter/index.html"),
    Path("industries/index.html"),
    Path("research/index.html"),
    Path("company/index.html"),
    Path("contact/index.html"),
}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.assets = []
        self.h1_count = 0
        self.images_without_alt = []
        self.empty_japanese = []
        self.operation_sections = 0
        self.operation_metric_lists = 0
        self.project_links = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        classes = set(attributes.get("class", "").split())

        if attributes.get("id"):
            self.ids.add(attributes["id"])

        if tag == "h1":
            self.h1_count += 1

        if tag == "a" and "href" in attributes:
            self.links.append(attributes["href"])
            if "footer-project-link" in classes:
                self.project_links.append(attributes["href"])

        if tag in {"img", "script"} and attributes.get("src"):
            self.assets.append(attributes["src"])

        if tag == "link" and attributes.get("href"):
            self.assets.append(attributes["href"])

        if tag == "img" and "alt" not in attributes:
            self.images_without_alt.append(attributes.get("src", "<unknown>"))

        if "data-ja" in attributes and not attributes["data-ja"].strip():
            self.empty_japanese.append(tag)

        if "data-alt-ja" in attributes and not attributes["data-alt-ja"].strip():
            self.empty_japanese.append(f"{tag}[data-alt-ja]")

        if tag == "section" and "product-operation" in classes:
            self.operation_sections += 1

        if tag == "dl" and "operation-metrics" in classes:
            self.operation_metric_lists += 1


def target_file(source_page, raw_url):
    parsed = urlsplit(raw_url)
    if parsed.scheme or parsed.netloc or raw_url.startswith(("mailto:", "tel:")):
        return None, parsed.fragment

    path = unquote(parsed.path)
    if path.startswith("/"):
        candidate = ROOT / path.lstrip("/")
    elif path:
        candidate = source_page.parent / path
    else:
        candidate = source_page

    candidate = candidate.resolve()
    try:
        candidate.relative_to(ROOT)
    except ValueError:
        return candidate, parsed.fragment

    if path.endswith("/") or candidate.is_dir():
        candidate = candidate / "index.html"
    elif not candidate.suffix:
        directory_index = candidate / "index.html"
        html_file = candidate.with_suffix(".html")
        candidate = directory_index if directory_index.exists() else html_file

    return candidate, parsed.fragment


def parse_page(path):
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def main():
    failures = []
    actual_pages = {
        path.relative_to(ROOT)
        for path in ROOT.rglob("index.html")
        if not {".git", ".vercel"}.intersection(path.relative_to(ROOT).parts)
    }

    missing_pages = EXPECTED_PAGES - actual_pages
    unexpected_pages = actual_pages - EXPECTED_PAGES
    if missing_pages:
        failures.append(f"Missing canonical pages: {sorted(map(str, missing_pages))}")
    if unexpected_pages:
        failures.append(f"Unexpected HTML routes: {sorted(map(str, unexpected_pages))}")

    parsed_pages = {}
    for relative_path in sorted(EXPECTED_PAGES):
        page = ROOT / relative_path
        if not page.exists():
            continue

        parser = parse_page(page)
        parsed_pages[page.resolve()] = parser

        if parser.h1_count != 1:
            failures.append(f"{relative_path}: expected one h1, found {parser.h1_count}")
        if parser.images_without_alt:
            failures.append(f"{relative_path}: images missing alt: {parser.images_without_alt}")
        if parser.empty_japanese:
            failures.append(f"{relative_path}: empty data-ja attributes on {parser.empty_japanese}")
        if parser.project_links != ["https://x.com/geoffwoo"]:
            failures.append(f"{relative_path}: expected one Geoff Woo X link, found {parser.project_links}")

        is_product_detail = (
            len(relative_path.parts) == 3
            and relative_path.parts[0] == "products"
        )
        expected_operation_count = 1 if is_product_detail else 0
        if parser.operation_sections != expected_operation_count:
            failures.append(
                f"{relative_path}: expected {expected_operation_count} product operation section, "
                f"found {parser.operation_sections}"
            )
        if parser.operation_metric_lists != expected_operation_count:
            failures.append(
                f"{relative_path}: expected {expected_operation_count} operation metric list, "
                f"found {parser.operation_metric_lists}"
            )

        for asset_url in parser.assets:
            target, _ = target_file(page, asset_url)
            if target is not None and not target.exists():
                failures.append(f"{relative_path}: missing asset {asset_url}")

    for relative_path in sorted(EXPECTED_PAGES):
        page = (ROOT / relative_path).resolve()
        parser = parsed_pages.get(page)
        if parser is None:
            continue

        for link_url in parser.links:
            target, fragment = target_file(page, link_url)
            if target is None:
                continue
            if not target.exists():
                failures.append(f"{relative_path}: broken internal link {link_url}")
                continue
            if fragment and target.suffix == ".html":
                target_parser = parsed_pages.get(target.resolve()) or parse_page(target)
                if fragment not in target_parser.ids:
                    failures.append(f"{relative_path}: missing fragment #{fragment} in {target.relative_to(ROOT)}")

    if failures:
        print("Site verification failed:")
        for failure in failures:
            print(f"- {failure}")
        raise SystemExit(1)

    print(f"Verified {len(EXPECTED_PAGES)} canonical pages, internal links, fragments, and assets")


if __name__ == "__main__":
    main()
