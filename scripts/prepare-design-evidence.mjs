import { createRequire } from "node:module";
import { resolve } from "node:path";
import { mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = resolve(import.meta.dirname, "..");
const screenshots = resolve(root, process.env.TEST_RESULTS || "test-results/imperial-final");
const target = process.env.DESIGN_REFERENCE;
if (!target) throw new Error("Set DESIGN_REFERENCE to the selected desktop/mobile design board.");
const destination = resolve(root, "docs/screenshots");
await mkdir(destination, { recursive: true });
const desktop = resolve(screenshots, "home-en-1440.png");
const mobile = resolve(screenshots, "home-en-390.png");
for (const [input, name] of [[desktop,"desktop"],[mobile,"mobile"],[resolve(screenshots,"archive-en-1440.png"),"archive"]]) {
  await sharp(input).jpeg({quality:86}).toFile(resolve(destination,name+".jpg"));
}

// The supplied board is 1586x992: desktop at x21..1210, mobile at x1222..1585.
const targetDesktop = await sharp(target).extract({left:21,top:0,width:1189,height:960}).resize(720,581).toBuffer();
const actualDesktop = await sharp(desktop).resize(720,500).extend({bottom:81,background:"#fff"}).toBuffer();
const targetMobile = await sharp(target).extract({left:1222,top:0,width:364,height:992}).resize(286,780).toBuffer();
const actualMobile = await sharp(mobile).resize(286,619).extend({bottom:161,background:"#fff"}).toBuffer();
await sharp({create:{width:1460,height:1381,channels:3,background:"#e2e4e7"}}).composite([
  {input:targetDesktop,left:0,top:0},{input:actualDesktop,left:740,top:0},
  {input:targetMobile,left:215,top:601},{input:actualMobile,left:955,top:601}
]).jpeg({quality:90}).toFile(resolve(destination,"design-comparison.jpg"));
