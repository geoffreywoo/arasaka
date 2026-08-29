import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

const products = [
  {
    slug: "relic",
    code: "AR-RELIC",
    name: "Relic Continuity Suite",
    nameJa: "Relic コンティニュイティ・スイート",
    category: "Neural continuity",
    categoryJa: "ニューラル・コンティニュイティ",
    summary: "Governed capture, custody, and continuity planning for leadership knowledge and institutional memory.",
    summaryJa: "経営知識と組織記憶のための、統治された取得・保管・継承計画。",
    hero: "assets/product-relic-hero-v2.jpg",
    operationImage: "assets/product-relic-operation-v1.jpg",
    operationAlt: "Relic continuity chamber in a private Tokyo installation",
    operationAltJa: "東京のプライベート施設に設置された Relic コンティニュイティ・チェンバー",
    operationHeadline: "A private continuity environment, installed around the institution.",
    operationHeadlineJa: "組織のために構築される、プライベートな継承環境。",
    operationCopy: "Relic is deployed as a dedicated environment with separate capture, validation, and custody zones. Client-appointed authorities govern every transfer, release, and recovery event.",
    operationCopyJa: "Relic は、取得、検証、カストディを分離した専用環境として導入されます。顧客が指名した権限者が、すべての転送、解放、復旧を統治します。",
    operationMetrics: [
      ["Capture session", "6–12 hr", "取得セッション"],
      ["Validation cycles", "03", "検証サイクル"],
      ["Archive replicas", "03", "アーカイブ複製"],
      ["Recovery objective", "< 90 min", "復旧目標"]
    ],
    accent: "red",
    specs: [
      ["Archive integrity", "99.9994%", "アーカイブ完全性"],
      ["Custody authority", "Dual key", "保管権限"],
      ["Deployment", "Private facility", "配備形態"]
    ],
    headline: "Continuity for leadership, knowledge, and institutional memory.",
    headlineJa: "経営、知識、組織記憶のためのコンティニュイティ。",
    overview: "Relic converts high-value knowledge into a governed continuity asset. Capture systems, integrity controls, private custody, and succession workflows operate as one accountable environment rather than a collection of disconnected tools.",
    overviewJa: "Relic は、価値の高い知識を統治可能なコンティニュイティ資産へ変換します。取得システム、完全性管理、プライベート保管、継承ワークフローを、分断されたツールではなく一つの説明責任ある環境として運用します。",
    capabilities: [
      ["Identity capture", "High-fidelity capture with provenance, consent, and operator authority recorded at source.", "アイデンティティ取得", "来歴、同意、オペレーター権限を取得時点で記録する高精度キャプチャ。"],
      ["Continuity archive", "Encrypted, versioned archives held inside client-controlled custody boundaries.", "コンティニュイティ・アーカイブ", "顧客管理の保管境界内で保持される、暗号化・バージョン管理されたアーカイブ。"],
      ["Succession rehearsal", "Controlled simulations test decision continuity before leadership transitions become urgent.", "継承リハーサル", "経営移行が緊急課題になる前に、意思決定の継続性を検証する管理型シミュレーション。"]
    ],
    architecture: [
      ["01", "Capture node", "Acquisition hardware and provenance controls."],
      ["02", "Integrity kernel", "Model validation, drift detection, and version control."],
      ["03", "Custody vault", "Client-held encryption and recovery authority."],
      ["04", "Governance console", "Consent, release, and succession policy."],
    ],
    architectureJa: [
      ["01", "キャプチャ・ノード", "取得ハードウェアと来歴管理。"],
      ["02", "インテグリティ・カーネル", "モデル検証、ドリフト検知、版管理。"],
      ["03", "カストディ・ヴォールト", "顧客保有の暗号鍵と復旧権限。"],
      ["04", "ガバナンス・コンソール", "同意、解放、継承方針。"],
    ],
    deployment: "A typical institutional deployment moves from authority design to private-environment validation in 12 to 20 weeks.",
    deploymentJa: "標準的な機関導入は、権限設計からプライベート環境での検証まで12〜20週間です。",
    stages: [["01", "Authority design", "2–3 weeks"], ["02", "Environment build", "4–6 weeks"], ["03", "Validation", "4–8 weeks"], ["04", "Operational handover", "2–3 weeks"]],
    stagesJa: [["01", "権限設計", "2〜3週間"], ["02", "環境構築", "4〜6週間"], ["03", "検証", "4〜8週間"], ["04", "運用移管", "2〜3週間"]],
    assurance: ["Named human authority for every release", "Client-controlled encryption and recovery", "Complete provenance and change history"],
    assuranceJa: ["すべての解放に指名された人間の権限", "顧客管理の暗号化と復旧", "完全な来歴と変更履歴"]
  },
  {
    slug: "securenet",
    code: "SN-01",
    name: "SecureNet Defense Mesh",
    nameJa: "SecureNet ディフェンス・メッシュ",
    category: "Network security",
    categoryJa: "ネットワーク・セキュリティ",
    summary: "Adaptive network inspection, identity protection, and human-led incident command for critical environments.",
    summaryJa: "重要環境のための適応型ネットワーク検査、ID保護、人間主導のインシデント指揮。",
    hero: "assets/product-securenet-appliance-v2.jpg",
    operationImage: "assets/product-securenet-operation-v1.jpg",
    operationAlt: "SecureNet regional command center and defense mesh appliances",
    operationAltJa: "SecureNet 地域コマンドセンターとディフェンス・メッシュ機器",
    operationHeadline: "Defense becomes an operating capability, not a collection of alerts.",
    operationHeadlineJa: "防御を、アラートの集合ではなく運用能力へ。",
    operationCopy: "SecureNet binds inspection hardware, identity policy, evidence retention, and named regional command into one response environment. It is installed segment by segment, then operated continuously.",
    operationCopyJa: "SecureNet は、検査ハードウェア、ID方針、証拠保持、指名された地域指揮を一つの対応環境に統合します。セグメント単位で導入し、その後は継続的に運用します。",
    operationMetrics: [
      ["Protected segments", "12K+", "保護セグメント"],
      ["Correlation zones", "08", "相関ゾーン"],
      ["Evidence retention", "7 years", "証拠保持"],
      ["Escalation SLA", "< 4 min", "エスカレーション SLA"]
    ],
    accent: "cyan",
    specs: [
      ["Inspection latency", "0.8 ms", "検査遅延"],
      ["Identity scope", "Human + machine", "ID範囲"],
      ["Operations", "24 / 7", "運用"]
    ],
    headline: "One security fabric across identity, network, and response.",
    headlineJa: "ID、ネットワーク、対応を一体化するセキュリティ基盤。",
    overview: "SecureNet combines edge appliances, identity isolation, managed detection, and regional incident command. Institutions gain one operating model from preventive control through recovery, with human authority retained at every consequential action.",
    overviewJa: "SecureNet は、エッジ機器、ID分離、マネージド検知、地域インシデント指揮を統合します。予防管理から復旧まで一つの運用モデルを提供し、重要な操作では常に人間の権限を維持します。",
    capabilities: [
      ["Adaptive inspection", "Policy-aware traffic analysis at client edge, core, and sovereign boundary.", "適応型検査", "顧客エッジ、コア、主権境界でのポリシー認識型トラフィック分析。"],
      ["Credential isolation", "Privileged identities are segmented across people, machines, and autonomous agents.", "資格情報分離", "人、機械、自律エージェントにわたる特権IDを分離。"],
      ["Incident command", "Named responders coordinate containment, evidence, and restoration across jurisdictions.", "インシデント指揮", "指名された対応者が、法域をまたぐ封じ込め、証拠、復旧を統括。"]
    ],
    architecture: [
      ["01", "Edge appliance", "Inline inspection and local policy execution."],
      ["02", "Identity plane", "Credential graph and privileged isolation."],
      ["03", "Defense mesh", "Regional correlation and threat containment."],
      ["04", "Command service", "Human-led escalation and recovery."],
    ],
    architectureJa: [
      ["01", "エッジ・アプライアンス", "インライン検査とローカル方針実行。"],
      ["02", "アイデンティティ・プレーン", "資格情報グラフと特権分離。"],
      ["03", "ディフェンス・メッシュ", "地域相関分析と脅威封じ込め。"],
      ["04", "コマンド・サービス", "人間主導のエスカレーションと復旧。"],
    ],
    deployment: "SecureNet is introduced in controlled segments before expanding across identity, endpoint, network, and response operations.",
    deploymentJa: "SecureNet は管理されたセグメントから導入し、ID、エンドポイント、ネットワーク、対応運用へ段階的に拡張します。",
    stages: [["01", "Exposure review", "1–2 weeks"], ["02", "Pilot segment", "3–5 weeks"], ["03", "Mesh rollout", "6–12 weeks"], ["04", "Managed operations", "Continuous"]],
    stagesJa: [["01", "露出評価", "1〜2週間"], ["02", "パイロット区画", "3〜5週間"], ["03", "メッシュ展開", "6〜12週間"], ["04", "マネージド運用", "継続"]],
    assurance: ["Human authorization for isolation and recovery", "Sovereign and air-gapped deployment options", "Evidence-preserving incident workflows"],
    assuranceJa: ["分離と復旧における人間の承認", "主権型・エアギャップ型の配備選択肢", "証拠を保全するインシデント・ワークフロー"]
  },
  {
    slug: "custody",
    code: "IC-02",
    name: "Institutional Custody Network",
    nameJa: "インスティテューショナル・カストディ・ネットワーク",
    category: "Strategic asset custody",
    categoryJa: "戦略資産カストディ",
    summary: "Protected custody and settlement infrastructure for capital, intellectual property, and sovereign counterparties.",
    summaryJa: "資本、知的財産、主権カウンターパーティーのための保護された保管・決済インフラ。",
    hero: "assets/product-custody-core-v2.jpg",
    operationImage: "assets/product-custody-operation-v1.jpg",
    operationAlt: "Institutional custody modules crossing a controlled settlement threshold",
    operationAltJa: "管理された決済境界を通過する機関向けカストディ・モジュール",
    operationHeadline: "Every movement crosses a governed threshold.",
    operationHeadlineJa: "すべての移動が、統治された境界を通過する。",
    operationCopy: "Custody sites separate intake, holding, settlement, and disclosure into physically and cryptographically distinct zones. Material movement requires a defined quorum and produces a permanent receipt.",
    operationCopyJa: "カストディ施設では、受入、保管、決済、開示を物理的かつ暗号学的に分離します。重要な移動には所定の承認定足数が必要で、恒久的な受領記録が生成されます。",
    operationMetrics: [
      ["Custody cells", "256 / site", "カストディ・セル"],
      ["Approval quorum", "2 of 3", "承認定足数"],
      ["Receipt finality", "< 4 s", "受領確定"],
      ["Control attestation", "Annual", "管理証明"]
    ],
    accent: "gold",
    specs: [
      ["Settlement", "T+0", "決済"],
      ["Custody class", "Tier VI", "カストディ等級"],
      ["Authority", "Multi-party", "権限"]
    ],
    headline: "Custody infrastructure for assets that cannot be exposed to ordinary markets.",
    headlineJa: "通常市場への露出が許されない資産のためのカストディ基盤。",
    overview: "The Institutional Custody Network unifies protected storage, confidential settlement, and board-governed authority. It is designed for strategic capital, intellectual property, and mandate structures where privacy and proof must coexist.",
    overviewJa: "インスティテューショナル・カストディ・ネットワークは、保護保管、機密決済、取締役会統治の権限を統合します。プライバシーと証明の両立が必要な戦略資本、知的財産、委任構造向けに設計されています。",
    capabilities: [
      ["Protected custody", "Segregated vaults hold capital instruments, keys, patents, and authority records.", "保護カストディ", "分離されたヴォールトで資本証券、鍵、特許、権限記録を保管。"],
      ["Confidential settlement", "Counterparties settle without disclosing intent beyond the required governance boundary.", "機密決済", "必要な統治境界を超えて意図を開示せずにカウンターパーティー間で決済。"],
      ["Mandate governance", "Multi-party approvals and immutable receipts govern every material movement.", "委任ガバナンス", "複数当事者の承認と不変の受領記録がすべての重要な移動を統治。"]
    ],
    architecture: [
      ["01", "Asset registry", "Rights, instruments, and authority mapped at intake."],
      ["02", "Custody core", "Segregated storage and client-held control."],
      ["03", "Settlement rail", "Confidential multi-party execution."],
      ["04", "Board ledger", "Approvals, receipts, and disclosure policy."],
    ],
    architectureJa: [
      ["01", "アセット・レジストリ", "受入時に権利、証券、権限を登録。"],
      ["02", "カストディ・コア", "分離保管と顧客保有の管理。"],
      ["03", "セトルメント・レール", "機密性の高い複数当事者決済。"],
      ["04", "ボード・レジャー", "承認、受領、開示方針。"],
    ],
    deployment: "Deployment begins with mandate and asset classification, then moves through custody, settlement, and board-control validation.",
    deploymentJa: "導入は委任と資産分類から始まり、カストディ、決済、取締役会管理の検証へ進みます。",
    stages: [["01", "Mandate design", "2–4 weeks"], ["02", "Asset onboarding", "3–6 weeks"], ["03", "Settlement validation", "3–5 weeks"], ["04", "Control attestation", "Annual"]],
    stagesJa: [["01", "委任設計", "2〜4週間"], ["02", "資産受入", "3〜6週間"], ["03", "決済検証", "3〜5週間"], ["04", "管理証明", "年次"]],
    assurance: ["Segregated client custody boundaries", "Multi-party approval for material movement", "Selective disclosure with complete receipts"],
    assuranceJa: ["分離された顧客カストディ境界", "重要な移動に対する複数当事者承認", "完全な受領記録を伴う選択的開示"]
  },
  {
    slug: "perimeter",
    code: "AP-03",
    name: "Autonomous Perimeter Systems",
    nameJa: "オートノマス・ペリメーター・システムズ",
    category: "Protective autonomy",
    categoryJa: "防護オートノミー",
    summary: "Sensor fusion, coordinated response, and human-authorized protection for facilities and mobility corridors.",
    summaryJa: "施設と移動経路のためのセンサー融合、協調対応、人間承認型防護。",
    hero: "assets/product-perimeter-sentinel-v2.jpg",
    operationImage: "assets/product-perimeter-operation-v1.jpg",
    operationAlt: "Autonomous perimeter units operating under human command at a Tokyo campus",
    operationAltJa: "東京のキャンパスで人間の指揮下にあるオートノマス・ペリメーター・ユニット",
    operationHeadline: "A protected perimeter that adapts without surrendering command.",
    operationHeadlineJa: "指揮権を手放さずに適応する、防護ペリメーター。",
    operationCopy: "Perimeter deployments combine a centimeter-scale site model, distributed sensing, and coordinated ground and aerial units. Named operators retain direct override and authorize every consequential action.",
    operationCopyJa: "ペリメーター導入では、センチメートル精度のサイトモデル、分散センシング、地上・航空ユニットの協調を統合します。指名オペレーターが直接オーバーライドを保持し、すべての重要な行動を承認します。",
    operationMetrics: [
      ["Sensor channels", "18 / unit", "センサー・チャンネル"],
      ["Site-model resolution", "5 cm", "サイトモデル解像度"],
      ["Command latency", "< 250 ms", "指揮遅延"],
      ["Override path", "Direct", "オーバーライド経路"]
    ],
    accent: "lime",
    specs: [
      ["Response envelope", "18 s", "応答時間"],
      ["Command model", "Human authorized", "指揮モデル"],
      ["Coverage", "Campus + route", "対象範囲"]
    ],
    headline: "A protected environment that moves with the people and assets inside it.",
    headlineJa: "人と資産に合わせて移動する保護環境。",
    overview: "Autonomous Perimeter Systems combine sensing, coordinated machines, route assurance, and named human command. The system is designed to detect, classify, and contain risk while preserving explicit civilian and operational boundaries.",
    overviewJa: "オートノマス・ペリメーター・システムズは、センシング、協調機械、経路保証、指名された人間の指揮を統合します。明確な民間・運用境界を維持しながら、リスクを検知、分類、封じ込めるためのシステムです。",
    capabilities: [
      ["Sensor fusion", "Facility, vehicle, aerial, and identity signals combine into one operating picture.", "センサー融合", "施設、車両、空域、IDの信号を一つの運用状況へ統合。"],
      ["Coordinated response", "Autonomous units reposition, escort, and contain under policy-defined limits.", "協調対応", "自律ユニットが方針で定めた制限内で再配置、護衛、封じ込めを実行。"],
      ["Human command", "Named operators authorize consequential actions and retain immediate override.", "人間指揮", "指名オペレーターが重要な操作を承認し、即時オーバーライドを保持。"]
    ],
    architecture: [
      ["01", "Sensing layer", "Distributed detection and identity context."],
      ["02", "Coordination core", "Formation, route, and resource planning."],
      ["03", "Response units", "Purpose-built ground and aerial platforms."],
      ["04", "Command ledger", "Authority, exclusions, and action receipts."],
    ],
    architectureJa: [
      ["01", "センシング層", "分散検知とIDコンテキスト。"],
      ["02", "コーディネーション・コア", "編成、経路、資源計画。"],
      ["03", "レスポンス・ユニット", "専用の地上・航空プラットフォーム。"],
      ["04", "コマンド・レジャー", "権限、除外、行動受領記録。"],
    ],
    deployment: "Each deployment is modeled around the facility, route, authority structure, and civilian exclusion requirements before any autonomous operation begins.",
    deploymentJa: "すべての導入は、自律運用開始前に施設、経路、権限構造、民間除外要件をモデル化します。",
    stages: [["01", "Site model", "2–4 weeks"], ["02", "Boundary design", "2–3 weeks"], ["03", "Controlled trials", "4–8 weeks"], ["04", "Readiness review", "Quarterly"]],
    stagesJa: [["01", "サイトモデル", "2〜4週間"], ["02", "境界設計", "2〜3週間"], ["03", "管理型試験", "4〜8週間"], ["04", "即応性審査", "四半期"]],
    assurance: ["Named human authority for consequential action", "Civilian and geographic exclusion policies", "Complete sensor and command receipts"],
    assuranceJa: ["重要な行動に対する指名された人間の権限", "民間・地理的除外方針", "完全なセンサー・指揮受領記録"]
  }
];

const navItems = [
  ["products/", "Products", "製品", "products"],
  ["industries/", "Industries", "産業", "industries"],
  ["research/", "Research", "研究開発", "research"],
  ["company/", "Company", "企業情報", "company"]
];

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function translated(tag, en, ja, className = "", extra = "") {
  return `<${tag}${className ? ` class="${className}"` : ""} data-ja="${escapeHtml(ja)}" ${extra}>${escapeHtml(en)}</${tag}>`;
}

function header(root, active) {
  const links = navItems.map(([path, en, ja, key]) => `<a href="${root}${path}"${active === key ? ' aria-current="page"' : ""} data-ja="${escapeHtml(ja)}">${en}</a>`).join("");
  return `
    <a class="skip-link" href="#main" data-ja="本文へスキップ">Skip to content</a>
    <header class="site-header" data-site-header>
      <a class="site-brand" href="${root}" aria-label="Arasaka Corporation home">
        <img class="site-brand-mark" src="${root}assets/arasaka-mark-white.png" alt="">
        <span class="site-brand-copy">
          <img class="site-brand-wordmark" src="${root}assets/arasaka-wordmark-clean-white.png" alt="Arasaka">
          <span>荒坂株式会社</span>
        </span>
      </a>
      <nav class="desktop-nav" aria-label="Primary" data-aria-ja="主要ナビゲーション">${links}</nav>
      <div class="header-actions">
        <a class="header-contact" href="${root}contact/"${active === "contact" ? ' aria-current="page"' : ""} data-ja="お問い合わせ">Contact</a>
        <div class="language-control" role="group" aria-label="Language" data-aria-ja="言語">
          <button type="button" data-language="en" aria-pressed="true">EN</button>
          <button type="button" data-language="ja" aria-pressed="false">日本語</button>
        </div>
        <button class="menu-toggle" type="button" aria-label="Open menu" data-aria-ja="メニューを開く" aria-expanded="false" data-menu-toggle><span></span><span></span><span></span></button>
      </div>
      <div class="mobile-menu" data-mobile-menu hidden>
        <nav aria-label="Mobile primary" data-aria-ja="モバイル主要ナビゲーション">${links}<a href="${root}contact/" data-ja="お問い合わせ">Contact</a></nav>
      </div>
    </header>`;
}

function footer(root) {
  return `
    <footer class="site-footer" id="project-attribution">
      <div class="footer-main shell">
        <div class="footer-brand">
          <img src="${root}assets/arasaka-mark-white.png" alt="">
          <img src="${root}assets/arasaka-wordmark-clean-white.png" alt="Arasaka">
          ${translated("p", "Integrated systems for institutions built to endure.", "永続する組織のための統合システム。")}
        </div>
        <nav class="footer-nav" aria-label="Footer products" data-aria-ja="フッター製品ナビゲーション">
          ${translated("strong", "Products", "製品")}
          ${products.map((product) => `<a href="${root}products/${product.slug}/" data-ja="${escapeHtml(product.nameJa)}">${product.name}</a>`).join("")}
        </nav>
        <nav class="footer-nav" aria-label="Footer corporate" data-aria-ja="フッター企業ナビゲーション">
          ${translated("strong", "Corporate", "企業情報")}
          <a href="${root}industries/" data-ja="産業">Industries</a>
          <a href="${root}research/" data-ja="研究開発">Research</a>
          <a href="${root}company/" data-ja="企業情報">Company</a>
          <a href="${root}contact/" data-ja="お問い合わせ">Contact</a>
        </nav>
      </div>
      <div class="footer-bottom shell">
        <div class="footer-attribution">
          <a class="footer-project-link" href="https://x.com/geoffwoo" target="_blank" rel="noopener noreferrer" data-ja="Geoff Woo プロジェクト">A Geoff Woo project</a>
        </div>
        ${translated("p", "Independent design-fiction project. Referenced names and credited imagery belong to their respective rights holders.", "独立したデザインフィクション・プロジェクトです。参照名称およびクレジット表記された画像は各権利者に帰属します。", "footer-legal")}
      </div>
    </footer>`;
}

function cta(root, heading = "Plan an institutional deployment.", headingJa = "機関導入を計画する。") {
  return `
    <section class="cta-band">
      <div class="shell cta-inner">
        <div>
          ${translated("p", "Institutional access", "機関向けアクセス", "eyebrow")}
          ${translated("h2", heading, headingJa)}
        </div>
        <a class="button button-light" href="${root}contact/"><span data-ja="導入相談">Discuss deployment</span><span aria-hidden="true">↗</span></a>
      </div>
    </section>`;
}

function productCard(product, root, featured = false) {
  return `<a class="product-card product-${product.accent}${featured ? " product-featured" : ""}" href="${root}products/${product.slug}/">
      <figure><img src="${root}${product.hero}" alt="${escapeHtml(product.name)} product system" loading="${featured ? "eager" : "lazy"}"></figure>
      <div class="product-card-body">
        <div class="product-card-meta"><span data-scramble>${product.code}</span><span data-ja="${escapeHtml(product.categoryJa)}">${product.category}</span></div>
        <h3 data-ja="${escapeHtml(product.nameJa)}">${product.name}</h3>
        <p data-ja="${escapeHtml(product.summaryJa)}">${product.summary}</p>
        <dl>${product.specs.slice(0, 2).map(([label, value, labelJa]) => `<div><dt data-ja="${escapeHtml(labelJa)}">${label}</dt><dd>${value}</dd></div>`).join("")}</dl>
        <span class="text-link"><span data-ja="製品を見る">View product</span><span aria-hidden="true">↗</span></span>
      </div>
    </a>`;
}

function operationTile(product, root) {
  return `<a class="operation-tile product-${product.accent}" href="${root}products/${product.slug}/">
      <figure><img src="${root}${product.operationImage}" alt="${escapeHtml(product.operationAlt)}" loading="lazy"></figure>
      <div class="operation-tile-copy">
        <span data-scramble>${product.code}</span>
        <div><strong data-ja="${escapeHtml(product.nameJa)}">${product.name}</strong><small data-ja="導入環境">Installed environment</small></div>
        <span aria-hidden="true">↗</span>
      </div>
    </a>`;
}

function documentShell({ root, active, page, title, titleJa, description, canonical, image, body }) {
  return `<!doctype html>
<html lang="en" data-language="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="theme-color" content="#09090b">
    <link rel="canonical" href="https://www.arasaka.com/${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Arasaka Corporation">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="https://www.arasaka.com/${canonical}">
    <meta property="og:image" content="https://www.arasaka.com/${image}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="https://www.arasaka.com/${image}">
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="${root}assets/arasaka-mark-favicon.png" type="image/png">
    <link rel="stylesheet" href="${root}styles.css">
    <script src="${root}app.js" defer></script>
  </head>
  <body data-page="${page}" data-title-en="${escapeHtml(title)}" data-title-ja="${escapeHtml(titleJa)}">
${header(root, active)}
    <main id="main">
${body}
    </main>
${footer(root)}
  </body>
</html>
`;
}

function pageHero({ root, eyebrow, eyebrowJa, title, titleJa, summary, summaryJa, image, code = "" }) {
  return `
      <section class="page-hero" style="--hero-image: url('${root}${image}')">
        <div class="page-hero-shade"></div>
        <div class="shell page-hero-content">
          ${translated("p", eyebrow, eyebrowJa, "eyebrow")}
          ${code ? `<strong class="hero-code" data-scramble>${code}</strong>` : ""}
          ${translated("h1", title, titleJa)}
          ${translated("p", summary, summaryJa, "hero-summary")}
        </div>
      </section>`;
}

function homePage() {
  const root = "./";
  const featured = products[0];
  const body = `
      <section class="home-hero" style="--hero-image: url('${featured.hero}')">
        <div class="home-hero-shade"></div>
        <div class="shell home-hero-content">
          ${translated("p", "Arasaka Corporation / Integrated systems", "荒坂株式会社 / 統合システム", "eyebrow")}
          ${translated("h1", "Critical infrastructure for institutions built to endure.", "永続する組織のための、重要インフラストラクチャ。")}
          ${translated("p", "Across continuity, network defense, strategic custody, and protective autonomy, Arasaka designs, manufactures, and operates the systems institutions entrust with their future.", "コンティニュイティ、ネットワーク防御、戦略資産カストディ、防護オートノミーにおいて、荒坂は組織が未来を託すシステムを設計、製造、運用します。", "hero-summary")}
          <div class="hero-actions">
            <a class="button button-primary" href="products/"><span data-ja="製品ポートフォリオ">Explore products</span><span aria-hidden="true">↗</span></a>
            <a class="button button-ghost" href="contact/"><span data-ja="導入相談">Discuss deployment</span><span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <a class="hero-feature" href="products/relic/">
          <span data-ja="注目製品">Featured system</span>
          <strong>${featured.code}</strong>
          <span data-ja="${escapeHtml(featured.nameJa)}">${featured.name}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>
      <section class="proof-strip" aria-label="Corporate profile" data-aria-ja="企業概要">
        <div class="shell proof-grid">
          <div><strong>1915</strong><span data-ja="東京で創業">Founded in Tokyo</span></div>
          <div><strong>US$3.2T</strong><span data-ja="保護委任資産">Assets under protected mandate</span></div>
          <div><strong>42</strong><span data-ja="事業展開市場">Markets served</span></div>
          <div><strong>24 / 7</strong><span data-ja="地域コマンド">Regional command</span></div>
        </div>
      </section>
      <section class="section section-light" id="products">
        <div class="shell">
          <div class="section-heading split-heading">
            <div>${translated("p", "Integrated portfolio", "統合ポートフォリオ", "eyebrow")}${translated("h2", "Four systems. One institutional architecture.", "4つのシステム。1つの機関アーキテクチャ。")}</div>
            ${translated("p", "Each platform is complete on its own and designed to operate as part of a shared authority, assurance, and service environment.", "各プラットフォームは単独で完結し、共通の権限・保証・サービス環境の一部として運用できるよう設計されています。", "section-intro")}
          </div>
          <div class="product-grid">
            ${products.map((product, index) => productCard(product, root, index === 0)).join("")}
          </div>
        </div>
      </section>
      <section class="section operations-showcase">
        <div class="shell">
          <div class="section-heading split-heading">
            <div>${translated("p", "Operational environments", "運用環境", "eyebrow")}${translated("h2", "Engineered as products. Delivered as accountable systems.", "製品として設計し、説明責任あるシステムとして提供。")}</div>
            ${translated("p", "Every installation combines manufactured hardware, control software, protected facilities, and named operating teams inside one governed boundary.", "すべての導入で、製造ハードウェア、制御ソフトウェア、保護施設、指名された運用チームを一つの統治境界に統合します。", "section-intro")}
          </div>
          <div class="operation-gallery">${products.map((product) => operationTile(product, root)).join("")}</div>
        </div>
      </section>
      <section class="architecture-band">
        <div class="shell architecture-layout">
          <div class="architecture-copy">
            ${translated("p", "One command architecture", "統合コマンド・アーキテクチャ", "eyebrow")}
            ${translated("h2", "Products share identity, authority, evidence, and service operations.", "製品はID、権限、証拠、サービス運用を共有します。")}
            ${translated("p", "Arasaka systems are delivered as governed environments, not isolated hardware. Every deployment binds technology to named operators, client-held controls, and reviewable evidence.", "荒坂システムは、独立したハードウェアではなく、統治された環境として提供されます。すべての導入で、技術を指名オペレーター、顧客保有の管理、検証可能な証拠に結び付けます。")}
            <a class="text-link text-link-light" href="products/"><span data-ja="アーキテクチャを見る">View the architecture</span><span aria-hidden="true">↗</span></a>
          </div>
          <ol class="architecture-stack">
            <li><span>01</span><strong data-ja="ID">Identity</strong><p data-ja="人、機械、資産を共通の権限モデルに登録。">People, machines, and assets registered to a common authority model.</p></li>
            <li><span>02</span><strong data-ja="制御">Control</strong><p data-ja="各製品に適用される顧客定義の方針。">Client-defined policy applied across every product surface.</p></li>
            <li><span>03</span><strong data-ja="証拠">Evidence</strong><p data-ja="重要な操作に対する完全な来歴と受領記録。">Complete provenance and receipts for consequential operations.</p></li>
            <li><span>04</span><strong data-ja="運用">Operations</strong><p data-ja="地域の専門チームによる継続的なサービス。">Continuous service through accountable regional teams.</p></li>
          </ol>
        </div>
      </section>
      <section class="section section-light">
        <div class="shell">
          <div class="section-heading split-heading">
            <div>${translated("p", "Industries", "産業", "eyebrow")}${translated("h2", "Built for high-consequence environments.", "重大性の高い環境のために。")}</div>
            <a class="text-link" href="industries/"><span data-ja="すべての産業を見る">View all industries</span><span aria-hidden="true">↗</span></a>
          </div>
          <div class="industry-grid">
            <a href="industries/#public-institutions"><span>01</span><strong data-ja="公共機関">Public institutions</strong><p data-ja="主権運用、危機対応、重要任務の継続。">Sovereign operations, crisis response, and continuity of critical mandates.</p></a>
            <a href="industries/#financial-services"><span>02</span><strong data-ja="金融サービス">Financial services</strong><p data-ja="戦略資産カストディ、決済、ID保証。">Strategic custody, settlement, and identity assurance.</p></a>
            <a href="industries/#advanced-industry"><span>03</span><strong data-ja="先端産業">Advanced industry</strong><p data-ja="製造、研究、重要インフラの防護。">Protection for manufacturing, research, and critical infrastructure.</p></a>
            <a href="industries/#life-sciences"><span>04</span><strong data-ja="ライフサイエンス">Life sciences</strong><p data-ja="知識保全、継承、機密研究資産。">Knowledge continuity, succession, and confidential research assets.</p></a>
          </div>
        </div>
      </section>
      <section class="section deployment-section">
        <div class="shell deployment-layout">
          <div>
            ${translated("p", "Deployment model", "導入モデル", "eyebrow")}
            ${translated("h2", "Built for decades. Deployed in controlled stages.", "数十年を見据え、管理された段階で導入。")}
            ${translated("p", "Every engagement begins with authority, operating boundaries, and success criteria before systems enter the client environment.", "すべての取り組みは、システムが顧客環境に入る前に、権限、運用境界、成功基準を定義することから始まります。", "section-intro")}
          </div>
          <ol class="deployment-steps">
            <li><span>01</span><div><strong data-ja="要件定義">Define</strong><p data-ja="目的、権限、境界、証拠要件。">Objectives, authority, boundaries, and evidence requirements.</p></div></li>
            <li><span>02</span><div><strong data-ja="設計">Design</strong><p data-ja="技術、運用、ガバナンスを一体設計。">Technology, operations, and governance designed together.</p></div></li>
            <li><span>03</span><div><strong data-ja="検証">Validate</strong><p data-ja="限定環境で性能と統制を検証。">Performance and controls tested in a bounded environment.</p></div></li>
            <li><span>04</span><div><strong data-ja="運用">Operate</strong><p data-ja="地域チームによる継続運用と審査。">Continuous operation and review through regional teams.</p></div></li>
          </ol>
        </div>
      </section>
      <section class="company-feature">
        <img src="assets/hero-headquarters.jpg" alt="Arasaka Tokyo headquarters" loading="lazy">
        <div class="company-feature-copy">
          ${translated("p", "Arasaka Corporation", "荒坂株式会社", "eyebrow")}
          ${translated("h2", "Tokyo stewardship. Regional accountability.", "東京による統括。地域による説明責任。")}
          ${translated("p", "A privately held group operating through specialized product companies, regional commands, and shared standards for governance and assurance.", "専門製品会社、地域統括、共通のガバナンス・保証基準を通じて事業を展開する非公開企業グループです。")}
          <a class="button button-ghost" href="company/"><span data-ja="企業情報">Company overview</span><span aria-hidden="true">↗</span></a>
        </div>
      </section>
${cta(root)}`;

  return documentShell({
    root,
    active: "home",
    page: "home",
    title: "Arasaka Corporation | Integrated Institutional Systems",
    titleJa: "荒坂株式会社 | 統合機関システム",
    description: "Arasaka provides integrated systems for institutional continuity, network security, strategic custody, and protective autonomy.",
    canonical: "",
    image: featured.hero,
    body
  });
}

function productsPage() {
  const root = "../";
  const body = `
${pageHero({root, eyebrow: "Product portfolio", eyebrowJa: "製品ポートフォリオ", title: "Four systems. One operating architecture.", titleJa: "4つのシステム。1つの運用アーキテクチャ。", summary: "Arasaka designs, manufactures, and operates a focused portfolio for continuity, defense, custody, and protective autonomy, unified by one institutional control architecture.", summaryJa: "荒坂は、コンティニュイティ、防御、カストディ、防護オートノミーに集中したポートフォリオを設計、製造、運用し、一つの機関統制アーキテクチャで統合します。", image: products[1].hero})}
      <section class="section section-light">
        <div class="shell">
          <div class="section-heading split-heading"><div>${translated("p", "Flagship systems", "フラッグシップ・システム", "eyebrow")}${translated("h2", "A focused portfolio for institutional control.", "機関統制のための集中ポートフォリオ。")}</div>${translated("p", "Each product has a defined job, clear operating boundary, and deployment path. Together they form an integrated institutional stack.", "各製品は明確な役割、運用境界、導入経路を持ちます。組み合わせることで統合機関スタックを形成します。", "section-intro")}</div>
          <div class="product-grid portfolio-grid">${products.map((product) => productCard(product, root)).join("")}</div>
        </div>
      </section>
      <section class="section comparison-section">
        <div class="shell">
          <div class="section-heading">${translated("p", "Portfolio guide", "ポートフォリオ・ガイド", "eyebrow")}${translated("h2", "Start with the institutional outcome.", "機関の成果から始める。")}</div>
          <div class="comparison-table" role="region" aria-label="Product comparison" data-aria-ja="製品比較" tabindex="0">
            <table>
              <thead><tr><th data-ja="製品">Product</th><th data-ja="主な成果">Primary outcome</th><th data-ja="代表的な購入者">Typical buyer</th><th data-ja="導入形態">Deployment</th></tr></thead>
              <tbody>
                <tr><th>Relic</th><td data-ja="知識と経営の継続">Knowledge and leadership continuity</td><td data-ja="取締役会、経営、研究">Boards, leadership, research</td><td data-ja="プライベート施設">Private facility</td></tr>
                <tr><th>SecureNet</th><td data-ja="サイバー耐性と復旧">Cyber resilience and recovery</td><td data-ja="CISO、重要インフラ">CISOs, critical infrastructure</td><td data-ja="エッジから地域へ">Edge to regional</td></tr>
                <tr><th>Custody</th><td data-ja="戦略資産の保護と移動">Strategic asset protection and movement</td><td data-ja="財務、法務、主権機関">Treasury, legal, sovereign institutions</td><td data-ja="分離カストディ">Segregated custody</td></tr>
                <tr><th>Perimeter</th><td data-ja="施設・経路の防護">Facility and route protection</td><td data-ja="セキュリティ、運用、公共機関">Security, operations, public institutions</td><td data-ja="キャンパスとモビリティ">Campus and mobility</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="architecture-band"><div class="shell architecture-layout"><div class="architecture-copy">${translated("p", "Integrated deployment", "統合導入", "eyebrow")}${translated("h2", "One authority model across every system.", "すべてのシステムに共通する一つの権限モデル。")}${translated("p", "Shared identity, policy, evidence, and operations let institutions add capabilities without creating a new control plane for every product.", "共通のID、方針、証拠、運用により、製品ごとに新たな管理基盤を構築することなく機能を追加できます。")}</div><ol class="architecture-stack"><li><span>01</span><strong data-ja="共通ID">Shared identity</strong><p data-ja="人、機械、資産を一つの権限グラフへ。">People, machines, and assets in one authority graph.</p></li><li><span>02</span><strong data-ja="共通証拠">Shared evidence</strong><p data-ja="製品横断の来歴、受領記録、審査。">Cross-product provenance, receipts, and review.</p></li><li><span>03</span><strong data-ja="共通運用">Shared operations</strong><p data-ja="指名された地域チームと統一サービス水準。">Named regional teams and consistent service levels.</p></li></ol></div></section>
${cta(root, "Choose the first system. Design for the full architecture.", "最初のシステムを選び、全体アーキテクチャを設計する。")}`;

  return documentShell({root, active: "products", page: "products", title: "Products | Arasaka Corporation", titleJa: "製品 | 荒坂株式会社", description: "Explore Arasaka products for continuity, network security, strategic custody, and protective autonomy.", canonical: "products/", image: products[1].hero, body});
}

function productPage(product) {
  const root = "../../";
  const others = products.filter(({slug}) => slug !== product.slug);
  const body = `
${pageHero({root, eyebrow: product.category, eyebrowJa: product.categoryJa, title: product.name, titleJa: product.nameJa, summary: product.summary, summaryJa: product.summaryJa, image: product.hero, code: product.code})}
      <section class="product-spec-band product-${product.accent}"><div class="shell">${product.specs.map(([label, value, labelJa]) => `<div><span data-ja="${escapeHtml(labelJa)}">${label}</span><strong>${value}</strong></div>`).join("")}<a href="${root}contact/"><span data-ja="導入相談">Discuss deployment</span><span aria-hidden="true">↗</span></a></div></section>
      <section class="section section-light product-overview">
        <div class="shell two-column-intro">
          <div>${translated("p", "Product overview", "製品概要", "eyebrow")}${translated("h2", product.headline, product.headlineJa)}</div>
          ${translated("p", product.overview, product.overviewJa, "lead-copy")}
        </div>
        <div class="shell capability-grid">${product.capabilities.map(([title, copy, titleJa, copyJa], index) => `<article><span>0${index + 1}</span><h3 data-ja="${escapeHtml(titleJa)}">${title}</h3><p data-ja="${escapeHtml(copyJa)}">${copy}</p></article>`).join("")}</div>
      </section>
      <section class="product-operation product-${product.accent}">
        <div class="shell product-operation-layout">
          <figure>
            <img src="${root}${product.operationImage}" alt="${escapeHtml(product.operationAlt)}" data-alt-ja="${escapeHtml(product.operationAltJa)}" loading="lazy">
            <figcaption><span data-scramble>${product.code}/OPS</span><span data-ja="導入環境">Installed environment</span></figcaption>
          </figure>
          <div class="product-operation-copy">
            ${translated("p", "System in operation", "稼働中のシステム", "eyebrow")}
            ${translated("h2", product.operationHeadline, product.operationHeadlineJa)}
            ${translated("p", product.operationCopy, product.operationCopyJa, "operation-intro")}
            <dl class="operation-metrics">${product.operationMetrics.map(([label, value, labelJa]) => `<div><dt data-ja="${escapeHtml(labelJa)}">${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>
          </div>
        </div>
      </section>
      <section class="section product-architecture">
        <div class="shell">
          <div class="section-heading split-heading"><div>${translated("p", "System architecture", "システム・アーキテクチャ", "eyebrow")}${translated("h2", "A complete operating environment.", "完全な運用環境。")}</div>${translated("p", "Hardware, software, custody, and governance are designed as one product boundary.", "ハードウェア、ソフトウェア、カストディ、ガバナンスを一つの製品境界として設計します。", "section-intro")}</div>
          <ol class="product-layer-list">${product.architecture.map((layer, index) => `<li><span>${layer[0]}</span><strong data-ja="${escapeHtml(product.architectureJa[index][1])}">${layer[1]}</strong><p data-ja="${escapeHtml(product.architectureJa[index][2])}">${layer[2]}</p></li>`).join("")}</ol>
        </div>
      </section>
      <section class="section section-light">
        <div class="shell deployment-layout">
          <div>${translated("p", "Deployment", "導入", "eyebrow")}${translated("h2", "Controlled introduction. Measurable handover.", "管理された導入。測定可能な移管。")}${translated("p", product.deployment, product.deploymentJa, "section-intro")}</div>
          <ol class="deployment-steps">${product.stages.map((stage, index) => `<li><span>${stage[0]}</span><div><strong data-ja="${escapeHtml(product.stagesJa[index][1])}">${stage[1]}</strong><p data-ja="${escapeHtml(product.stagesJa[index][2])}">${stage[2]}</p></div></li>`).join("")}</ol>
        </div>
      </section>
      <section class="assurance-band">
        <div class="shell assurance-layout"><div>${translated("p", "Assurance", "保証", "eyebrow")}${translated("h2", "Control remains visible and reviewable.", "管理は可視かつ審査可能。")}</div><ul>${product.assurance.map((item, index) => `<li data-ja="${escapeHtml(product.assuranceJa[index])}">${item}</li>`).join("")}</ul></div>
      </section>
      <section class="section section-light related-products">
        <div class="shell"><div class="section-heading split-heading"><div>${translated("p", "Related products", "関連製品", "eyebrow")}${translated("h2", "Extend the architecture.", "アーキテクチャを拡張。")}</div><a class="text-link" href="${root}products/"><span data-ja="全製品を見る">View all products</span><span aria-hidden="true">↗</span></a></div><div class="related-grid">${others.map((other) => productCard(other, root)).join("")}</div></div>
      </section>
${cta(root, `Evaluate ${product.name} for your institution.`, `${product.nameJa} の導入を評価する。`)}`;

  return documentShell({root, active: "products", page: `product-${product.slug}`, title: `${product.name} | Arasaka Corporation`, titleJa: `${product.nameJa} | 荒坂株式会社`, description: product.summary, canonical: `products/${product.slug}/`, image: product.hero, body});
}

function industriesPage() {
  const root = "../";
  const industries = [
    ["public-institutions", "Public institutions", "公共機関", "Sovereign operations require systems that remain accountable through crisis, transition, and long operating horizons.", "主権運用には、危機、移行、長期運用を通じて説明責任を維持するシステムが必要です。", ["Relic", "SecureNet", "Perimeter"], products[3].operationImage],
    ["financial-services", "Financial services", "金融サービス", "Protect strategic assets, privileged identities, and settlement authority without sacrificing speed or proof.", "速度や証明を犠牲にせず、戦略資産、特権ID、決済権限を保護します。", ["Custody", "SecureNet"], products[2].operationImage],
    ["advanced-industry", "Advanced industry", "先端産業", "Secure manufacturing, research campuses, and critical infrastructure across physical and digital boundaries.", "物理・デジタル境界をまたいで、製造、研究キャンパス、重要インフラを保護します。", ["SecureNet", "Perimeter"], products[1].operationImage],
    ["life-sciences", "Life sciences", "ライフサイエンス", "Preserve institutional knowledge, protect confidential research, and plan continuity before key transitions.", "組織知識を保全し、機密研究を守り、重要な移行前にコンティニュイティを計画します。", ["Relic", "Custody"], products[0].operationImage]
  ];
  const body = `
${pageHero({root, eyebrow: "Industries", eyebrowJa: "産業", title: "Systems for environments where failure compounds.", titleJa: "失敗が連鎖する環境のためのシステム。", summary: "Arasaka products are designed for institutions whose security, authority, assets, and knowledge must remain operational through disruption.", summaryJa: "荒坂製品は、混乱時にもセキュリティ、権限、資産、知識を運用し続ける必要がある機関向けに設計されています。", image: "assets/security-operations.jpg"})}
      <section class="section section-light industry-sections">
        <div class="shell">${industries.map(([id, title, titleJa, copy, copyJa, systems, image], index) => `<article id="${id}" class="industry-row${index % 2 ? " reverse" : ""}"><figure><img src="${root}${image}" alt="${escapeHtml(title)} systems" loading="lazy"></figure><div><span class="industry-number">0${index + 1}</span><h2 data-ja="${escapeHtml(titleJa)}">${title}</h2><p data-ja="${escapeHtml(copyJa)}">${copy}</p><div class="system-tags">${systems.map((system) => `<span>${system}</span>`).join("")}</div><a class="text-link" href="${root}products/"><span data-ja="関連製品を見る">View relevant products</span><span aria-hidden="true">↗</span></a></div></article>`).join("")}</div>
      </section>
      <section class="section"><div class="shell two-column-intro"><div>${translated("p", "Engagement model", "エンゲージメント・モデル", "eyebrow")}${translated("h2", "Start with the operating boundary, not a product catalog.", "製品カタログではなく、運用境界から始める。")}</div>${translated("p", "Regional teams map decision authority, critical assets, failure conditions, and assurance requirements before recommending a system configuration.", "地域チームは、システム構成を提案する前に、意思決定権限、重要資産、障害条件、保証要件を整理します。", "lead-copy")}</div></section>
${cta(root, "Map your institutional requirements.", "機関要件を整理する。")}`;
  return documentShell({root, active: "industries", page: "industries", title: "Industries | Arasaka Corporation", titleJa: "産業 | 荒坂株式会社", description: "Arasaka systems for public institutions, financial services, advanced industry, and life sciences.", canonical: "industries/", image: "assets/security-operations.jpg", body});
}

function researchPage() {
  const root = "../";
  const themes = [
    ["neural-continuity", "Neural continuity", "ニューラル・コンティニュイティ", "Identity capture, long-duration model integrity, and governed continuity across biological and synthetic states.", "生物学的・合成的状態をまたぐID取得、長期モデル完全性、統治されたコンティニュイティ。", "assets/product-relic-hero-v2.jpg"],
    ["secure-compute", "Secure compute", "セキュア・コンピュート", "Policy-aware computation, hostile-route isolation, and resilient operation at sovereign network boundaries.", "主権ネットワーク境界における方針認識型計算、敵対経路分離、強靭な運用。", "assets/product-securenet-appliance-v2.jpg"],
    ["institutional-systems", "Institutional systems", "機関システム", "Custody, settlement, and authority models for capital and knowledge assets with generational time horizons.", "世代単位の時間軸を持つ資本・知識資産のためのカストディ、決済、権限モデル。", "assets/product-custody-core-v2.jpg"],
    ["trustworthy-autonomy", "Trustworthy autonomy", "信頼可能なオートノミー", "Machine coordination with explicit human authority, civilian exclusions, and complete action receipts.", "明確な人間の権限、民間除外、完全な行動受領記録を備えた機械協調。", "assets/product-perimeter-sentinel-v2.jpg"]
  ];
  const body = `
${pageHero({root, eyebrow: "Arasaka Research", eyebrowJa: "荒坂研究開発", title: "Engineering for institutions measured in generations.", titleJa: "世代単位で評価される機関のための技術。", summary: "Arasaka Research develops the underlying systems for continuity, secure computation, institutional custody, and accountable autonomy.", summaryJa: "荒坂研究開発は、コンティニュイティ、セキュア計算、機関カストディ、説明責任あるオートノミーの基盤システムを開発します。", image: "assets/cyberware-foundry.jpg"})}
      <section class="section section-light research-grid-section"><div class="shell"><div class="section-heading split-heading"><div>${translated("p", "Research domains", "研究領域", "eyebrow")}${translated("h2", "Four domains. Shared standards for control.", "4つの領域。共通の管理基準。")}</div>${translated("p", "Research programs move toward products only when technical performance and institutional control can be evaluated together.", "研究プログラムは、技術性能と機関統制を同時に評価できる場合にのみ製品化へ進みます。", "section-intro")}</div><div class="research-grid">${themes.map(([id,title,titleJa,copy,copyJa,image],i)=>`<article id="${id}"><figure><img src="${root}${image}" alt="${escapeHtml(title)} research" loading="lazy"></figure><span>0${i+1}</span><h2 data-ja="${escapeHtml(titleJa)}">${title}</h2><p data-ja="${escapeHtml(copyJa)}">${copy}</p></article>`).join("")}</div></div></section>
      <section class="section research-principles"><div class="shell"><div class="section-heading">${translated("p", "Research governance", "研究ガバナンス", "eyebrow")}${translated("h2", "Capability advances inside defined authority.", "能力は定義された権限内で進化する。")}</div><ol class="principle-list"><li><span>01</span><strong data-ja="人間の権限">Human authority</strong><p data-ja="重要な判断には指名された責任者を置く。">Named accountability for consequential decisions.</p></li><li><span>02</span><strong data-ja="限定試験">Bounded testing</strong><p data-ja="隔離された環境で障害と回復を検証。">Failure and recovery tested in isolated environments.</p></li><li><span>03</span><strong data-ja="証拠設計">Evidence by design</strong><p data-ja="来歴、変更、操作受領を標準で保持。">Provenance, change, and action receipts retained by default.</p></li><li><span>04</span><strong data-ja="段階的公開">Controlled release</strong><p data-ja="能力は検証済みの運用境界へ段階的に移行。">Capabilities move gradually into validated operating boundaries.</p></li></ol></div></section>
${cta(root, "Move research into a governed deployment.", "研究を統治された導入へ。")}`;
  return documentShell({root, active: "research", page: "research", title: "Research | Arasaka Corporation", titleJa: "研究開発 | 荒坂株式会社", description: "Arasaka research in neural continuity, secure compute, institutional systems, and trustworthy autonomy.", canonical: "research/", image: "assets/cyberware-foundry.jpg", body});
}

function companyPage() {
  const root = "../";
  const body = `
${pageHero({root, eyebrow: "Arasaka Corporation", eyebrowJa: "荒坂株式会社", title: "Long-horizon stewardship. Accountable regional operation.", titleJa: "長期的統括。説明責任ある地域運用。", summary: "Founded in Tokyo in 1915, Arasaka allocates long-horizon capital across specialized product groups, 42 markets, and shared standards for governance and assurance.", summaryJa: "1915年に東京で創業した荒坂は、専門製品グループ、42市場、共通のガバナンス・保証基準に長期資本を配分しています。", image: "assets/hero-headquarters.jpg"})}
      <section class="section section-light company-intro"><div class="shell two-column-intro"><div>${translated("p", "Company", "企業情報", "eyebrow")}${translated("h2", "A private group organized around institutional systems.", "機関システムを中心に組織された非公開企業グループ。")}</div>${translated("p", "Arasaka combines permanent private ownership with specialized operating companies. More than US$3.2 trillion in protected mandates is governed through group standards for identity, authority, evidence, safety, and service quality, while regional teams remain accountable for client outcomes.", "荒坂は恒久的な非公開所有と専門事業会社を組み合わせています。3.2兆米ドル超の保護委任資産を、ID、権限、証拠、安全、サービス品質に関するグループ基準で統治し、地域チームが顧客成果に責任を持ちます。", "lead-copy")}</div></section>
      <section class="section operating-groups" id="operating-groups"><div class="shell"><div class="section-heading split-heading"><div>${translated("p", "Operating groups", "事業グループ", "eyebrow")}${translated("h2", "Specialized companies. Shared control architecture.", "専門会社。共通の管理アーキテクチャ。")}</div><a class="text-link" href="${root}products/"><span data-ja="製品を見る">View products</span><span aria-hidden="true">↗</span></a></div><div class="operating-grid">${products.map((p,i)=>`<a href="${root}products/${p.slug}/"><span>0${i+1}</span><strong data-ja="${escapeHtml(p.categoryJa)}">${p.category}</strong><p data-ja="${escapeHtml(p.summaryJa)}">${p.summary}</p></a>`).join("")}</div></div></section>
      <section class="global-section" id="global"><div class="shell global-layout"><div>${translated("p", "Global operations", "グローバル運用", "eyebrow")}${translated("h2", "One group standard. Regional operating authority.", "一つのグループ基準。地域の運用権限。")}${translated("p", "Regional companies adapt deployment, compliance, and service operations to local institutions while remaining inside shared group controls.", "地域会社は、共通のグループ統制内で、導入、コンプライアンス、サービス運用を各地域の機関に適合させます。")}</div><div class="region-list"><div><strong>APAC</strong><span data-ja="東京地域統括">Tokyo regional command</span></div><div><strong>AMERICAS</strong><span data-ja="西半球運用">Western hemisphere operations</span></div><div><strong>EMEA</strong><span data-ja="欧州・中東・アフリカ運用">Europe, Middle East, and Africa</span></div><div><strong>ORBITAL</strong><span data-ja="域外研究・カストディ">Extraterritorial research and custody</span></div></div></div></section>
      <section class="section section-light governance-section" id="governance"><div class="shell"><div class="section-heading split-heading"><div>${translated("p", "Governance", "ガバナンス", "eyebrow")}${translated("h2", "Stewardship measured in generations.", "世代単位で評価される統括。")}</div>${translated("p", "Board oversight, named operating authority, client-held controls, and evidence retention govern every material system deployment.", "取締役会監督、指名された運用権限、顧客保有の管理、証拠保持がすべての重要なシステム導入を統治します。", "section-intro")}</div><div class="governance-grid"><article><span>01</span><h3 data-ja="取締役会監督">Board oversight</h3><p data-ja="重要な製品、地域、リスク方針に対する長期的監督。">Long-term oversight of material product, regional, and risk policies.</p></article><article><span>02</span><h3 data-ja="指名権限">Named authority</h3><p data-ja="重要な決定には特定可能な人間の責任者。">An identifiable human owner for every consequential decision.</p></article><article><span>03</span><h3 data-ja="顧客管理">Client control</h3><p data-ja="鍵、復旧、承認境界を顧客が保持。">Clients retain defined key, recovery, and approval boundaries.</p></article><article><span>04</span><h3 data-ja="監査可能性">Auditability</h3><p data-ja="来歴、変更、操作受領を審査可能な形で保持。">Reviewable provenance, change history, and action receipts.</p></article></div></div></section>
      <section class="section careers-section"><div class="shell two-column-intro"><div>${translated("p", "Careers", "採用情報", "eyebrow")}${translated("h2", "Build systems expected to outlast their designers.", "設計者より長く残るシステムをつくる。")}</div><div>${translated("p", "Arasaka recruits across systems engineering, security operations, institutional design, applied research, and regional service leadership.", "荒坂は、システム工学、セキュリティ運用、機関設計、応用研究、地域サービス責任者を募集しています。", "lead-copy")}<a class="text-link text-link-light" href="${root}contact/"><span data-ja="採用窓口">Careers contact</span><span aria-hidden="true">↗</span></a></div></div></section>
${cta(root)}`;
  return documentShell({root, active: "company", page: "company", title: "Company | Arasaka Corporation", titleJa: "企業情報 | 荒坂株式会社", description: "Arasaka company overview, operating groups, global operations, governance, and careers.", canonical: "company/", image: "assets/hero-headquarters.jpg", body});
}

function contactPage() {
  const root = "../";
  const body = `
${pageHero({root, eyebrow: "Institutional access", eyebrowJa: "機関向けアクセス", title: "Start with the operating requirement.", titleJa: "運用要件から始める。", summary: "Institutional clients, public-sector partners, and strategic enterprises may request a confidential product and deployment review.", summaryJa: "機関顧客、公共部門パートナー、戦略企業は、機密性の高い製品・導入審査を依頼できます。", image: "assets/security-operations.jpg"})}
      <section class="section section-light contact-section"><div class="shell contact-layout"><div class="contact-copy">${translated("p", "Regional routing", "地域ルーティング", "eyebrow")}${translated("h2", "One inquiry. The right product and regional team.", "一つの問い合わせから、適切な製品と地域チームへ。")}${translated("p", "Tell us the institutional outcome, operating region, and timeline. The inquiry is routed by product fit and regional authority.", "機関として求める成果、運用地域、期間をご記入ください。製品適合性と地域権限に基づいて振り分けます。", "lead-copy")}<dl><div><dt data-ja="初回審査">Initial review</dt><dd data-ja="1営業日以内">Within one business day</dd></div><div><dt data-ja="対象">Scope</dt><dd data-ja="機関・公共部門・戦略企業">Institutional, public sector, strategic enterprise</dd></div><div><dt data-ja="窓口">Channel</dt><dd>inquiries@arasaka.com</dd></div></dl></div><form class="inquiry-form" data-inquiry-form><div class="form-grid"><label><span data-ja="氏名">Name</span><input name="name" autocomplete="name" required placeholder="Aiko Tanaka" data-placeholder-ja="田中 愛子"></label><label><span data-ja="組織">Organization</span><input name="organization" autocomplete="organization" required placeholder="Institution / enterprise" data-placeholder-ja="機関・企業"></label><label><span data-ja="メール">Email</span><input name="email" type="email" autocomplete="email" required placeholder="aiko@example.com"></label><label><span data-ja="地域">Region</span><select name="region" required><option value="" data-ja="地域を選択">Select region</option><option>APAC</option><option>Americas</option><option>EMEA</option><option>Global / Orbital</option></select></label><label class="form-wide"><span data-ja="関心のある製品">Product interest</span><select name="product" required><option value="" data-ja="製品を選択">Select product</option>${products.map((p)=>`<option value="${p.name}" data-ja="${escapeHtml(p.nameJa)}">${p.name}</option>`).join("")}<option value="Integrated portfolio" data-ja="統合ポートフォリオ">Integrated portfolio</option></select></label><label class="form-wide"><span data-ja="運用要件">Operating requirement</span><textarea name="requirement" rows="5" required placeholder="Describe the outcome, operating environment, and timeline." data-placeholder-ja="必要な成果、運用環境、期間をご記入ください。"></textarea></label></div><button class="button button-primary" type="submit"><span data-ja="問い合わせを作成">Prepare inquiry</span><span aria-hidden="true">↗</span></button><p class="form-note" data-ja="送信するとメールアプリで inquiries@arasaka.com 宛ての下書きが開きます。">Submitting opens a prepared email to inquiries@arasaka.com in your mail application.</p><p class="form-status" role="status" aria-live="polite" data-form-status></p></form></div></section>
      <section class="contact-routes"><div class="shell"><article><span>01</span><strong data-ja="製品・導入">Products & deployment</strong><p data-ja="製品評価、統合アーキテクチャ、導入計画。">Product evaluation, integrated architecture, and deployment planning.</p></article><article><span>02</span><strong data-ja="研究連携">Research partnerships</strong><p data-ja="応用研究、検証環境、機関共同開発。">Applied research, validation environments, and institutional collaboration.</p></article><article><span>03</span><strong data-ja="採用・メディア">Careers & media</strong><p data-ja="採用、企業広報、公開情報に関する問い合わせ。">Careers, corporate communications, and public information.</p></article></div></section>`;
  return documentShell({root, active: "contact", page: "contact", title: "Contact | Arasaka Corporation", titleJa: "お問い合わせ | 荒坂株式会社", description: "Contact Arasaka for institutional product evaluation and deployment planning.", canonical: "contact/", image: "assets/security-operations.jpg", body});
}

const pages = new Map([
  ["index.html", homePage()],
  ["products/index.html", productsPage()],
  ...products.map((product) => [`products/${product.slug}/index.html`, productPage(product)]),
  ["industries/index.html", industriesPage()],
  ["research/index.html", researchPage()],
  ["company/index.html", companyPage()],
  ["contact/index.html", contactPage()]
]);

for (const [relativePath, contents] of pages) {
  const outputPath = resolve(projectRoot, relativePath);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, contents);
}

const sitemapPaths = ["", "products/", ...products.map(({slug}) => `products/${slug}/`), "industries/", "research/", "company/", "contact/"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map((path) => `  <url><loc>https://www.arasaka.com/${path}</loc><lastmod>2026-08-29</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(projectRoot, "sitemap.xml"), sitemap);

console.log(`Generated ${pages.size} canonical pages and sitemap.xml`);
