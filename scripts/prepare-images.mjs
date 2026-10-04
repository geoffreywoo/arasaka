import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { assets, pages, languages } from "./site-content.mjs";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const lucide = require("lucide");
const root = resolve(import.meta.dirname, "..");
const inputs = JSON.parse(await readFile(resolve(root, "assets/generation-inputs.json"), "utf8"));
const metadata = {};
await mkdir(resolve(root, "assets/social"), { recursive: true });
for (const [key, { source, mobileSource }] of Object.entries(inputs)) {
  const input = resolve(root, source), asset = assets[key];
  const dimensions = await sharp(input).metadata();
  metadata[key] = { width: dimensions.width, height: dimensions.height };
  for (const width of [480, 960, 1600]) {
    await sharp(input).resize({ width }).jpeg({ quality: 82, mozjpeg: true }).toFile(resolve(root, `assets/${asset.stem}-${width}.jpg`));
    await sharp(input).resize({ width }).webp({ quality: 80 }).toFile(resolve(root, `assets/${asset.stem}-${width}.webp`));
  }
  if (key === "relic") {
    await sharp(resolve(root, mobileSource)).resize({ width: 720 }).webp({ quality: 82 }).toFile(resolve(root, `assets/${asset.stem}-mobile.webp`));
  } else if (key === "shingen" || key === "yukimura") {
    const photo = await sharp(input).resize({ width: 720 }).toBuffer();
    await sharp({ create: { width: 720, height: 1080, channels: 3, background: "#e5e7e9" } }).composite([{ input: photo, left: 0, top: 540 }]).webp({ quality: 82 }).toFile(resolve(root, `assets/${asset.stem}-mobile.webp`));
  }
}
await writeFile(resolve(root, "assets/image-manifest.json"), JSON.stringify(metadata, null, 2) + "\n");

const wordmark = await sharp(resolve(root, "assets/arasaka-wordmark-clean-white.png")).resize({ width: 320 }).toBuffer();
const mark = await sharp(resolve(root, "assets/arasaka-mark-white.png")).resize(54, 54).toBuffer();
for (const page of pages) {
  const backdrop = await sharp(resolve(root, `assets/${assets[page.image].stem}-1600.jpg`)).resize(1200, 630, { fit: "cover" }).toBuffer();
  const caption = page.id.toUpperCase().replaceAll("-", " / ");
  const overlay = Buffer.from(`<svg width="1200" height="630"><rect y="480" width="1200" height="150" fill="#101112"/><rect x="40" y="480" width="1120" height="2" fill="#d6342c"/><text x="870" y="568" fill="#f0f1f2" font-size="18" font-family="Arial">${caption}</text></svg>`);
  const social = await sharp(backdrop).composite([{ input: overlay }, { input: mark, left: 42, top: 530 }, { input: wordmark, left: 118, top: 532 }]).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  for (const lang of languages) await writeFile(resolve(root, `assets/social/${page.id}-${lang}.jpg`), social);
}

// Vendor only the three Lucide paths used by the static interface.
const icons = ["Menu", "X", "ArrowUpRight"].map(name => {
  const node = lucide.icons[name];
  const paths = node.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([key,value]) => `${key}="${value}"`).join(" ")}/>`).join("");
  const id = name.replace(/[A-Z]/g, (c,i) => `${i ? "-" : ""}${c.toLowerCase()}`);
  return `<symbol id="icon-${id}" viewBox="0 0 24 24">${paths}</symbol>`;
}).join("");
await writeFile(resolve(root, "assets/icons.svg"), `<svg class="icon-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${icons}</svg>\n`);
console.log(`Prepared ${Object.keys(inputs).length} images, responsive derivatives, and ${pages.length * languages.length} social cards.`);
