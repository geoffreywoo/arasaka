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
