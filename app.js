const html = document.documentElement;
const body = document.body;
const languageButtons = [...document.querySelectorAll("[data-language]")];
const translatableNodes = [...document.querySelectorAll("[data-ja]")];
const placeholderNodes = [...document.querySelectorAll("[data-placeholder-ja]")];
const ariaNodes = [...document.querySelectorAll("[data-aria-ja]")];
const altNodes = [...document.querySelectorAll("[data-alt-ja]")];
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const inquiryForm = document.querySelector("[data-inquiry-form]");
const formStatus = document.querySelector("[data-form-status]");

let currentLanguage = "en";
let menuOpen = false;

if (window.location.protocol === "file:") {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || /^[a-z]+:/i.test(href)) return;

    const hashIndex = href.indexOf("#");
    const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
    if (path.endsWith("/")) {
      link.setAttribute("href", `${path}index.html${hash}`);
    }
  });
}

translatableNodes.forEach((node) => {
  node.dataset.en = node.textContent.trim();
});

placeholderNodes.forEach((node) => {
  node.dataset.placeholderEn = node.getAttribute("placeholder") || "";
});

ariaNodes.forEach((node) => {
  node.dataset.ariaEn = node.getAttribute("aria-label") || "";
});

altNodes.forEach((node) => {
  node.dataset.altEn = node.getAttribute("alt") || "";
});

function readStoredLanguage() {
  try {
    return window.localStorage.getItem("arasaka-language");
  } catch {
    return null;
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem("arasaka-language", language);
  } catch {
    // Local storage may be unavailable when the page is opened directly.
  }
}

function updateMenuState() {
  if (!menuToggle || !mobileMenu) return;

  menuToggle.setAttribute("aria-expanded", String(menuOpen));
  menuToggle.setAttribute(
    "aria-label",
    currentLanguage === "ja"
      ? menuOpen ? "メニューを閉じる" : "メニューを開く"
      : menuOpen ? "Close menu" : "Open menu"
  );
  mobileMenu.hidden = !menuOpen;
  body.classList.toggle("menu-open", menuOpen);
}

function applyLanguage(language) {
  currentLanguage = language === "ja" ? "ja" : "en";
  html.lang = currentLanguage;
  html.dataset.language = currentLanguage;

  translatableNodes.forEach((node) => {
    node.textContent = currentLanguage === "ja" ? node.dataset.ja : node.dataset.en;
  });

  placeholderNodes.forEach((node) => {
    node.setAttribute(
      "placeholder",
      currentLanguage === "ja" ? node.dataset.placeholderJa : node.dataset.placeholderEn
    );
  });

  ariaNodes.forEach((node) => {
    node.setAttribute(
      "aria-label",
      currentLanguage === "ja" ? node.dataset.ariaJa : node.dataset.ariaEn
    );
  });

  altNodes.forEach((node) => {
    node.setAttribute(
      "alt",
      currentLanguage === "ja" ? node.dataset.altJa : node.dataset.altEn
    );
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.language === currentLanguage;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("is-active", active);
  });

  document.title = currentLanguage === "ja" ? body.dataset.titleJa : body.dataset.titleEn;
  storeLanguage(currentLanguage);
  updateMenuState();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

menuToggle?.addEventListener("click", () => {
  menuOpen = !menuOpen;
  updateMenuState();
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    updateMenuState();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuOpen) {
    menuOpen = false;
    updateMenuState();
    menuToggle?.focus();
  }
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const scrambleGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scrambleLock(node) {
  const target = node.textContent.trim();
  if (!target || prefersReducedMotion.matches) return;

  const startedAt = performance.now();
  const duration = 420;

  function frame(now) {
    const progress = Math.min(1, (now - startedAt) / duration);
    const locked = Math.floor(progress * target.length);
    node.textContent = [...target].map((character, index) => {
      if (character === " " || index < locked) return character;
      return scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)];
    }).join("");

    if (progress < 1) {
      window.requestAnimationFrame(frame);
    } else {
      node.textContent = target;
    }
  }

  window.requestAnimationFrame(frame);
}

document.querySelectorAll("[data-scramble]").forEach(scrambleLock);

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!inquiryForm.checkValidity()) {
    inquiryForm.reportValidity();
    return;
  }

  const data = new FormData(inquiryForm);
  const subject = `Institutional inquiry: ${data.get("product")}`;
  const message = [
    `Name: ${data.get("name")}`,
    `Organization: ${data.get("organization")}`,
    `Email: ${data.get("email")}`,
    `Region: ${data.get("region")}`,
    `Product: ${data.get("product")}`,
    "",
    String(data.get("requirement"))
  ].join("\n");

  if (formStatus) {
    formStatus.textContent = currentLanguage === "ja"
      ? "メールアプリで問い合わせ下書きを開きます。"
      : "Opening a prepared inquiry in your mail application.";
  }

  window.location.href = `mailto:inquiries@arasaka.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});

applyLanguage(readStoredLanguage() || "en");
