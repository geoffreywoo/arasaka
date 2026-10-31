const menu = document.querySelector("[data-mobile-menu]");

document.querySelectorAll("[data-language-link]").forEach(link => link.addEventListener("click", () => {
  if (window.location.hash) link.hash = window.location.hash;
}));

if (window.location.protocol === "file:") {
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || /^[a-z]+:/i.test(href)) return;
    const [path, hash] = href.split("#");
    if (path.endsWith("/")) link.setAttribute("href", `${path}index.html${hash ? `#${hash}` : ""}`);
  });
}

function closeMenu(returnFocus = false) {
  if (!menu?.open) return;
  menu.open = false;
  if (returnFocus) menu.querySelector("summary")?.focus();
}
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(true); });
document.addEventListener("click", event => { if (menu?.open && !menu.contains(event.target)) closeMenu(); });
menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
window.matchMedia("(min-width: 1001px)").addEventListener("change", event => { if (event.matches) closeMenu(); });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function scrambleLock(node) {
  if (reducedMotion.matches) return;
  const target = node.textContent, started = performance.now();
  function frame(now) {
    if (reducedMotion.matches) { node.textContent = target; return; }
    const progress = Math.min(1, (now - started) / 420), locked = Math.floor(progress * target.length);
    node.textContent = [...target].map((char, index) => index < locked || /\W/.test(char) ? char : glyphs[Math.floor(Math.random() * glyphs.length)]).join("");
    if (progress < 1) requestAnimationFrame(frame);
    else node.textContent = target;
  }
  requestAnimationFrame(frame);
}
document.querySelectorAll("[data-scramble]").forEach(scrambleLock);

document.querySelectorAll("[data-inspection]").forEach(section => {
  const list = section.querySelector("[role=tablist]");
  const tabs = [...list.querySelectorAll("[role=tab]")];
  const views = [...section.querySelectorAll(".inspection-view")];
  function select(index, focus = false) {
    tabs.forEach((tab,i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      views[i].hidden = i !== index;
      views[i].setAttribute("role", "tabpanel");
      views[i].setAttribute("aria-labelledby", tab.id);
      views[i].tabIndex = 0;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", event => {
      const next = event.key === "ArrowRight" ? (index+1)%tabs.length : event.key === "ArrowLeft" ? (index+tabs.length-1)%tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length-1 : null;
      if (next !== null) { event.preventDefault(); select(next,true); }
    });
  });
  list.hidden = false;
  select(0);
});

const searchDialog = document.querySelector("#site-search");
const searchOpen = document.querySelector("[data-search-open]");
if (searchDialog && searchOpen) {
  const input = searchDialog.querySelector("input");
  const results = searchDialog.querySelector("#search-results");
  const status = searchDialog.querySelector(".search-status");
  const japanese = document.documentElement.lang === "ja";
  let entries, pending, active = -1;
  const normalize = value => value.normalize("NFKC").toLocaleLowerCase().replace(/[\s\p{P}]+/gu, "");
  function render() {
    results.replaceChildren();
    active = -1;
    if (!entries) return;
    const query = normalize(input.value.trim());
    const found = entries.map(entry => ({entry, score: !query ? 1 : normalize(entry.name).includes(query) ? 4 : normalize(entry.title).includes(query) ? 3 : normalize(entry.description).includes(query) ? 2 : normalize(entry.text).includes(query) ? 1 : 0})).filter(item=>item.score).sort((a,b)=>b.score-a.score);
    status.textContent = query ? japanese ? `${found.length}件` : `${found.length} ${found.length === 1 ? "result" : "results"}` : japanese ? "製品・拠点・記録" : "Products, locations, records";
    for (const {entry} of found.slice(0,10)) {
      const item = document.createElement("li"), link = document.createElement("a"), heading = document.createElement("strong"), copy = document.createElement("span");
      link.href = window.location.protocol === "file:" ? new URL(`.${entry.url}index.html`,new URL(document.querySelector('.site-brand').href)).href : entry.url;
      heading.textContent = entry.name;
      copy.textContent = entry.description;
      link.append(heading,copy); item.append(link); results.append(item);
    }
    if (query && !found.length) status.textContent = japanese ? "該当する記録はありません" : "No matching records";
  }
  async function load() {
    if (entries) return;
    if (!pending) pending = fetch(searchDialog.dataset.searchIndex).then(response => {
      if (!response.ok) throw new Error("Search index unavailable");
      return response.json();
    }).then(data => { entries = data; }).catch(() => {
      pending = null;
      status.textContent = japanese ? "検索を利用できません" : "Search unavailable";
    });
    await pending;
  }
  searchOpen.hidden = false;
  searchOpen.addEventListener("click", async () => {
    closeMenu();
    searchDialog.showModal(); input.focus();
    status.textContent = japanese ? "検索中" : "Loading search";
    await load(); if (searchDialog.open) render();
  });
  searchDialog.querySelector("[data-search-close]").addEventListener("click", () => searchDialog.close());
  searchDialog.addEventListener("click", event => { if (event.target === searchDialog) {
    const bounds = searchDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) searchDialog.close();
  }});
  searchDialog.addEventListener("close", () => searchOpen.focus());
  input.addEventListener("input", render);
  searchDialog.addEventListener("keydown", event => {
    if (event.key === "Escape") { event.preventDefault(); searchDialog.close(); return; }
    if (!["ArrowDown","ArrowUp","Enter"].includes(event.key) || !entries) return;
    const links = [...results.querySelectorAll("a")];
    if (!links.length) return;
    if (event.key === "Enter" && document.activeElement === input) {
      event.preventDefault(); links[Math.max(0,active)].click(); return;
    }
    if (event.key === "Enter") return;
    event.preventDefault();
    active = (active + (event.key === "ArrowDown" ? 1 : -1) + links.length)%links.length;
    links[active].focus();
  });
}
