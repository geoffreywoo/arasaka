import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { caseId, dossiers, fieldStories } from "./archive-content.mjs";
import { pages, assets } from "./site-content.mjs";

assert.equal(dossiers.length, 5);
assert.equal(new Set(dossiers.map(d => d.id)).size, 5);
assert.deepEqual(dossiers.map(d => d.day), [0,18,26,31,44]);
const ids = new Set(pages.map(p => p.id));
for (const d of dossiers) {
  assert(ids.has(d.id) && ids.has(d.publicPage) && assets[d.image]);
  assert(d.code.includes("0417"));
  const words = d.sections.map(s => s[1].en).join(" ").split(/\s+/).length;
  assert(words >= 350 && words <= 650, `${d.id}: ${words} words`);
  for (const [heading, copy] of d.sections) {
    assert(heading.en && heading.ja && copy.en && copy.ja);
    assert(copy.ja.length > 100, `${d.id}: abbreviated translation`);
  }
  for (const prefix of ["", "ja/"]) {
    const html = await readFile(new URL(`../${prefix}archive/${d.id}/index.html`, import.meta.url), "utf8");
    assert(html.includes(caseId) && html.includes('class="shell record-navigation"'));
    assert(html.includes('class="shell archive-disclosure"') && html.includes('class="redaction"'));
    assert(!/password|type="password"|localStorage|setInterval/.test(html));
  }
}
for (const p of pages.filter(p => p.section !== "archive")) {
  const story = fieldStories[p.id];
  assert(story && assets[story.image], `Missing public narrative: ${p.id}`);
  assert(ids.has(story.dossier || story.target));
}
console.log("PASS: five complete bilingual dossiers, chronology, case identity, public discovery, and fiction boundaries");
