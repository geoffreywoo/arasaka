import { createRequire } from "node:module";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = resolve(import.meta.dirname, "..");
const { pages } = JSON.parse(await readFile(resolve(root, "scripts/page-manifest.json"), "utf8"));
const base = process.env.SITE_URL || "http://127.0.0.1:4187";
const output = resolve(root, process.env.TEST_RESULTS || "test-results/browser");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const failures = [], checks = [], screenshots = [];
const cookies = process.env.BROWSER_COOKIE_JAR ? (await readFile(process.env.BROWSER_COOKIE_JAR, "utf8")).split("\n").map(line => line.replace(/^#HttpOnly_/, "")).filter(line => !line.startsWith("#") && line.split("\t").length === 7).map(line => {
  const [domain, , path, secure, expires, name, value] = line.split("\t");
  return { domain, path, secure: secure === "TRUE", expires: Number(expires) || -1, name, value };
}) : [];
const context = await browser.newContext();
if (cookies.length) await context.addCookies(cookies);
const page = await context.newPage();
page.on("pageerror", error => failures.push(`JS: ${error.message}`));
page.on("console", message => { if (message.type() === "error") failures.push(`Console: ${message.text()}`); });

try {
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    for (const entry of pages) {
      const response = await page.goto(base + entry.route, { waitUntil: "load" });
      if (response.status() !== 200) failures.push(`${entry.route} ${width}: HTTP ${response.status()}`);
      await page.evaluate(async () => {
        const images = [...document.images];
        images.forEach(img => img.loading = "eager");
        await Promise.all(images.map(img => img.complete ? null : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; })));
        await Promise.all(images.map(img => img.decode().catch(() => {})));
      });
      const result = await page.evaluate(() => {
        const overflow = [...document.querySelectorAll("main *, header *, footer *")].filter(el => {
          const r = el.getBoundingClientRect();
          return el.checkVisibility() && r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(el).position !== "absolute";
        }).map(el => `${el.tagName}.${el.className}`).slice(0, 5);
        return { scrollWidth: document.documentElement.scrollWidth, width: innerWidth, overflow, brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.currentSrc), h1: document.querySelector("h1").innerText, language: document.documentElement.lang };
      });
      if (result.scrollWidth > width || result.overflow.length || result.brokenImages.length) failures.push(`${entry.route} ${width}: ${JSON.stringify(result)}`);
      if (result.language !== entry.lang) failures.push(`${entry.route}: incorrect language`);
      if (width <= 768) {
        const menu = page.locator("[data-mobile-menu]");
        await menu.locator("summary").focus();
        await page.keyboard.press("Enter");
        if (await menu.getAttribute("open") === null) failures.push(`${entry.route}: keyboard menu failed`);
        const navLink = menu.locator("nav a").first();
        await navLink.focus();
        await page.keyboard.press("Escape");
        if (await menu.getAttribute("open") !== null) failures.push(`${entry.route}: Escape did not close menu`);
        if (!await menu.locator("summary").evaluate(el => el === document.activeElement)) failures.push(`${entry.route}: menu focus not restored`);
      }
      checks.push({ route: entry.route, width, status: response.status(), ...result });
      if ((width === 390 && ["home", "shingen", "mikoshi", "company", "banking", "engram-technology"].includes(entry.id)) || (width === 1440 && ["home", "products", "company", "engram-technology"].includes(entry.id))) {
        const file = `${entry.id}-${entry.lang}-${width}.png`;
        await page.locator("summary").evaluate(el => el.blur());
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: resolve(output, file), animations: "disabled" });
        screenshots.push(file);
      }
    }
    console.log(`Checked ${pages.length} pages at ${width}px`);
  }
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  if (cookies.length) await noJS.addCookies(cookies);
  const plain = await noJS.newPage();
  for (const entry of pages) {
    await plain.goto(base + entry.route);
    if (!await plain.locator("h1").isVisible()) failures.push(`${entry.route}: content missing without JS`);
    await plain.locator("summary").click();
    if (!await plain.locator(".mobile-menu nav a").first().isVisible()) failures.push(`${entry.route}: no-JS menu missing`);
    const alt = plain.locator(`.language-switch a[lang="${entry.lang === "en" ? "ja" : "en"}"]`);
    await alt.click();
    if (plain.url() !== base + new URL(entry.alternates[entry.lang === "en" ? "ja" : "en"]).pathname) failures.push(`${entry.route}: no-JS language link failed`);
  }
  await noJS.close();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "/products/shingen/");
  const before = await page.locator("[data-scramble]").allTextContents();
  await page.waitForTimeout(600);
  const after = await page.locator("[data-scramble]").allTextContents();
  if (JSON.stringify(before) !== JSON.stringify(after)) failures.push("Reduced motion scramble changed");
  if (await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior) !== "auto") failures.push("Reduced motion smooth scroll remains");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base + "/products/relic/#profile");
  await page.locator('.language-switch a[lang="ja"]').click();
  if (!page.url().endsWith("/ja/products/relic/#profile")) failures.push("Language switch lost fragment");
  await writeFile(resolve(output, "report.json"), JSON.stringify({ base, checkedAt: new Date().toISOString(), viewportChecks: checks.length, noJavaScriptPages: pages.length, checks, screenshots, failures }, null, 2) + "\n");
  console.log(`${failures.length ? "FAIL" : "PASS"}: ${checks.length} viewport checks, 28 no-JS pages, keyboard navigation, language links, reduced motion`);
  if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
} finally {
  await browser.close();
}
