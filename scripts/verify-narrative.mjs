import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { caseId, dossiers, fieldStories } from "./archive-content.mjs";
import { pages, assets } from "./site-content.mjs";
import { networkProfiles, networkRecords, connections, inspections, institutionalEntities } from "./network-content.mjs";

assert.equal(dossiers.length, 5);
assert.equal(new Set(dossiers.map(d => d.id)).size, 5);
assert.deepEqual(dossiers.map(d => d.day), [0,18,26,31,44]);
const ids = new Set(pages.map(p => p.id));
for (const d of [...dossiers,...networkRecords]) {
  assert(ids.has(d.id) && ids.has(d.publicPage) && assets[d.image]);
  assert(d.code.includes(networkRecords.includes(d) ? "1102" : "0417"));
  const words = d.sections.map(s => s[1].en).join(" ").split(/\s+/).length;
  assert(words >= 350 && words <= 650, `${d.id}: ${words} words`);
  for (const [heading, copy] of d.sections) {
    assert(heading.en && heading.ja && copy.en && copy.ja);
    assert(copy.ja.length > 100, `${d.id}: abbreviated translation`);
  }
  for (const prefix of ["", "ja/"]) {
    const html = await readFile(new URL(`../${prefix}archive/${d.id}/index.html`, import.meta.url), "utf8");
    assert(html.includes(d.caseId || caseId) && html.includes('class="shell record-navigation"'));
    assert(html.includes('class="shell archive-disclosure"') && html.includes('class="redaction"'));
    assert(!/password|type="password"|localStorage|setInterval/.test(html));
  }
}
for (const p of pages.filter(p => p.section !== "archive")) {
  const story = fieldStories[p.id];
  assert((story && assets[story.image]) || networkProfiles.some(n=>n.id===p.id), `Missing public narrative: ${p.id}`);
  if (story) assert(ids.has(story.dossier || story.target));
}
assert.deepEqual(networkRecords.map(d=>d.day),[0,1,7]);
const graph = JSON.parse(await readFile(new URL("../assets/institutional-relationships.json",import.meta.url),"utf8"));
const entityIds = new Set(graph.entities.map(e=>e.id));
assert.equal(entityIds.size,graph.entities.length);
for (const edge of graph.edges) assert(entityIds.has(edge.from) && entityIds.has(edge.to));
for (const entity of institutionalEntities) {
  const page = pages.find(p=>p.id===entity.page);
  for (const prefix of ["","ja"]) {
    const html = await readFile(new URL(`..${prefix ? "/"+prefix : ""}${page.route}index.html`,import.meta.url),"utf8");
    assert(html.includes(`id="${entity.anchor}"`),`Missing entity destination: ${entity.id}`);
  }
}
for (const [from,related] of Object.entries(connections)) { assert(ids.has(from)); for (const id of related) assert(ids.has(id)); }
for (const [id,views] of Object.entries(inspections)) { assert(ids.has(id)); assert(views.length >= 2); for (const [image,name,copy] of views) assert(assets[image] && name.en && name.ja && copy.en && copy.ja); }
for (const lang of ["en","ja"]) {
  const index = JSON.parse(await readFile(new URL(`../assets/search-${lang}.json`,import.meta.url),"utf8"));
  assert.equal(index.length,26);
  assert.equal(new Set(index.map(p=>p.url)).size,26);
  assert(index.find(p=>p.id==="territorial-access").text.includes("NC-1102"));
  for (const entry of index) assert(entry.url.startsWith(lang === "ja" ? "/ja/" : "/") && entry.name && entry.description);
}
console.log("PASS: eight bilingual dossiers, two chronologies, entity links, inspection views, and both 26-page search indexes");
