import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(resolve(root, "scripts/page-manifest.json"), "utf8"));
const config = JSON.parse(await readFile(resolve(root, "vercel.json"), "utf8"));
const base = process.env.SITE_URL || manifest.origin;
const output = resolve(root, process.env.TEST_RESULTS || "test-results/live");
const headers = {};
if (process.env.BROWSER_COOKIE_JAR) {
  // Accept only the scoped cookie jar created by Vercel's authenticated curl.
  const lines = (await readFile(process.env.BROWSER_COOKIE_JAR, "utf8")).split("\n").map(line => line.replace(/^#HttpOnly_/, ""));
  headers.Cookie = lines.filter(line => !line.startsWith("#") && line.split("\t").length === 7).filter(line => new URL(base).hostname === line.split("\t")[0].replace(/^\./, "")).map(line => { const fields = line.split("\t"); return `${fields[5]}=${fields[6]}`; }).join("; ");
}
const failures = [], checks = [];
const hash = value => createHash("sha256").update(value).digest("hex");
for (const entry of manifest.pages) {
  const response = await fetch(base + entry.route, { headers, redirect: "manual" });
  let body = await response.text();
  const localHTML = await readFile(resolve(root, entry.file), "utf8");
  const trailer = body.slice(localHTML.length);
  if (base !== manifest.origin && body.startsWith(localHTML) && /^<script async data-explicit-opt-in="true" data-deployment-id="dpl_[A-Za-z0-9]+" src="https:\/\/vercel\.live\/_next-live\/feedback\/feedback\.js"><\/script>$/.test(trailer)) body = localHTML;
  if (response.status !== 200 || hash(body) !== entry.hash) failures.push(`${entry.route}: status/content mismatch (${response.status})`);
  if (response.headers.get("x-content-type-options") !== "nosniff") failures.push(`${entry.route}: missing security header`);
  if (base === manifest.origin && /noindex/i.test(response.headers.get("x-robots-tag") || "")) failures.push(`${entry.route}: production is noindex`);
  checks.push({ route: entry.route, status: response.status, hash: hash(body) });
}
for (const path of new Set(manifest.pages.flatMap(entry => [entry.image, entry.social]).concat(["/styles.css", "/app.js", "/robots.txt", "/sitemap.xml"]))) {
  const response = await fetch(base + path, { headers });
  const remote = Buffer.from(await response.arrayBuffer());
  const local = await readFile(resolve(root, path.slice(1)));
  if (response.status !== 200 || hash(remote) !== hash(local)) failures.push(`${path}: status/asset mismatch (${response.status})`);
  checks.push({ asset: path, status: response.status, bytes: remote.length });
}
for (const rule of config.redirects) {
  const path = rule.source.replace(":path*", "legacy-check");
  const response = await fetch(base + path, { headers, redirect: "manual" });
  const location = response.headers.get("location");
  const destination = location ? new URL(location, base).pathname : null;
  if (response.status !== 308 || destination !== rule.destination) failures.push(`${path}: expected 308 to ${rule.destination}, got ${response.status} to ${destination}`);
  checks.push({ redirect: path, status: response.status, destination });
}
await mkdir(output, { recursive: true });
await writeFile(resolve(output, "report.json"), JSON.stringify({ base, checkedAt: new Date().toISOString(), failures, checks }, null, 2) + "\n");
console.log(`${failures.length ? "FAIL" : "PASS"}: 28 live HTML hashes, shared assets/sitemap, ${config.redirects.length} permanent redirects`);
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
