import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";
import { origin, languages, pair, assets, businesses, products, pages, label, retiredRoutes } from "./site-content.mjs";
import { caseId, dossiers, fieldStories } from "./archive-content.mjs";
import { networkProfiles, networkRecords, inspections, connections, institutionalEntities, institutionalEdges } from "./network-content.mjs";
const records = [...dossiers.map(d => ({ ...d, caseId })), ...networkRecords];

const root = resolve(import.meta.dirname, "..");
const esc = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const t = (value, lang) => value?.[lang] ?? value;
const route = (path, lang) => lang === "ja" ? `/ja${path}` : path;
const relative = (path, current) => `${"../".repeat(current.split("/").filter(Boolean).length)}${path.replace(/^\//, "")}` || "./";
const text = (tag, value, lang, cls = "") => `<${tag}${cls ? ` class="${cls}"` : ""}>${esc(t(value, lang))}</${tag}>`;
const arrow = '<svg class="icon" aria-hidden="true"><use href="#icon-arrow-up-right"></use></svg>';
const find = id => pages.find(p => p.id === id);
const url = (id, lang, current) => relative(route(find(id).route, lang), current);
const link = (id, lang, current, caption = label(id), cls = "text-link") => `<a class="${cls}" href="${url(id, lang, current)}">${esc(t(caption, lang))}${arrow}</a>`;
const imageMetadata = JSON.parse(await readFile(resolve(root, "assets/image-manifest.json"), "utf8"));

function image(id, lang, current, cls = "", eager = false, mobile = false) {
  const asset = assets[id], meta = imageMetadata[id];
  const src = (size, ext) => relative(`/assets/${asset.stem}-${size}.${ext}`, current);
  // Cover crops need enough source pixels for their height, not just viewport width.
  const sizes = cls.includes("hero-media") || cls.includes("imperial-photo") ? "(max-width:600px) 900px, 100vw" : cls.includes("company-band-media") ? "(max-width:600px) 1100px, 100vw" : "(max-width:600px) 100vw, (max-width:1000px) 50vw, 720px";
  const set = ext => [480, 960, 1600].map(size => `${src(size, ext)} ${size}w`).join(", ");
  return `<picture class="${cls}" style="--image-position:${asset.position}">${mobile ? `<source media="(max-width:600px)" srcset="${src("mobile", "webp")}" type="image/webp">` : ""}<source type="image/webp" srcset="${set("webp")}" sizes="${sizes}"><img src="${src(960, "jpg")}" srcset="${set("jpg")}" sizes="${sizes}" width="${meta.width}" height="${meta.height}" alt="${esc(t(asset.alt, lang))}" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

function header(page, lang, current) {
  const nav = ["businesses", "products", "research", "company"].map(id => `<a href="${url(id, lang, current)}"${page.section === id ? ' aria-current="page"' : ""}>${esc(t(label(id), lang))}</a>`).join("");
  return `<a class="skip-link" href="#main">${lang === "ja" ? "本文へ移動" : "Skip to content"}</a><header class="site-header">
    <a class="site-brand" href="${url("home", lang, current)}" aria-label="${lang === "ja" ? "アラサカ ホーム" : "Arasaka home"}"><img class="brand-mark" src="${relative("/assets/arasaka-mark-white.png", current)}" width="78" height="77" alt=""><img class="brand-wordmark" src="${relative("/assets/arasaka-wordmark-clean-white.png", current)}" width="1192" height="182" alt="Arasaka"></a>
    <nav class="desktop-nav" aria-label="${lang === "ja" ? "主要ナビゲーション" : "Primary"}">${nav}</nav><div class="header-tools"><a class="operations-link" href="${url("contact", lang, current)}">${esc(t(label("contact"), lang))}</a><button class="icon-button search-open" data-search-open type="button" hidden aria-label="${lang === "ja" ? "検索" : "Search"}" title="${lang === "ja" ? "検索" : "Search"}"><svg class="icon" aria-hidden="true"><use href="#icon-search"></use></svg></button><nav class="language-switch" aria-label="${lang === "ja" ? "言語" : "Language"}">${languages.map(locale => `<a href="${relative(route(page.route, locale), current)}" lang="${locale}" hreflang="${locale}" data-language-link${locale === lang ? ' aria-current="true"' : ""}>${locale === "en" ? "EN" : "日本語"}</a>`).join("")}</nav><details class="mobile-menu" data-mobile-menu><summary aria-label="${lang === "ja" ? "メニュー" : "Menu"}" title="${lang === "ja" ? "メニュー" : "Menu"}"><svg class="icon menu-icon" aria-hidden="true"><use href="#icon-menu"></use></svg><svg class="icon close-icon" aria-hidden="true"><use href="#icon-x"></use></svg></summary><nav aria-label="${lang === "ja" ? "モバイルナビゲーション" : "Mobile primary"}">${nav}<a href="${url("contact", lang, current)}">${esc(t(label("contact"), lang))}</a></nav></details></div></header>`;
}

function footer(lang, current) {
  return `<footer class="site-footer"><div class="shell footer-main"><div><img class="footer-wordmark" src="${relative("/assets/arasaka-wordmark-clean-white.png", current)}" width="1192" height="182" alt="Arasaka">${text("p", pair("Security. Capital. Continuity.", "警備。資本。継承。"), lang)}</div><nav aria-label="${lang === "ja" ? "事業一覧" : "Footer businesses"}"><strong>${esc(t(label("businesses"), lang))}</strong>${businesses.map(b => link(b.id, lang, current, b.name, "footer-link")).join("")}</nav><nav aria-label="${lang === "ja" ? "製品一覧" : "Footer products"}"><strong>${esc(t(label("products"), lang))}</strong>${products.map(p => link(p.id, lang, current, p.name, "footer-link")).join("")}</nav><nav aria-label="${lang === "ja" ? "企業情報一覧" : "Footer company"}"><strong>${esc(t(label("company"), lang))}</strong>${["company", "research", "contact", "archive"].map(id => link(id, lang, current, label(id), "footer-link")).join("")}</nav></div><div class="shell footer-bottom"><a class="footer-project-link" href="https://x.com/geoffwoo" target="_blank" rel="noopener noreferrer">${lang === "ja" ? "Geoff Woo プロジェクト" : "A Geoff Woo project"}</a>${text("p", pair("Independent, speculative post-2077 design fiction. Unaffiliated with CD PROJEKT RED. Referenced names and identity artwork belong to their respective rights holders.", "2077年以降を独自に構想した、独立のデザインフィクションです。CD PROJEKT REDとは関係ありません。参照名称とロゴは各権利者に帰属します。"), lang, "footer-legal")}</div></footer>`;
}

function breadcrumbs(page, lang, current) {
  if (page.id === "home") return "";
  return `<nav class="shell breadcrumbs" aria-label="${lang === "ja" ? "パンくずリスト" : "Breadcrumb"}"><a href="${url("home", lang, current)}">${esc(t(label("home"), lang))}</a><span aria-hidden="true">/</span>${page.parent ? `<a href="${url(page.parent, lang, current)}">${esc(t(label(page.parent), lang))}</a><span aria-hidden="true">/</span>` : ""}<span aria-current="page">${esc(t(label(page.id), lang))}</span></nav>`;
}

function hero(lang, current, { name, eyebrow, summary, imageId, code = "", home = false, light = false, profile = false }) {
  const action = profile ? `<a class="button button-primary" href="#profile">${esc(t(pair("Platform profile", "製品概要を見る"), lang))}${arrow}</a>` : link(home ? "products" : "businesses", lang, current, home ? pair("Explore our products", "製品を見る") : pair("Our businesses", "事業紹介"), "button button-primary");
  return `<section class="hero${home ? " home-hero" : ""}${light ? " hero-light" : ""}${imageId === "relic" ? " hero-relic" : ""}">${image(imageId, lang, current, "hero-media", true, imageId === "relic" || light)}<div class="hero-shade"></div><div class="shell hero-content"><p class="eyebrow">${esc(t(eyebrow, lang))}${code ? ` <span class="scramble-label"><span data-scramble aria-hidden="true">${esc(code)}</span><span class="sr-only">${esc(code)}</span></span>` : ""}</p>${text("h1", name, lang)}${home ? text("p", pair("Security. Capital. Continuity.", "警備。資本。継承。"), lang, "hero-mandate") : ""}${text("p", summary, lang, "hero-summary")}<div class="hero-actions">${action}${home ? link("company", lang, current, pair("The next chapter", "次の章へ"), "button button-outline") : ""}</div></div>${home ? `<a class="hero-caption" href="${url("relic", lang, current)}"><span>RELIC</span><span>${esc(t(pair("The continuity platform", "継承のプラットフォーム"), lang))}</span>${arrow}</a>` : ""}</section>`;
}

function heading(lang, eyebrow, title, summary = null) {
  return `<div class="section-heading"><div>${text("p", eyebrow, lang, "eyebrow")}${text("h2", title, lang)}</div>${summary ? text("p", summary, lang, "section-intro") : ""}</div>`;
}

function productCard(p, lang, current) {
  return `<article class="product-card product-${p.id}"><a href="${url(p.id, lang, current)}" class="product-image" aria-label="${esc(t(p.name, lang))}">${image(p.image, lang, current)}<span class="image-code" data-scramble aria-hidden="true">${p.code}</span></a><div class="product-info"><p class="eyebrow">${esc(t(p.category, lang))}</p><h3>${link(p.id, lang, current, p.name, "product-title")}</h3>${text("p", p.summary, lang)}<div class="product-meta"><span>${p.code}</span><span>${esc(t(businesses.find(b => b.id === p.business).name, lang))}</span></div></div></article>`;
}

function businessList(lang, current) {
  return `<div class="business-list">${businesses.map((b, i) => `<article class="business-row"><div class="business-image">${image(b.image, lang, current)}</div><div class="business-copy"><p class="eyebrow">0${i + 1} / ${b.code}</p><h3>${esc(t(b.name, lang))}</h3>${text("p", b.description, lang)}${link(b.id, lang, current, pair("Explore the business", "事業を見る"))}</div></article>`).join("")}</div>`;
}

function capabilities(items, lang, prefix = "") {
  return `<div class="capability-list">${items.map(([title, copy], i) => `<article${prefix ? ` id="${prefix}-${i+1}"` : ""}><span class="index">0${i + 1}</span>${text("h3", title, lang)}${text("p", copy, lang)}</article>`).join("")}</div>`;
}

function architecture(lang, current) {
  const nodes = [["01", pair("Representation", "人格の表現"), pair("Soulkiller", "ソウルキラー"), pair("The technology associated with producing a digital personality construct.", "デジタル人格構築体の生成に関わる技術。"), "engram-technology"], ["02", pair("Archive", "アーカイブ"), pair("Mikoshi", "ミコシ"), pair("The protected infrastructure in which engrams are stored and managed.", "エングラムの保存と管理を担う、保護された基盤。"), "mikoshi"], ["03", pair("Interface", "インターフェース"), pair("Relic", "Relic"), pair("The biochip that carries a construct and provides a neural connection.", "構築体を格納し、神経接続を提供するバイオチップ。"), "relic"]];
  return `<ol class="architecture">${nodes.map(([code, role, name, copy, id]) => `<li><p class="eyebrow">${code} / ${esc(t(role, lang))}</p><h3>${link(id, lang, current, name, "architecture-title")}</h3>${text("p", copy, lang)}</li>`).join("")}</ol>`;
}

const related = (ids, lang, current) => `<div class="product-grid product-grid-two">${ids.map(id => productCard(products.find(p => p.id === id), lang, current)).join("")}</div>`;
const intro = (lang, title, copy) => `<div class="editorial-intro">${text("h2", title, lang)}${text("p", copy, lang, "lead")}</div>`;


function businessDetail(b, lang, current) {
  return `${hero(lang, current, {name: b.name, eyebrow: pair("Arasaka businesses", "アラサカの事業"), summary: b.summary, imageId: b.image, code: b.code})}<section class="section section-light"><div class="shell">${intro(lang, b.statement, b.description)}${capabilities(b.capabilities, lang)}</div></section><section class="section"><div class="shell">${intro(lang, pair("The strength of the wider group.", "グループ全体の力を。"), b.context)}${link(b.id === "banking" ? "company" : "research", lang, current, b.id === "banking" ? label("company") : label("research"), "text-link light-link")}</div></section><section class="section section-light"><div class="shell">${heading(lang, pair("Related capabilities", "関連する技術"), b.id === "banking" ? pair("Continuity beyond capital.", "資本を超えて続くもの。") : pair("Explore the platforms.", "プラットフォームを見る。"))}${related(b.related, lang, current)}</div></section>`;
}

function productDetail(p, lang, current) {
  return `${hero(lang, current, {name: p.name, eyebrow: p.category, summary: p.headline, imageId: p.image, code: p.code, light: p.business === "security", profile: true})}<section class="section section-light" id="profile"><div class="shell">${intro(lang, p.summary, p.overview)}<div class="product-detail-grid"><div>${capabilities(p.features, lang)}</div><aside class="specification"><p class="eyebrow">${esc(t(pair("Platform profile", "プラットフォーム概要"), lang))}</p><h2>${p.code}</h2><dl>${p.specs.map(([key,value]) => `<div>${text("dt", key, lang)}${text("dd", value, lang)}</div>`).join("")}</dl></aside></div>${text("p", p.note, lang, "technical-note")}</div></section><section class="section"><div class="shell">${intro(lang, p.contextTitle, p.context)}${link(p.business, lang, current, label(p.business), "text-link light-link")}</div></section>${p.business === "technology" ? `<section class="section section-light"><div class="shell">${heading(lang, pair("System relationship", "システムの関係"), pair("Distinct roles. Connected technology.", "異なる役割。つながる技術。"))}${architecture(lang, current)}${link("engram-technology", lang, current, pair("Read the technology brief", "技術概要を読む"))}</div></section>` : ""}<section class="section section-light related-section"><div class="shell">${heading(lang, pair("Portfolio", "ポートフォリオ"), pair("Related platforms.", "関連プラットフォーム。"))}${related(p.related, lang, current)}</div></section>`;
}

function research(page, lang, current) {
  const brief = page.id === "engram-technology";
  if (!brief) {
    const fields = [[pair("Neural representation", "神経表現"), pair("How memories and personality can be represented in an engram, and how that representation connects to a neural environment.", "記憶と人格をエングラムとして表現する方法と、その表現を神経環境に接続する方法。")], [pair("Archive infrastructure", "アーカイブ基盤"), pair("Purpose-built environments for retaining personality constructs, with computation and access treated as part of the same system.", "人格構築体を保持する専用環境。計算とアクセスを、同一システムの一部として扱います。")], [pair("Integrated interfaces", "統合インターフェース"), pair("The relationship between physical hardware, embedded systems, and the person using them, from biochips to smart equipment.", "バイオチップからスマート装備まで、物理ハードウェア、組み込みシステム、使用する人の関係。")]];
    return `${hero(lang, current, {name: pair("Research & development", "研究開発"), eyebrow: pair("Arasaka advanced technology", "アラサカ先端技術"), summary: pair("At the boundary between human experience and engineered systems.", "人間の経験と、工学的システムの境界で。"), imageId: "mikoshi"})}<section class="section section-light"><div class="shell">${intro(lang, pair("From fundamental questions to physical platforms.", "根本的な問いから、物理的な基盤へ。"), pair("Research connects the group's archive facilities, biochip engineering, and precision manufacturing. Each field addresses a different part of the relationship between people and engineered systems.", "研究は、グループのアーカイブ施設、バイオチップ開発、精密製造を結びます。各分野が、人と工学的システムの関係の異なる側面に取り組みます。"))}${capabilities(fields, lang)}</div></section><section class="section"><div class="shell">${heading(lang, pair("Technology brief / 01", "技術概要 / 01"), pair("The engram ecosystem.", "エングラムの技術環境。"), pair("Soulkiller creates a construct. Mikoshi retains the archive. Relic provides the biochip interface. A closer look at their distinct roles.", "ソウルキラーが構築体を生成し、ミコシがアーカイブを保持し、Relicがバイオチップ接続を提供します。それぞれの役割を詳しく紹介します。"))}${link("engram-technology", lang, current, pair("Read the technology brief", "技術概要を読む"), "text-link light-link")}</div></section><section class="section section-light"><div class="shell">${heading(lang, pair("Applied research", "応用研究"), pair("The continuity platforms.", "継承のプラットフォーム。"))}${related(["relic", "mikoshi"], lang, current)}${link("technology", lang, current, pair("Advanced technology business", "先端技術事業"))}</div></section>`;
  }
  return `${hero(lang, current, {name: brief ? pair("Engram technology", "エングラム技術") : pair("Research & development", "研究開発"), eyebrow: pair("Arasaka advanced technology", "アラサカ先端技術"), summary: brief ? pair("Soulkiller, Mikoshi, and Relic. Three distinct roles in one technology ecosystem.", "ソウルキラー、ミコシ、Relic。一つの技術環境における、三つの異なる役割。") : pair("At the boundary between human experience and engineered systems.", "人間の経験と、工学的システムの境界で。"), imageId: brief ? "relic" : "mikoshi"})}<section class="section section-light"><div class="shell">${heading(lang, pair("Technology brief / 01", "技術概要 / 01"), pair("Representation. Archive. Interface.", "表現。保存。接続。"), pair("An engram is a digital personality construct. Creating that representation, retaining it, and connecting it to a neural environment are different technical functions.", "エングラムは、デジタル人格構築体です。その表現を生成すること、保存すること、神経環境に接続することは、それぞれ異なる技術的機能です。"))}${architecture(lang, current)}${brief ? "" : link("engram-technology", lang, current, pair("Read the complete brief", "技術概要を詳しく読む"))}</div></section><section class="section"><div class="shell">${intro(lang, pair("Preservation is not the same as restoration.", "保存と復元は、同じではない。"), pair("The commercial Relic program enables interaction with a stored personality. Experimental host-transfer technology addresses a different problem: the relationship between an engram and a biological host. Arasaka's restored leadership provides the context for the next phase of that work.", "商用Relicプログラムは、保存された人格との対話を可能にします。実験的な宿主移行技術が扱うのは、エングラムと生物学的な宿主の関係という、別の課題です。指導体制への復帰は、その研究の次段階を位置づけます。"))}${link("company", lang, current, pair("Leadership continuity", "指導体制の継承"), "text-link light-link")}</div></section><section class="section section-light"><div class="shell">${heading(lang, pair("Applied platforms", "応用プラットフォーム"), pair("Research, made physical.", "研究を、物理的なかたちに。"))}${related(["relic", "mikoshi"], lang, current)}</div></section>`;
}

function company(lang, current) {
  const beliefs = [[pair("Industrial strength", "産業力"), pair("Product development, precision manufacturing, and protective operations within one global group.", "製品開発、精密製造、防護運用を、一つの世界的グループの中に。")], [pair("Long-term capital", "長期資本"), pair("Financial businesses support the relationships and assets on which durable enterprises are built.", "金融事業が、持続する企業をつくる関係と資産を支えます。")], [pair("Leadership continuity", "指導体制の継承"), pair("A corporate vision carried into a new chapter through the group's work in engram technology.", "エングラム技術への取り組みを通じ、企業理念を新たな章へ。")]];
  return `${hero(lang, current, {name: pair("An enduring institution.", "続いていく組織。"), eyebrow: pair("Arasaka Corporation / Tokyo", "アラサカ株式会社 / 東京"), summary: pair("A global enterprise shaped by long horizons, industrial strength, and the continuity of its corporate vision.", "長期的な視野、産業力、企業理念の継承によって形づくられる、世界的企業。"), imageId: "imperial-headquarters"})}<section class="section section-light"><div class="shell">${intro(lang, pair("Leadership. Renewed direction.", "指導体制。新たな方針。"), pair("Saburo Arasaka's return to leadership marks the beginning of a renewed corporate era. The group's direction brings security, finance, and neural technology into closer alignment, with continuity at the center of its long-term vision.", "サブロウ・アラサカの指導体制への復帰は、新たな企業の時代の始まりです。グループは警備、金融、ニューラル技術の連携を深め、継承を長期構想の中心に据えます。"))}${capabilities(beliefs, lang)}</div></section><section class="section"><div class="shell">${heading(lang, pair("Group structure", "グループ構成"), pair("Specialized businesses. Shared direction.", "専門性ある事業。共通の方針。"))}${businessList(lang, current)}</div></section><section class="section section-light"><div class="shell">${intro(lang, pair("Tokyo to Night City.", "東京からナイトシティへ。"), pair("Tokyo anchors the group's corporate identity. Night City provides a prominent regional presence, connecting its security, financial, and technology interests to a major international center of commerce.", "東京がグループの企業としての基盤を担い、ナイトシティが重要な地域拠点を形成します。警備、金融、技術の各事業を、国際商取引の中心都市につなぎます。"))}${link("contact", lang, current, pair("Explore global operations", "グローバル拠点を見る"))}</div></section>`;
}

function operations(lang, current) {
  const regions = [["TOKYO / JP", pair("Tokyo", "東京"), pair("Corporate headquarters", "本社"), pair("Group direction, financial relationships, and advanced technology development. The foundation of Arasaka's corporate identity.", "グループ方針、金融関係、先端技術開発。アラサカの企業としての基盤。"), "tokyo-operations"], ["NIGHT CITY / NC", pair("Night City", "ナイトシティ"), pair("Regional operations", "地域拠点"), pair("A regional center linking protective services, financial interests, and technology operations to the wider group.", "警護サービス、金融、技術運用を、グループ全体に結びつける地域拠点。"), "night-city-operations"]];
  return `${hero(lang, current, {name: pair("Global operations", "グローバル拠点"), eyebrow: pair("Regional directory", "地域一覧"), summary: pair("Tokyo headquarters and Night City operations. Corporate direction, regional protection, and Japanese-made products.", "東京本社とナイトシティの地域運用。企業方針、地域の防護、そして日本製品。"), imageId: "night-city-annex"})}<section class="section section-light"><div class="shell">${heading(lang, pair("Corporate & regional", "本社・地域拠点"), pair("Two centers. A wider reach.", "二つの中心。広がる事業。"))}<div class="region-grid">${regions.map(([code,name,role,copy,id]) => `<article><p class="eyebrow">${code}</p>${text("h2", name, lang)}${text("p", role, lang, "region-role")}${text("p", copy, lang)}${link(id, lang, current, pair("Regional profile", "地域概要を見る"))}</article>`).join("")}</div></div></section><section class="section"><div class="shell">${heading(lang, pair("Division directory", "事業部門一覧"), pair("Find the relevant business.", "事業部門を見る。"))}<div class="division-directory">${businesses.map(b => `<article><span class="eyebrow">${b.code}</span><h3>${esc(t(b.name, lang))}</h3>${text("p", b.summary, lang)}${link(b.id, lang, current, pair("Division overview", "事業概要"), "text-link light-link")}</article>`).join("")}</div></div></section>`;
}

function companyHistory(lang) {
  const chapters = [[pair("Industrial origins", "産業の起点"), pair("Arasaka's Japanese industrial roots developed into a group with interests across security, manufacturing, and finance.", "日本の産業に根ざすアラサカは、警備、製造、金融へと展開するグループに成長しました。")], [pair("International presence", "国際的な展開"), pair("Expansion brought the group's businesses to international centers including Night City, extending its reach beyond Japan.", "ナイトシティをはじめとする国際都市への展開により、グループの事業は日本を超えて広がりました。")], [pair("The restored era", "復帰後の時代"), pair("Saburo Arasaka's return reconnects the institution with its long-term direction. Engram technology gives succession a new place in the group's history.", "サブロウ・アラサカの復帰は、組織を長期方針に再び結びつけます。エングラム技術が、グループの歴史における継承のあり方を変えます。")]];
  return `<section class="section section-light"><div class="shell">${heading(lang, pair("Our history", "私たちの歩み"), pair("An institution across generations.", "世代を超えて続く組織。"))}${capabilities(chapters, lang)}</div></section>`;
}

function corporateBody(page, lang, current) {
  if (page.id === "home") return imperialHome(lang, current);
  const profile = networkProfiles.find(p => p.id === page.id);
  if (profile) return networkProfile(profile, lang, current);
  const business = businesses.find(b => b.id === page.id);
  if (business) return businessDetail(business, lang, current);
  const product = products.find(p => p.id === page.id);
  if (product) return productDetail(product, lang, current);
  if (page.id === "businesses") return `${hero(lang, current, {name: pair("Our businesses", "私たちの事業"), eyebrow: pair("Arasaka Corporation", "アラサカ株式会社"), summary: pair("Protection, capital, and technology. The foundations of a global enterprise.", "防護、資本、技術。世界的な事業体を支える基盤。"), imageId: "imperial-headquarters"})}<section class="section"><div class="shell">${businessList(lang, current)}</div></section>`;
  if (page.id === "products") return `${hero(lang, current, {name: pair("Products & technology", "製品・技術"), eyebrow: pair("Arasaka portfolio", "アラサカの製品群"), summary: pair("From personality engrams to smart systems. Explore the platforms behind our businesses.", "人格エングラムからスマートシステムまで。事業を支えるプラットフォームを紹介します。"), imageId: "shingen", light: true})}<section class="section section-light"><div class="shell"><nav class="portfolio-filter" aria-label="${lang === "ja" ? "製品カテゴリー" : "Product categories"}"><a href="#continuity">${esc(t(pair("Neural technology", "ニューラル技術"), lang))}</a><a href="#defense">${esc(t(pair("Defense systems", "防衛システム"), lang))}</a></nav><div id="continuity">${heading(lang, pair("Advanced technology", "先端技術"), pair("The continuity platforms.", "継承のプラットフォーム。"))}${related(["relic", "mikoshi"], lang, current)}</div><div id="defense" class="portfolio-group">${heading(lang, pair("Security & defense", "警備・防衛"), pair("Precision manufacturing.", "精密製造。"))}${related(["shingen", "yukimura"], lang, current)}</div></div></section>`;
  if (page.section === "research") return research(page, lang, current);
  if (page.id === "company") return company(lang, current) + companyHistory(lang);
  return operations(lang, current);
}

function fieldStory(page, lang, current) {
  const story = fieldStories[page.id];
  if (!story) return "";
  const record = dossiers.find(d => d.id === story.dossier);
  return `<section class="field-story section-light"><figure>${image(story.image, lang, current, "field-photo")}<figcaption>${esc(t(pair("ARASAKA / Institutional record", "ARASAKA / 組織記録"), lang))}</figcaption></figure><div class="field-copy"><p class="eyebrow">${esc(t(story.eyebrow || pair("Inside Arasaka", "アラサカの内側"), lang))}</p>${text("h2", story.title, lang)}${text("p", story.copy, lang)}${record ? `<div class="record-reference"><span>${record.code}</span>${link(record.id, lang, current, pair("Related record", "関連記録"))}</div>` : link(story.target, lang, current, label(story.target))}</div></section>`;
}

function archive(page, lang, current) {
  const record = records.find(d => d.id === page.id);
  const classification = pair("Restricted / Internal circulation", "取扱制限 / 内部配布");
  if (!record) return archiveIndex(lang,current);
  const currentCase = record.caseId;
  const caseRecords = records.filter(d => d.caseId === currentCase);
  const index = caseRecords.indexOf(record);
  const meta = [[pair("File", "案件"), currentCase], [pair("Origin", "作成部門"), record.department], [pair("Sequence", "時点"), pair(`Day +${record.day} from ${currentCase === "NC-0417" ? "enrollment" : "transfer"}`, `${currentCase === "NC-0417" ? "登録" : "移管"}から第${record.day}日`)], [pair("Revision", "改訂"), record.revision]];
  return `<article class="dossier"><header class="shell dossier-heading"><div class="classification">${text("p", classification, lang)}<span>${record.code}</span></div>${text("h1", record.name, lang)}${text("p", record.summary, lang, "archive-lead")}<dl class="record-metadata">${meta.map(([key,value])=>`<div>${text("dt", key, lang)}${text("dd", value, lang)}</div>`).join("")}</dl></header><figure class="shell dossier-figure">${image(record.image, lang, current, "dossier-photo", true)}<figcaption>${esc(t(pair("Supporting reconstruction / not an official facility image", "補足再構成画像 / 公式の施設画像ではありません"), lang))}</figcaption></figure><div class="shell dossier-layout"><div class="dossier-text">${record.sections.map(([title,copy],i)=>`<section id="section-${i+1}"><p class="eyebrow">${currentCase} / 0${i+1}</p>${text("h2", title, lang)}${text("p", copy, lang)}</section>`).join("")}</div><aside class="dossier-margin"><p class="eyebrow">${esc(t(pair("Records office annotation", "記録室注記"), lang))}</p>${text("p", record.annotation, lang)}<div class="withheld"><span class="redaction" aria-hidden="true"></span>${text("p", pair("Reviewer identifiers withheld. Findings retained in full.", "審査者の識別情報は非開示。認定内容は全文を保持。"), lang)}</div>${link(record.publicPage, lang, current, label(record.publicPage))}</aside></div><nav class="shell record-navigation" aria-label="${lang === "ja" ? "記録の移動" : "Record navigation"}">${index > 0 ? link(caseRecords[index-1].id, lang, current, pair("Previous record", "前の記録")) : link("archive", lang, current, label("archive"))}${index < caseRecords.length-1 ? link(caseRecords[index+1].id, lang, current, pair("Next record", "次の記録")) : link("archive", lang, current, pair("Return to archive", "アーカイブに戻る"))}</nav><div class="shell archive-disclosure">${text("p", pair("Fictional internal records in an independent post-2077 narrative. NC-0417, NC-1102, their participants, policies, and correspondence are original inventions, not canonical game documents. Restricted labels are part of the story, not access controls.", "独立した2077年以降の物語における、架空の内部記録です。NC-0417、NC-1102、関係者、方針、通信は独自の創作であり、ゲームの公式文書ではありません。取扱制限の表記は物語上のもので、アクセス制御ではありません。"), lang)}</div></article>`;
}

function body(page, lang, current) {
  const content = page.section === "archive" ? archive(page, lang, current) : corporateBody(page, lang, current) + inspection(page, lang, current) + fieldStory(page, lang, current);
  return content + institutionalLinks(page, lang, current);
}

function archiveIndex(lang,current) {
  const cases = [["NC-0417",pair("The cost of continuity","継承の代償"),pair("A family asks to bring a stored personality home. Five offices retain different parts of the answer.","家族が保存人格を家に連れて帰りたいと求める。五つの部門が回答の異なる部分を保持する。")],["NC-1102",pair("The regional transition","地域の移行"),pair("An asset transfer is complete. At the pedestrian entrance, a maintenance team waits for an instruction.","資産の移管は完了した。職員入口では、保守チームが指示を待っている。")]];
  return `<section class="archive-intro shell"><p class="eyebrow">ARASAKA / RECORDS OFFICE</p>${text("h1",pair("Institutional archive","組織アーカイブ"),lang)}${text("p",pair("Identity. Territory. Capital. Different accounts of the same institution.","人格。領域。資本。同じ組織についての、異なる記録。"),lang,"archive-lead")}<div class="archive-overview">${image("night-city-annex",lang,current,"archive-photo",true)}<div>${text("h2",pair("What remains in the record.","記録に、何が残るか。"),lang)}${text("p",pair("The public statement is one account. The instruction, the exception, and the correspondence reveal what it leaves unresolved.","公表文は一つの説明である。指示、例外、通信には、そこで未解決のまま残されたものが現れる。"),lang)}<nav class="archive-case-links" aria-label="${lang === "ja" ? "案件" : "Cases"}">${cases.map(([id,title])=>`<a class="text-link light-link" href="#${id}">${id} / ${esc(t(title,lang))}${arrow}</a>`).join("")}</nav></div></div></section>${cases.map(([id,title,summary])=>`<section class="section section-light" id="${id}"><div class="shell">${heading(lang,pair(id,id),title,summary)}<ol class="archive-index">${records.filter(d=>d.caseId===id).map((d,i)=>`<li><span class="record-number">0${i+1}</span><div><p class="eyebrow">${d.code} / ${esc(t(pair(`Day +${d.day}`,`第${d.day}日`),lang))}</p><h3>${link(d.id,lang,current,d.name,"record-title")}</h3>${text("p",d.summary,lang)}</div><span class="record-department">${esc(t(d.department,lang))}</span></li>`).join("")}</ol></div></section>`).join("")}`;
}

function divisionRail(lang, current) {
  return `<nav class="division-rail" aria-label="${lang === "ja" ? "事業部門" : "Business divisions"}"><p>ARASAKA /<br>${esc(t(pair("Global operations", "グローバル拠点"), lang))}</p>${businesses.map((b,i)=>`<a href="${url(b.id,lang,current)}"><span>0${i+1}</span>${esc(t(pair(["Security","Banking","Technology"][i],["警備","銀行","技術"][i]),lang))}</a>`).join("")}</nav>`;
}

function imperialHome(lang, current) {
  return `<section class="imperial-hero">${image("imperial-headquarters",lang,current,"imperial-photo",true,true)}${divisionRail(lang,current)}<div class="imperial-copy"><h1>${lang === "ja" ? "アラサカ<br>株式会社" : "Arasaka<br>Corporation"}</h1>${text("p",pair("Security. Capital. Continuity.","警備。資本。継承。"),lang,"imperial-mandate")}${text("p",pair("Protection, industry, and human continuity.","防護、産業、そして人の継承。"),lang,"imperial-summary")}<div class="hero-actions">${link("products",lang,current,pair("Explore products","製品を見る"),"button button-primary")}${link("contact",lang,current,label("contact"),"text-link light-link")}</div></div></section>
  <section class="flagship section-light"><div class="flagship-copy"><p class="eyebrow">${esc(t(pair("Products / Advanced technology","製品 / 先端技術"),lang))}</p><h2>Relic</h2>${text("p",pair("A neural interface platform for stored personality constructs. The conversation begins with a physical connection.","保存された人格構築体のための神経接続基盤。対話は、物理的な接点から始まります。"),lang)}${link("relic",lang,current,pair("Product profile","製品概要"))}</div><a href="${url("relic",lang,current)}" aria-label="Relic">${image("relic",lang,current,"flagship-photo")}</a></section>
  <section class="section section-light" id="products"><div class="shell">${heading(lang,pair("Products & infrastructure","製品・基盤"),pair("The systems behind the institution.","組織を支える、システム。"))}<div class="product-grid">${products.map(p=>productCard(p,lang,current)).join("")}</div></div></section>
  <section class="section" id="businesses"><div class="shell">${heading(lang,pair("The group","グループ"),pair("Security. Capital. Industrial reach.","警備。資本。産業の力。"),pair("A gate instruction, an asset agreement, a retained personality. Different responsibilities within one institution.","入構指示、資産契約、保存人格。異なる責任を、一つの組織の中に。"))}${businessList(lang,current)}${link("organization",lang,current,pair("Organization & authority","組織と権限"),"text-link light-link")}</div></section>
  <section class="regional-feature">${image("night-city-annex",lang,current,"regional-photo")}<div class="shell"><p class="eyebrow">NIGHT CITY / NC-1102</p>${text("h2",pair("Regional transition complete.","地域移行完了。"),lang)}${text("p",pair("The annex operates under its receiving administrator. Distribution has resumed under the retained movement instruction.","別館は引受管理者の下で運用されています。保持された移動指示に基づき流通は再開しました。"),lang)}${link("night-city-operations",lang,current,pair("Regional operations","地域の運用"),"text-link light-link")}</div></section>
  <section class="section section-light"><div class="shell">${heading(lang,pair("Research / Engram technology","研究 / エングラム技術"),pair("Representation. Archive. Interface.","表現。保存。接続。"))}${architecture(lang,current)}${link("engram-technology",lang,current,pair("Read the research brief","研究概要を読む"))}</div></section>`;
}

function networkProfile(profile,lang,current) {
  return `${hero(lang,current,{name:profile.name,eyebrow:pair(profile.code,profile.code),summary:profile.summary,imageId:profile.image})}<section class="section section-light"><div class="shell">${intro(lang,profile.name,profile.intro)}${capabilities(profile.sections,lang,profile.id === "organization" ? "office" : "location")}</div></section>`;
}

function inspection(page,lang,current) {
  const views = inspections[page.id];
  if (!views) return "";
  return `<section class="section section-light product-inspection" id="inspection" data-inspection><div class="shell">${heading(lang,pair("Product inspection","製品の詳細"),label(page.id))}<div class="inspection-tabs" role="tablist" aria-label="${lang === "ja" ? "製品画像" : "Product views"}" hidden>${views.map(([,name],i)=>`<button type="button" role="tab" id="view-tab-${i}" aria-controls="view-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${esc(t(name,lang))}</button>`).join("")}</div><div class="inspection-views">${views.map(([asset,name,annotation],i)=>`<figure id="view-${i}" class="inspection-view"><div class="inspection-image">${image(asset,lang,current)}</div><figcaption><strong>${esc(t(name,lang))}</strong>${text("p",annotation,lang)}</figcaption></figure>`).join("")}</div></div></section>`;
}

function institutionalLinks(page,lang,current) {
  const profile = networkProfiles.find(p=>p.id===page.id);
  const ids = profile?.related || connections[page.id];
  if (!ids?.length) return "";
  return `<section class="institutional-links"><div class="shell"><p class="eyebrow">${esc(t(pair("Institutional connections","組織のつながり"),lang))}</p><nav aria-label="${lang === "ja" ? "関連する事業と記録" : "Related businesses and records"}">${ids.map(id=>link(id,lang,current,label(id),"text-link light-link")).join("")}</nav></div></section>`;
}

function searchDialog(lang,current) {
  const title = lang === "ja" ? "アラサカを検索" : "Search Arasaka";
  return `<dialog class="site-search" id="site-search" aria-labelledby="search-title" data-search-index="${relative(`/assets/search-${lang}.json`,current)}"><div class="search-heading"><h2 id="search-title">${title}</h2><button class="icon-button" type="button" data-search-close aria-label="${lang === "ja" ? "閉じる" : "Close"}" title="${lang === "ja" ? "閉じる" : "Close"}"><svg class="icon" aria-hidden="true"><use href="#icon-x"></use></svg></button></div><label for="search-query">${lang === "ja" ? "製品・拠点・文書番号" : "Products, locations, document references"}</label><input type="search" id="search-query" autocomplete="off" aria-controls="search-results"><p class="search-status" role="status" aria-live="polite"></p><ul id="search-results"></ul></dialog>`;
}

function structuredData(page, lang, current) {
  const canonical = origin + current;
  const chain = [find("home"), ...(page.parent ? [find(page.parent)] : []), ...(page.id === "home" ? [] : [page])];
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": `${origin}/#website`, name: "Arasaka", url: origin, inLanguage: languages, description: "An independent, unofficial speculative Cyberpunk 2077 design-fiction website.", creator: { "@type": "Person", name: "Geoff Woo", url: "https://x.com/geoffwoo" } },
    { "@type": "WebPage", "@id": `${canonical}#page`, url: canonical, name: t(page.title, lang), description: t(page.description, lang), inLanguage: lang, isPartOf: { "@id": `${origin}/#website` }, primaryImageOfPage: { "@type": "ImageObject", url: `${origin}/assets/${assets[page.image].stem}-1600.jpg` }, about: { "@type": "CreativeWork", name: "Arasaka: Imperial Network", description: "Independent speculative fiction set after Cyberpunk 2077, imagining Saburo Arasaka's restored leadership. Not an official or real-world corporation." } },
    { "@type": "BreadcrumbList", itemListElement: chain.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: t(label(p.id), lang), item: origin + route(p.route, lang) })) },
  ] };
}

const sprite = await readFile(resolve(root, "assets/icons.svg"), "utf8");
function document(page, lang) {
  const current = route(page.route, lang), canonical = origin + current, social = `${origin}/assets/social/${page.id}-${lang}.jpg`;
  return `<!doctype html>\n<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(t(page.title, lang))}</title><meta name="description" content="${esc(t(page.description, lang))}"><meta name="theme-color" content="#101112"><link rel="canonical" href="${canonical}">${languages.map(locale => `<link rel="alternate" hreflang="${locale}" href="${origin + route(page.route, locale)}">`).join("")}<link rel="alternate" hreflang="x-default" href="${origin + page.route}"><meta property="og:type" content="website"><meta property="og:site_name" content="Arasaka"><meta property="og:locale" content="${lang === "ja" ? "ja_JP" : "en_US"}"><meta property="og:locale:alternate" content="${lang === "ja" ? "en_US" : "ja_JP"}"><meta property="og:title" content="${esc(t(page.title, lang))}"><meta property="og:description" content="${esc(t(page.description, lang))}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${social}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(t(assets[page.image].alt, lang))}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(t(page.title, lang))}"><meta name="twitter:description" content="${esc(t(page.description, lang))}"><meta name="twitter:image" content="${social}"><link rel="icon" href="${relative("/assets/arasaka-mark-favicon.png", current)}" type="image/png">${page.id === "home" ? `<link rel="preload" href="${relative("/assets/orbitron-900.ttf",current)}" as="font" type="font/ttf" crossorigin>` : ""}<link rel="stylesheet" href="${relative("/styles.css", current)}"><script src="${relative("/app.js", current)}" defer></script><script type="application/ld+json">${JSON.stringify(structuredData(page, lang, current)).replaceAll("<", "\\u003c")}</script></head><body data-page="${page.id}">${sprite}${header(page, lang, current)}<main id="main">${breadcrumbs(page, lang, current)}${body(page, lang, current)}</main>${footer(lang, current)}${searchDialog(lang,current)}</body></html>\n`;
}

let previous = { pages: [] };
try { previous = JSON.parse(await readFile(resolve(root, "scripts/page-manifest.json"), "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
const manifest = [];
for (const page of pages) for (const lang of languages) {
  const current = route(page.route, lang), html = document(page, lang), hash = createHash("sha256").update(html).digest("hex");
  const old = previous.pages.find(p => p.route === current);
  const entry = { id: page.id, lang, route: current, file: `${current.slice(1)}index.html`, title: t(page.title, lang), image: `/assets/${assets[page.image].stem}-1600.jpg`, social: `/assets/social/${page.id}-${lang}.jpg`, hash, lastmod: old?.hash === hash ? old.lastmod : new Date().toISOString().slice(0, 10), alternates: Object.fromEntries(languages.map(locale => [locale, origin + route(page.route, locale)])) };
  await mkdir(dirname(resolve(root, entry.file)), { recursive: true });
  await writeFile(resolve(root, entry.file), html);
  manifest.push(entry);
}
for (const oldRoute of Object.keys(retiredRoutes)) {
  try { await unlink(resolve(root, `${oldRoute.slice(1)}index.html`)); } catch (error) { if (error.code !== "ENOENT") throw error; }
}
await writeFile(resolve(root, "scripts/page-manifest.json"), JSON.stringify({ origin, pages: manifest }, null, 2) + "\n");
function indexText(value,lang) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(v=>indexText(v,lang)).join(" ");
  if (value.en !== undefined && value.ja !== undefined) return indexText(value[lang],lang);
  return Object.values(value).map(v=>indexText(v,lang)).join(" ");
}
for (const lang of languages) {
  const entries = pages.map(p=>({ id:p.id, url:route(p.route,lang), title:t(p.title,lang), name:t(label(p.id),lang), description:t(records.find(r=>r.id===p.id)?.summary || (p.id === "home" ? pair("Security. Capital. Continuity.","警備。資本。継承。") : p.id === "archive" ? pair("Identity. Territory. Capital. The institutional record.","人格。領域。資本。組織の記録。") : p.description),lang), text:indexText([p.title,p.description,products.find(v=>v.id===p.id),businesses.find(v=>v.id===p.id),records.find(v=>v.id===p.id),networkProfiles.find(v=>v.id===p.id),fieldStories[p.id]],lang) }));
  await writeFile(resolve(root,`assets/search-${lang}.json`),JSON.stringify(entries)+"\n");
}
const entities = [...pages.map(p=>({id:p.id,type:p.section === "archive" ? "record" : networkProfiles.some(n=>n.id===p.id) ? "institution" : p.section,route:p.route,name:label(p.id)})), ...institutionalEntities.map(e=>({...e,route:find(e.page).route,provenance:"project-fiction"}))];
const edges = [...pages.flatMap(p=>(networkProfiles.find(n=>n.id===p.id)?.related || connections[p.id] || []).map(id=>({from:p.id,to:id,relationship:"contextual-link"}))), ...institutionalEdges];
await writeFile(resolve(root,"assets/institutional-relationships.json"),JSON.stringify({fiction:true,entities,edges},null,2)+"\n");
await writeFile(resolve(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${manifest.map(p => `  <url><loc>${origin + p.route}</loc><lastmod>${p.lastmod}</lastmod>${Object.entries(p.alternates).map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${p.alternates.en}"/><image:image><image:loc>${origin + p.image}</image:loc></image:image></url>`).join("\n")}\n</urlset>\n`);
const config = JSON.parse(await readFile(resolve(root, "vercel.json"), "utf8"));
const retired = Object.fromEntries(Object.entries(retiredRoutes).flatMap(([source, destination]) => [[source, destination], [`/ja${source}`, `/ja${destination}`]]));
config.redirects = config.redirects.filter(r => !r.source.startsWith("/products/mikoshi") && !r.source.startsWith("/ja/products/mikoshi") && !r.source.startsWith("/archive") && !r.source.startsWith("/ja/archive")).map(r => {
  const source = ["/operations/:path*", "/operations/:path*/"].includes(r.source) ? r.source.replace(":path*", ":path((?!tokyo(?:/|$)|night-city(?:/|$)).*)") : r.source;
  const match = Object.entries(retired).find(([source]) => r.source === source.slice(0, -1) || r.source.startsWith(source));
  return { ...r, source, destination: match?.[1] || retiredRoutes[r.destination] || r.destination };
});
for (const [source, destination] of Object.entries(retired)) for (const variant of [source.slice(0, -1), source, `${source}:path*`]) {
  if (!config.redirects.some(r => r.source === variant)) config.redirects.push({ source: variant, destination, permanent: true });
}
await writeFile(resolve(root, "vercel.json"), JSON.stringify(config, null, 2) + "\n");
console.log(`Built ${pages.length} pages in ${languages.length} languages (${manifest.length} canonical URLs).`);
