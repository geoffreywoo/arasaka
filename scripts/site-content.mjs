export const origin = "https://www.arasaka.com";
export const languages = ["en", "ja"];
export const pair = (en, ja) => ({ en, ja });

export const assets = {
  relic: { stem: "relic-v3", alt: pair("Relic biochip in a precision laboratory cradle", "精密な実験用ホルダーに収められたRelicバイオチップ"), position: "76% center" },
  headquarters: { stem: "headquarters-v3", alt: pair("Arasaka Tokyo headquarters and corporate plaza", "アラサカ東京本社と企業広場"), position: "center" },
  mikoshi: { stem: "mikoshi-v3", alt: pair("Mikoshi engram archive infrastructure", "ミコシのエングラム・アーカイブ基盤"), position: "center" },
  shingen: { stem: "shingen-v3", alt: pair("TKI-20 Shingen smart submachine gun, reconstructed product view", "TKI-20シンゲンのスマート・サブマシンガンを再構成した製品画像"), position: "center" },
  yukimura: { stem: "yukimura-v3", alt: pair("HJKE-11 Yukimura smart pistol, reconstructed product view", "HJKE-11ユキムラのスマート・ピストルを再構成した製品画像"), position: "center" },
  security: { stem: "security-v3", alt: pair("Private security team at a Tokyo logistics terminal", "東京の物流ターミナルで活動する民間警備チーム"), position: "center" },
  banking: { stem: "banking-v3", alt: pair("Private banking operations overlooking Tokyo", "東京を望むプライベート・バンキングの拠点"), position: "center" },
};

export const sources = {
  relic: { label: "CD PROJEKT RED: What's New in Night City, 2021", url: "https://www.cyberpunk.net/zh-cn/news/39163/ye-cheng-xin-sheng-1-3-ban-ben-kai-fa-zhe-qian-zhan" },
  weapons: { label: "R. Talsorian Games: Night Market Index v1.24, manufacturer index", url: "https://rtalsoriangames.com/wp-content/uploads/2026/01/RTG-CPR-DLC-NightMarketIndexv1.24.pdf" },
  corporations: { label: "CD PROJEKT RED: Corporations", url: "https://www.cyberpunk.net/en/news/22070/cyberpunk-2077-e3-2018-trailer-frame-by-frame-ep11-corporations" },
  game: { label: "Cyberpunk 2077: in-game database, product depictions, The Devil ending", url: "https://www.cyberpunk.net/en/cyberpunk-2077" },
};

export const businesses = [
  {
    id: "security", code: "SEC / DEF", name: pair("Security & Defense", "警備・防衛"), image: "security",
    summary: pair("Protecting people, facilities, and the interests that connect them.", "人、施設、そしてその背後にある利益を守る。"),
    description: pair("Arasaka brings protective services, defense manufacturing, and field operations together. From a single executive detail to an international industrial network, protection is designed around the whole assignment.", "アラサカは、警護サービス、防衛製造、現場運用を一体化します。要人警護から国際的な産業ネットワークまで、任務全体を見据えて防護を設計します。"),
    capabilities: [
      [pair("Protective services", "警護サービス"), pair("Executive protection, facility security, and secure movement across regional jurisdictions.", "地域や法域をまたぐ要人警護、施設警備、安全な移動。")],
      [pair("Defense manufacturing", "防衛製造"), pair("Smart weapon platforms developed as a family of equipment, interfaces, and support systems.", "装備、インターフェース、支援システムを一つの製品群として開発するスマート兵器。")],
      [pair("Regional operations", "地域運用"), pair("Local command brings site intelligence, trained personnel, and logistics into the same operating picture.", "現地の指揮系統が、施設情報、訓練された人員、物流を一つの運用体制に統合します。")],
    ],
    related: ["shingen", "yukimura"],
    statement: pair("The strength of a system is the discipline behind it.", "システムの強さは、その背後にある規律に宿る。"),
    context: pair("Security is the foundation of the group. Our manufacturing and operating companies work together to protect the infrastructure on which commerce and public life depend.", "警備はグループの基盤です。製造会社と運用会社が連携し、商取引と社会生活を支えるインフラを守ります。"),
  },
  {
    id: "banking", code: "BANK / CAP", name: pair("Banking & Capital", "銀行・資本"), image: "banking",
    summary: pair("Capital that moves with the ambitions of an institution.", "組織の志とともに動く資本。"),
    description: pair("Arasaka's financial businesses connect corporate finance, private banking, and strategic asset custody. Capital and protection are coordinated across the group, supporting enterprises with interests beyond a single market.", "アラサカの金融事業は、企業金融、プライベート・バンキング、戦略資産の保管を結びます。グループ全体で資本と防護を連携させ、単一市場を超えて展開する企業を支えます。"),
    capabilities: [
      [pair("Corporate finance", "企業金融"), pair("Financing relationships shaped around industrial expansion, acquisitions, and long-term investment.", "産業の拡張、買収、長期投資に合わせて構築する金融関係。")],
      [pair("Private banking", "プライベート・バンキング"), pair("Discreet financial relationships for family enterprises and international principals.", "同族企業や国際的な事業主に向けた、機密性を重視する金融関係。")],
      [pair("Strategic custody", "戦略資産保管"), pair("Protected facilities and controlled access for records, instruments, and assets of lasting importance.", "長期的に重要な記録、証券、資産のための保護施設とアクセス管理。")],
    ],
    related: ["relic", "mikoshi"],
    statement: pair("A longer horizon changes what capital can do.", "長い視野が、資本の可能性を変える。"),
    context: pair("Financial relationships outlast individual transactions. Arasaka pairs local market presence with the industrial reach of the wider group, keeping capital close to the people and assets it supports.", "金融関係は、個々の取引を超えて続きます。アラサカは現地市場の拠点とグループの産業基盤を結び、資本を、その資本が支える人と資産の近くに置きます。"),
  },
  {
    id: "technology", code: "TECH / R&D", name: pair("Advanced Technology", "先端技術"), image: "mikoshi",
    summary: pair("Extending what can be preserved. Expanding what comes next.", "残せるものを広げ、その先の可能性を拓く。"),
    description: pair("From the Relic biochip to Mikoshi's archive infrastructure, Arasaka develops the technologies that connect human experience with digital systems. Research, precision manufacturing, and secure facilities form a single development chain.", "Relicバイオチップからミコシのアーカイブ基盤まで、アラサカは人間の経験とデジタルシステムを結ぶ技術を開発します。研究、精密製造、安全な施設が、一つの開発体系を形成します。"),
    capabilities: [
      [pair("Neural interfaces", "ニューラル・インターフェース"), pair("Biochip systems connect stored personality constructs with compatible neural environments.", "バイオチップ・システムが、保存された人格構築体と対応する神経環境を接続します。")],
      [pair("Engram infrastructure", "エングラム基盤"), pair("Dedicated archives provide the controlled infrastructure behind digital personality preservation.", "専用アーカイブが、デジタル人格の保存を支える管理基盤を提供します。")],
      [pair("Applied research", "応用研究"), pair("Multidisciplinary work across neural representation, secure computation, and human-machine integration.", "神経表現、安全な計算基盤、人間と機械の統合を横断する学際的研究。")],
    ],
    related: ["relic", "mikoshi"],
    statement: pair("Continuity is no longer only an ambition.", "継承は、もはや願いだけではない。"),
    context: pair("The restoration of leadership has given continuity a new significance across the group. Arasaka's next chapter connects the stewardship of an institution with the knowledge and experience of its people.", "指導体制への復帰により、継承はグループ全体で新たな意味を持つようになりました。アラサカの次の章は、組織の運営と、人々の知識や経験を結びます。"),
  },
];

export const products = [
  {
    id: "relic", code: "RELIC", name: pair("Relic", "Relic"), category: pair("Neural biochip", "ニューラル・バイオチップ"), image: "relic", business: "technology",
    headline: pair("What defines you, carried forward.", "あなたを形づくるものを、その先へ。"),
    summary: pair("Arasaka's biochip platform for stored personality constructs and neural interaction.", "人格構築体の保存と神経接続のための、アラサカのバイオチップ・プラットフォーム。"),
    overview: pair("Relic places a digital personality construct on a biochip designed for neural interfacing. It is the most visible expression of Arasaka's work in engram technology: a physical connection to knowledge, memory, and identity.", "Relicは、神経接続を目的とするバイオチップにデジタル人格構築体を格納します。知識、記憶、アイデンティティへの物理的な接点として、アラサカのエングラム技術を象徴します。"),
    features: [
      [pair("Personality constructs", "人格構築体"), pair("A digitized representation of personality, memories, and patterns of thought.", "人格、記憶、思考パターンのデジタル表現。")],
      [pair("Biochip interface", "バイオチップ接続"), pair("A compact cartridge designed around the connection between a stored construct and a neural system.", "保存された構築体と神経系の接続を中心に設計された、小型カートリッジ。")],
      [pair("Archive relationship", "アーカイブとの連携"), pair("Relic is a carrier and interface. Mikoshi is the archive infrastructure behind the wider engram environment.", "Relicは媒体とインターフェースです。ミコシは、より広いエングラム環境を支えるアーカイブ基盤です。")],
    ],
    specs: [[pair("Platform", "プラットフォーム"), pair("Neural biochip", "ニューラル・バイオチップ")], [pair("Stored representation", "保存形式"), pair("Personality engram", "人格エングラム")], [pair("Interface", "接続方式"), pair("Neural connection", "神経接続")], [pair("Archive ecosystem", "アーカイブ環境"), pair("Mikoshi", "ミコシ")]],
    note: pair("Relic's commercial personality-interaction program and experimental host-transfer work are distinct applications. Host transfer is not presented here as an ordinary consumer service.", "Relicの商用人格対話プログラムと、実験的な宿主移行研究は、異なる用途です。宿主移行を一般消費者向けの通常サービスとして扱うものではありません。"),
    contextTitle: pair("A new meaning for continuity.", "継承に、新たな意味を。"),
    context: pair("With leadership restored, Arasaka's continuity research has become central to the group's long-term direction. Relic sits at the intersection of personal legacy and institutional succession.", "指導体制への復帰を受け、アラサカの継承研究はグループの長期方針の中心となりました。Relicは、個人の遺産と組織の継承が交わる場所に位置します。"),
    related: ["mikoshi", "yukimura"], sources: ["relic", "game"],
  },
  {
    id: "mikoshi", code: "MIKOSHI", name: pair("Mikoshi", "ミコシ"), category: pair("Engram infrastructure", "エングラム基盤"), image: "mikoshi", business: "technology",
    headline: pair("An archive beyond the individual.", "個人を超えて続く、アーカイブ。"),
    summary: pair("Protected infrastructure for the storage and management of digital personality constructs.", "デジタル人格構築体の保存と管理を担う、保護された基盤。"),
    overview: pair("Mikoshi is Arasaka's engram archive environment, not a consumer device. It provides the protected digital infrastructure in which personality constructs can be retained and managed, separate from the biochip that carries a construct.", "ミコシは、一般消費者向け機器ではなく、アラサカのエングラム・アーカイブ環境です。構築体を携帯するバイオチップとは別に、人格構築体を保持・管理するための保護されたデジタル基盤を提供します。"),
    features: [[pair("Dedicated archive", "専用アーカイブ"), pair("A distinct environment for digital personality constructs rather than general-purpose storage.", "汎用ストレージとは異なる、デジタル人格構築体のための専用環境。")], [pair("Protected access", "保護されたアクセス"), pair("Archive operations are separated from public networks and ordinary consumer interfaces.", "アーカイブ運用を公開ネットワークや一般消費者向けインターフェースから分離します。")], [pair("Platform relationship", "プラットフォームとの関係"), pair("Mikoshi retains the archive; Relic carries a construct into a neural interface.", "ミコシがアーカイブを保持し、Relicが構築体を神経接続へ運びます。")]],
    specs: [[pair("System class", "システム種別"), pair("Engram archive", "エングラム・アーカイブ")], [pair("Stored representation", "保存形式"), pair("Digital personality construct", "デジタル人格構築体")], [pair("Operator", "運営主体"), pair("Arasaka", "アラサカ")], [pair("Related platform", "関連基盤"), pair("Relic", "Relic")]],
    note: pair("Archive infrastructure and access policies are not interchangeable with Relic biochip functionality. Public material describes their relationship, not internal security procedures.", "アーカイブ基盤とアクセス方針は、Relicバイオチップの機能とは異なります。公開資料では両者の関係を説明し、内部の警備手順は扱いません。"),
    contextTitle: pair("The infrastructure behind a legacy.", "遺産を支える、基盤。"),
    context: pair("The next phase of Arasaka's archive program places continuity at the scale of the institution. Purpose-built facilities and specialized research teams support a platform intended to endure beyond any single generation.", "アラサカのアーカイブ計画の次段階は、組織規模の継承を見据えます。専用施設と専門研究チームが、一つの世代を超えて続く基盤を支えます。"),
    related: ["relic", "shingen"], sources: ["game"],
  },
  {
    id: "shingen", code: "TKI-20", name: pair("Shingen", "シンゲン"), category: pair("Smart submachine gun", "スマート・サブマシンガン"), image: "shingen", business: "security",
    headline: pair("Precision, integrated.", "精度を、一体に。"),
    summary: pair("The TKI-20 Shingen brings smart targeting to a compact submachine-gun platform.", "TKI-20シンゲンは、小型サブマシンガンにスマート照準を統合します。"),
    overview: pair("Shingen is part of Arasaka's smart weapon family. Its compact platform connects weapon design with the smart-link ecosystem, reflecting a manufacturing philosophy in which hardware and interface are developed together.", "シンゲンは、アラサカのスマート兵器群の一つです。小型プラットフォームとスマートリンク環境を結び、ハードウェアとインターフェースを一体開発する製造思想を体現します。"),
    features: [[pair("Smart platform", "スマート・プラットフォーム"), pair("Designed around integrated smart targeting and a compatible smart-link interface.", "統合型スマート照準と、対応するスマートリンク接続を中心に設計。")], [pair("Compact format", "小型構成"), pair("A submachine-gun form factor within Arasaka's broader defense manufacturing portfolio.", "アラサカの防衛製造群を構成する、サブマシンガン形式。")], [pair("Family design", "共通設計"), pair("A shared industrial language across receiver geometry, controls, and targeting interfaces.", "本体形状、操作系、照準接続に共通する工業設計。")]],
    specs: [[pair("Designation", "型式"), pair("TKI-20 Shingen", "TKI-20 シンゲン")], [pair("Manufacturer", "製造元"), pair("Arasaka", "アラサカ")], [pair("Weapon class", "兵器種別"), pair("Submachine gun", "サブマシンガン")], [pair("Technology", "技術"), pair("Smart", "スマート")]],
    note: pair("Smart-link compatibility is part of the platform's targeting environment. Shingen and Yukimura share a technology class while retaining distinct product formats.", "スマートリンクへの対応は、この製品の照準環境を構成します。シンゲンとユキムラは同じ技術分類に属しながら、それぞれ異なる製品形式を持ちます。"),
    contextTitle: pair("Built within a larger system.", "より大きな体系の中でつくられる。"),
    context: pair("Arasaka's defense business brings product engineering and protective operations into the same group. Equipment is presented alongside the institutions, facilities, and professional teams it serves.", "アラサカの防衛事業は、製品開発と防護運用を同じグループに結びます。装備は、それを用いる組織、施設、専門チームとともに位置づけられます。"),
    related: ["yukimura", "relic"], sources: ["weapons", "game"],
  },
  {
    id: "yukimura", code: "HJKE-11", name: pair("Yukimura", "ユキムラ"), category: pair("Smart pistol", "スマート・ピストル"), image: "yukimura", business: "security",
    headline: pair("A compact expression of capability.", "能力を、コンパクトに。"),
    summary: pair("The HJKE-11 Yukimura is Arasaka's compact smart-pistol platform.", "HJKE-11ユキムラは、アラサカの小型スマート・ピストルです。"),
    overview: pair("Yukimura extends Arasaka's smart weapon technology into a compact pistol. Its industrial form and smart-link relationship make it a recognizable counterpart to the Shingen within the group's defense portfolio.", "ユキムラは、アラサカのスマート兵器技術を小型ピストルへ展開します。その工業的形状とスマートリンク接続は、防衛製品群におけるシンゲンの対応機種を形づくります。"),
    features: [[pair("Smart targeting", "スマート照準"), pair("Part of the smart weapon class, paired with the compatible targeting-interface ecosystem.", "対応する照準接続環境と連携する、スマート兵器の一つ。")], [pair("Pistol platform", "ピストル・プラットフォーム"), pair("A compact format distinguished from the Shingen submachine-gun platform.", "シンゲンのサブマシンガン構成とは異なる、小型形式。")], [pair("Arasaka manufacture", "アラサカ製造"), pair("Product engineering, interface design, and precision manufacturing within the group's defense business.", "グループの防衛事業における、製品開発、接続設計、精密製造。")]],
    specs: [[pair("Designation", "型式"), pair("HJKE-11 Yukimura", "HJKE-11 ユキムラ")], [pair("Manufacturer", "製造元"), pair("Arasaka", "アラサカ")], [pair("Weapon class", "兵器種別"), pair("Pistol", "ピストル")], [pair("Technology", "技術"), pair("Smart", "スマート")]],
    note: pair("Yukimura's pistol format complements Shingen's submachine-gun platform within the same smart weapon family.", "ユキムラのピストル形式は、同じスマート兵器群に属するシンゲンのサブマシンガンを補完します。"),
    contextTitle: pair("One family. Distinct platforms.", "一つの製品群。それぞれの役割。"),
    context: pair("Different product formats share the same industrial discipline. Arasaka's portfolio gives each platform a clear identity while keeping its relationship to the wider security business visible.", "異なる製品形式にも、共通の製造規律が息づきます。各製品の個性を明確にしながら、より広い警備事業とのつながりを保ちます。"),
    related: ["shingen", "mikoshi"], sources: ["weapons", "game"],
  },
];

const page = (id, route, section, title, titleJa, description, descriptionJa, image, parent = null) => ({ id, route, section, title: pair(title, titleJa), description: pair(description, descriptionJa), image, parent });
export const pages = [
  page("home", "/", "home", "Arasaka Corporation | Security, Capital & Continuity", "アラサカ株式会社 | 警備・資本・継承", "An independent vision of Arasaka after 2077: global security, banking, Relic biochips, and Mikoshi technology, in English and Japanese.", "2077年以降のアラサカを描く独立した構想。世界規模の警備、銀行、Relicバイオチップ、ミコシの技術を、日本語と英語で。", "relic"),
  page("businesses", "/businesses/", "businesses", "Our Businesses | Arasaka Corporation", "事業紹介 | アラサカ株式会社", "Explore Arasaka's security and defense, banking and capital, and advanced technology businesses.", "アラサカの警備・防衛、銀行・資本、先端技術の各事業を紹介します。", "headquarters"),
  ...businesses.map(b => page(b.id, `/businesses/${b.id}/`, "businesses", `${b.name.en} | Arasaka Corporation`, `${b.name.ja} | アラサカ株式会社`, b.summary.en, b.summary.ja, b.image, "businesses")),
  page("products", "/products/", "products", "Relic, Mikoshi & Smart Weapons | Arasaka Products", "Relic・ミコシ・スマート兵器 | アラサカ製品", "Explore Relic biochips, Mikoshi engram infrastructure, TKI-20 Shingen, and HJKE-11 Yukimura.", "Relicバイオチップ、ミコシのエングラム基盤、TKI-20シンゲン、HJKE-11ユキムラを紹介します。", "shingen"),
  ...products.map(p => page(p.id, `/products/${p.id}/`, "products", `${p.code === "RELIC" || p.code === "MIKOSHI" ? "" : `${p.code} `}${p.name.en} | Arasaka ${p.category.en}`, `${p.name.ja} | アラサカ ${p.category.ja}`, p.summary.en, p.summary.ja, p.image, "products")),
  page("research", "/research/", "research", "Neural Interfaces & Engram Research | Arasaka", "神経接続とエングラム研究 | アラサカ", "Arasaka research across personality engrams, neural interfaces, archive infrastructure, and integrated smart systems.", "人格エングラム、神経接続、アーカイブ基盤、スマートシステム統合を横断するアラサカの研究。", "mikoshi"),
  page("engram-technology", "/research/engram-technology/", "research", "Relic, Mikoshi & Soulkiller: Engram Architecture | Arasaka", "Relic・ミコシ・ソウルキラー：エングラム技術 | アラサカ", "Understand the distinct roles of Soulkiller, Mikoshi, and Relic in Arasaka's engram technology architecture.", "アラサカのエングラム技術における、ソウルキラー、ミコシ、Relicの異なる役割を解説します。", "relic", "research"),
  page("company", "/company/", "company", "Company & Restored Leadership | Arasaka Corporation", "企業情報と指導体制 | アラサカ株式会社", "Arasaka's global organization and renewed direction under restored leadership in a speculative post-2077 future.", "2077年以降の独自の未来像における、指導体制に復帰したアラサカの世界組織と新たな方針。", "headquarters"),
  page("contact", "/contact/", "contact", "Global Operations & Regional Directory | Arasaka", "グローバル拠点・地域一覧 | アラサカ", "Arasaka's Tokyo headquarters, Night City regional presence, and the relationship between its global business divisions.", "アラサカの東京本社、ナイトシティの地域拠点、世界の事業部門間の関係を紹介します。", "banking"),
];

export const label = id => ({
  home: pair("Home", "ホーム"), businesses: pair("Businesses", "事業紹介"), products: pair("Products", "製品"), research: pair("Research", "研究"), company: pair("Company", "企業情報"), contact: pair("Global Operations", "グローバル拠点"), "engram-technology": pair("Engram technology", "エングラム技術"),
}[id] || businesses.find(b => b.id === id)?.name || products.find(p => p.id === id)?.name);

export const retiredRoutes = {
  "/industries/": "/businesses/", "/products/securenet/": "/businesses/security/", "/products/perimeter/": "/businesses/security/", "/products/custody/": "/businesses/banking/", "/products/soulkiller/": "/research/engram-technology/",
};
