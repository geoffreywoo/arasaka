const pair = (en, ja) => ({ en, ja });

export const networkAssets = Object.fromEntries([
  ["imperial-headquarters", "Tokyo headquarters towers above suspended pedestrian decks", "歩行者用連絡橋の上にそびえる東京本社の塔"],
  ["tokyo-atrium", "Headquarters atrium and service counter beneath concrete bridges", "コンクリートの連絡橋の下にある本社アトリウムと窓口"],
  ["night-city-annex", "Regional annex with loading hall and maintenance staff at a separate pedestrian gate", "荷受けホールと、別の職員入口で待機する保守要員を含む地域別館"],
  ["succession-office", "Financial relationship staff receive a succession packet across a controlled counter", "管理窓口で継承資料を受け取る金融関係室の担当者"],
  ["mikoshi-overview", "Reconstructed Mikoshi containment hall and controlled archive threshold", "再構成したミコシの保管ホールと管理されたアーカイブ境界"],
  ["mikoshi-detail", "Reconstructed sealed archive column behind an inspection boundary", "検査境界の奥にある、再構成した密閉アーカイブ設備"],
  ["relic-detail", "Macro reconstruction of the Relic cartridge housing and gold contacts", "Relicの外装と金色端子を再構成した接写"],
  ["relic-context", "Relic cartridge and fitted case on a controlled custody counter", "管理保管窓口に置かれたRelicカートリッジと専用ケース"],
  ["shingen-detail", "External surface detail of the reconstructed TKI-20 Shingen", "再構成したTKI-20シンゲンの外装の細部"],
  ["shingen-context", "Reconstructed Shingen secured on a regional equipment counter", "地域装備窓口で保管される、再構成したシンゲン"],
  ["yukimura-detail", "External industrial detail of the reconstructed HJKE-11 Yukimura", "再構成したHJKE-11ユキムラの工業的な外装の細部"],
  ["yukimura-context", "Reconstructed Yukimura in a retained equipment tray", "保管用トレーに収められた、再構成したユキムラ"],
].map(([id,en,ja]) => [id,{ stem: `${id}-v5`, alt: pair(en,ja), position: "center" }]));

export const networkRecords = [
  {
    id: "asset-succession", caseId: "NC-1102", code: "AS / 1102 / 01", revision: "02", day: 0, image: "succession-office", publicPage: "banking",
    name: pair("Asset Succession Instruction", "資産継承指示書"), department: pair("Financial Relationships / Tokyo", "金融関係室 / 東京"),
    summary: pair("The asset changes hands. The instructions remain in force.", "資産は移管される。指示は引き続き有効。"),
    annotation: pair("The schedule lists buildings, equipment, and retained records. The people who maintain them appear in a separate annex.", "一覧には建物、装備、保管記録がある。それらを維持する人々は別紙に記載されている。"),
    sections: [
      [pair("Instruction received", "受理した指示"), pair("Financial Relationships has accepted the succession packet for the Night City regional annex. The packet covers the facility interest, its installed equipment, and the records necessary to continue distribution. It does not transfer personal authority from one employee to another. Existing contractor appointments are listed separately from the asset schedule. The receiving office has acknowledged the distinction. This instruction records a change in institutional responsibility; it is not a statement that every relationship associated with the premises has been renewed.", "金融関係室は、ナイトシティ地域別館の継承資料を受理した。対象は施設に関する権益、設置装備、流通継続に必要な記録である。職員間の個人的な権限移譲は含まれない。既存の業務委託契約は資産一覧とは別に記載される。引受部門はこの違いを確認した。本書は組織上の責任変更を記録するものであり、施設に関わるすべての関係が更新されたことを示さない。")],
      [pair("Continuing obligations", "継続する義務"), pair("The incoming administrator must preserve maintenance access where a current authorization can be established. A name on the payroll register is not sufficient evidence for a gate instruction, and an expired credential must not be renewed solely because equipment requires attention. Where the records disagree, Regional Counsel must identify the responsible authorizing office. Neither the bank relationship team nor the gate supervisor should resolve that disagreement by inventing a permission. Cargo appointments remain governed by the existing movement register until a replacement instruction is acknowledged.", "引受管理者は、有効な承認を確認できる場合に保守アクセスを維持すること。給与台帳の氏名だけでは入構指示の根拠にならず、装備の整備が必要という理由だけで期限切れ資格を更新してはならない。記録が一致しない場合、地域法務が承認責任部門を特定する。銀行の顧客担当もゲート責任者も、独自の許可を作って不一致を解消してはならない。代替指示が確認されるまで、貨物の予約には既存の移動台帳を適用する。")],
      [pair("Excluded correspondence", "別扱いの通信"), pair("The contractor representative submitted an early-shift roster with the packet. A handwritten note identifies the person who holds the service cabinet key and asks that the morning team be told which entrance to use. The roster has been retained as supporting correspondence, not incorporated into the asset schedule. Financial Relationships has referred the entrance question to regional operations. The representative's acknowledgment of the handover must not be presented as acceptance of a revised employment or service arrangement. No such arrangement is contained in this instruction.", "委託先代表は早朝勤務表を資料に添付した。手書きの注記には設備棚の鍵を持つ担当者を示し、朝のチームへ使用する入口を知らせるよう求めている。勤務表は補足通信として保持し、資産一覧には組み込まなかった。金融関係室は入口の問題を地域運用部門へ照会した。代表による引き継ぎ確認を、雇用条件や業務契約の変更への承諾として説明してはならない。本指示にそのような変更は含まれない。")],
      [pair("Completion condition", "完了の条件"), pair("The financial transfer may be marked complete when the receiving administrator acknowledges the schedule and accepts the retained records. Operational exceptions must travel with that acknowledgment. In particular, a completed asset transfer is not evidence that access has been restored to every person previously admitted. The public operations summary may describe the facility transition, but should not promise the restoration of individual access. The first regional shift after handover is to be recorded separately. Financial Relationships will retain its correspondence even if the regional review is later closed. The old roster includes a handwritten correction beside the early shift. That correction remains part of the received packet.", "引受管理者が一覧を確認し、保管記録を受け入れた時点で金融上の移管を完了とできる。運用上の例外は、その確認とともに引き継ぐこと。特に、資産移管の完了は、従来入構していた全員のアクセスが復旧した証拠ではない。公表する運用概要では施設の移行を説明できるが、個人のアクセス復旧を約束してはならない。引き継ぎ後の最初の地域勤務は別途記録する。地域審査が後に終結しても、金融関係室は通信を保持する。古い勤務表の早朝勤務欄には、手書きの訂正がある。その訂正も受領資料の一部として残す。")],
    ],
  },
  {
    id: "territorial-access", caseId: "NC-1102", code: "TA / 1102 / 02", revision: "01", day: 1, image: "night-city-annex", publicPage: "night-city-operations",
    name: pair("Territorial Access Report", "施設アクセス報告書"), department: pair("Regional Security / Night City", "地域警備 / ナイトシティ"),
    summary: pair("Distribution resumed. The pedestrian exception remains open.", "流通再開。職員入口の例外は未解決。"),
    annotation: pair("The service cabinet key was returned to the counter. Nobody had asked for it back.", "設備棚の鍵が窓口へ返却された。返却を求めた者はいなかった。"),
    sections: [
      [pair("First shift after handover", "引き継ぎ後の初回勤務"), pair("The regional annex opened its cargo entrance under the retained movement instruction. Scheduled deliveries were admitted after the responsible office confirmed each appointment. At the pedestrian entrance, the maintenance team presented credentials issued before the succession packet took effect. Their names matched the roster supplied by the contractor representative. The gate register did not contain a current instruction admitting that roster under the incoming administrator. Security retained the entry request and asked for an authorizing contact. The team remained outside the pedestrian boundary.", "地域別館は、保持された移動指示に基づき貨物入口を開いた。担当部門が各予約を確認した後、予定された搬入を受け入れた。職員入口では保守チームが継承資料の発効前に発行された資格証を提示した。氏名は委託先代表が提出した勤務表と一致した。しかしゲート台帳には、引受管理者の下でその勤務表に入構を認める有効な指示がなかった。警備は入構要望を保持し、承認担当者を照会した。チームは職員境界の外で待機した。")],
      [pair("Boundary of the decision", "判断の境界"), pair("This was an authorization exception, not a finding that the credentials were forged or that the team presented a threat. The gate supervisor did not receive an instruction to detain, remove, or question the workers beyond the entry check. The loading hall continued operating on its separate instruction. Reports should preserve that separation. Describing the entire facility as inaccessible would be inaccurate; describing every normal activity as restored would also be inaccurate. Two entrances were operating under different records, and only one had an identified authorizing office.", "これは承認上の例外であり、資格証の偽造やチームの危険性を認定したものではない。ゲート責任者は、入構確認を超えて作業員を拘束、排除、尋問する指示を受けていない。荷受けホールは別の指示に基づき稼働を続けた。報告ではこの違いを保持すること。施設全体が利用不能だったとの説明も、すべての通常業務が復旧したとの説明も正確ではない。二つの入口は異なる記録に基づき運用され、承認責任部門が特定されていたのは一方だけだった。")],
      [pair("Contact attempts", "連絡の経緯"), pair("Regional operations contacted the receiving administrator. Financial Relationships confirmed that the asset schedule had been accepted but could not issue a gate permission. The former site coordinator could identify the maintenance staff but no longer held the instruction authority for the premises. Regional Counsel asked for the unresolved appointments to be attached to the handover file. The contractor representative asked whether the team should wait for the next shift. No department supplied a confirmed reporting time. The gate record contains the question and the absence of an instruction, not a promise that an answer was imminent.", "地域運用部門は引受管理者へ連絡した。金融関係室は資産一覧の受理を確認したが、入構許可は発行できなかった。前施設調整担当は保守要員を確認できたものの、施設の指示権限を既に持っていなかった。地域法務は未解決の任用を引き継ぎ記録へ添付するよう求めた。委託先代表は、次の勤務まで待つべきかと尋ねた。確定した出勤時刻を示した部門はなかった。ゲート記録は質問と指示の不在を残すもので、回答が間近にあると約束するものではない。")],
      [pair("End of shift record", "勤務終了時の記録"), pair("The maintenance team departed without entering. The representative left the service cabinet key at the counter, wrapped in a copy of the old roster. Security recorded receipt of the key without interpreting the act as a resignation or a surrender of contractual rights. At the end of the shift, distribution remained active and the pedestrian exception remained open. Both facts were forwarded to the incoming administrator. The facility summary should retain the exception reference if it uses the word resumed. This report does not establish how the team was compensated for the missed shift.", "保守チームは入構せずに退出した。代表は古い勤務表の写しで包んだ設備棚の鍵を窓口に残した。警備は受領を記録し、その行為を退職や契約上の権利放棄とは解釈しなかった。勤務終了時点で流通は稼働し、職員入口の例外は未解決のままだった。両方の事実を引受管理者へ送付した。施設概要に「再開」と記す場合は例外参照番号も保持すること。本報告は、失われた勤務への報酬がどのように処理されたかを確定するものではない。")],
    ],
  },
  {
    id: "institutional-review", caseId: "NC-1102", code: "IR / 1102 / 03", revision: "03", day: 7, image: "tokyo-atrium", publicPage: "organization",
    name: pair("Institutional Review", "組織審査記録"), department: pair("Group Secretariat / Tokyo", "グループ事務局 / 東京"),
    summary: pair("The transition is complete. Not every consequence is closed.", "移行は完了。すべての結果が終結したわけではない。"),
    annotation: pair("The public statement occupies one line. The exception requires all three records.", "公表文は一行である。例外の説明には三つの記録すべてを要する。"),
    sections: [
      [pair("Basis of review", "審査の根拠"), pair("The Secretariat reviewed the regional annex handover under case NC-1102 after the receiving administrator proposed the public description regional transition complete. The asset schedule has been acknowledged and distribution has resumed. Those facts support a statement about institutional control of the facility. They do not establish that every contractor appointment has been renewed. The review therefore distinguishes the completed transfer from the continuing pedestrian-access exception. Neither the financial instruction nor the security report is to be removed from the file because a shorter public description is now available.", "引受管理者が「地域移行完了」との公表を提案したため、事務局は案件NC-1102における地域別館の引き継ぎを審査した。資産一覧は確認され、流通は再開している。これらは組織による施設管理に関する説明の根拠となる。しかしすべての業務委託契約が更新されたことを示さない。審査では完了した移管と継続中の職員アクセス例外を区別する。短い公表文を使用できるようになっても、金融指示書や警備報告書を記録から取り除いてはならない。")],
      [pair("Assignment of responsibility", "責任の割り当て"), pair("The receiving administrator holds responsibility for identifying the office that may authorize maintenance access. Security can implement an instruction but cannot create the underlying appointment. Financial Relationships can preserve the agreement but cannot stand in for the site administrator. Regional Counsel retains the disputed scope. Each department has a defined task; the presence of several responsible departments is not evidence that the contractor has received a usable answer. The administrator must retain one point of correspondence rather than require the representative to reconstruct the group structure from separate replies.", "引受管理者は、保守アクセスを承認できる部門を特定する責任を持つ。警備は指示を実行できるが、元となる任用は作れない。金融関係室は契約を保持できるが、施設管理者の代わりにはならない。地域法務は争点となる範囲を保持する。各部門には明確な担当があるが、複数の責任部門が存在することは、委託先が実用的な回答を得た証拠ではない。代表者が別々の返答からグループ構造を組み立て直すことにならないよう、管理者は通信窓口を一つに保つこと。")],
      [pair("Public account", "公表する説明"), pair("The regional operations page may state that the facility transition is complete and that distribution operates under the receiving administrator. It must not imply that the maintenance team's credentials have been restored. An internal exception reference will accompany the approved wording in the records register. The public statement is an account of the institution's position, not a complete account of every affected person's experience. A reader of the public line and the internal record should encounter different levels of detail, not mutually incompatible claims about the same gate instruction.", "地域運用ページには、施設移行が完了し、引受管理者の下で流通が稼働していると記載できる。保守チームの資格が復旧したと示唆してはならない。記録台帳では、承認した文言に内部の例外参照を付す。公表文は組織の立場を説明するものであり、影響を受けた全員の経験を完全に説明するものではない。公表の一文と内部記録の読者が出会うのは、同じ入構指示に関する相容れない主張ではなく、異なる詳しさであるべきだ。")],
      [pair("Disposition", "処理"), pair("The transfer review is closed. The contractor-access exception remains assigned to the receiving administrator, and its correspondence remains retained. The service cabinet key is recorded as held at the regional counter; this review does not instruct its disposal. No confirmed return-to-work instruction appears in the reviewed packet. The institution has established who controls the premises and who must answer the outstanding request. It has not established when the workers may return. That distinction is to remain visible in every subsequent summary, including any account of the case used in staff training.", "移管審査は終結する。委託先アクセスの例外は引受管理者の担当に残し、通信を保持する。設備棚の鍵は地域窓口に保管中と記録され、本審査は廃棄を指示しない。確認した資料に、確定した職場復帰指示は存在しない。組織は施設を管理する者と未回答の要望に答えるべき者を確定した。しかし作業員がいつ戻れるかは確定していない。職員研修で使用する説明を含め、以後のすべての要約にこの違いを残すこと。")],
    ],
  },
];

export const networkProfiles = [
  {
    id: "organization", route: "/company/organization/", section: "company", parent: "company", image: "tokyo-atrium",
    name: pair("Organization & authority", "組織と権限"), code: "GROUP / ORGANIZATION",
    summary: pair("Three businesses. Distinct responsibilities. One institution accountable for the instruction.", "三つの事業。異なる責任。一つの組織が、指示を引き受ける。"),
    intro: pair("A cartridge crosses a counter. A facility changes administrator. A family requests another conversation. Each action passes through people with different authority. Arasaka brings manufacturing, protection, financial relationships, and research into one group without treating their decisions as interchangeable.", "カートリッジが窓口を渡る。施設の管理者が変わる。家族が次の対話を求める。それぞれの行為は、異なる権限を持つ人々を通る。アラサカは製造、防護、金融関係、研究を一つのグループに収めますが、それぞれの判断を同じものとして扱いません。"),
    sections: [
      [pair("Group Secretariat", "グループ事務局"), pair("Tokyo sets group direction under restored leadership. The Secretariat retains executive mandates and the distinctions between a group decision and the permissions held by an individual business. Its records appear in both continuity and regional succession reviews.", "復帰した指導体制の下、東京がグループ方針を定めます。事務局は経営上の委任を保持し、グループの判断と個別事業の権限を区別します。その記録は継承と地域移管の両方の審査に現れます。")],
      [pair("Regional Counsel", "地域法務"), pair("Counsel examines the scope of an instruction. It does not make a technical observation into a legal permission, or a family relationship into an archive entitlement. When a question crosses businesses, counsel retains the wording that each department received.", "法務は指示の範囲を検討します。技術的な観測を法的な許可へ、家族関係をアーカイブへの権利へ置き換えることはしません。問いが事業をまたぐ場合、各部門が受け取った文言を保持します。")],
      [pair("Financial Relationships", "金融関係室"), pair("Relationship teams establish who may give an instruction concerning an account or an asset. They retain agreements, succession packets, and verified correspondent identities. Financial custody does not by itself confer control of a facility gate or a personality construct.", "顧客担当は、契約や資産について指示できる者を確認します。契約、継承資料、確認済みの連絡者情報を保持します。金融上の保管だけで、施設のゲートや人格構築体を管理する権限を得るわけではありません。")],
      [pair("Regional Security & Archive Operations", "地域警備とアーカイブ運用"), pair("Security records movement and implements authorized access. Archive Operations retains construct references and their associated instructions. Both depend on an identified authorizing office; neither should have to guess what another division intended.", "警備は移動を記録し、承認されたアクセスを実施します。アーカイブ運用は構築体参照と関連する指示を保持します。いずれにも承認責任部門の特定が必要であり、他部門の意図を推測して運用するものではありません。")],
    ], related: ["company", "banking", "security", "technology", "succession-directive", "institutional-review"],
  },
  {
    id: "tokyo-operations", route: "/operations/tokyo/", section: "contact", parent: "contact", image: "tokyo-atrium",
    name: pair("Tokyo", "東京"), code: "TOKYO / HEADQUARTERS",
    summary: pair("Corporate direction, industrial culture, and the records that travel with every decision.", "企業方針、産業文化、そして判断とともに渡る記録。"),
    intro: pair("Above the headquarters concourse, bridges connect offices that hold different parts of the same assignment. A financial packet enters through one desk; the authority to act on it may sit several floors away. Tokyo is the center from which the group defines those relationships and carries its corporate vision forward.", "本社コンコースの上では、同じ任務の異なる部分を担う部門が連絡橋で結ばれています。金融資料を受け取る窓口と、それに基づいて行動を承認する部門は、別の階にあるかもしれません。東京は、その関係を定め、企業理念を受け継ぐ中心です。"),
    sections: [
      [pair("The headquarters concourse", "本社コンコース"), pair("Concrete, graphite glass, and controlled thresholds give the group a consistent physical language. Staff routes, visitor counters, and records corridors occupy the same complex while retaining separate responsibilities. The concourse is a place of arrival, not an assertion of access to every office beyond it.", "コンクリート、黒鉛色のガラス、管理された境界が、グループの共通する建築言語を形づくります。職員動線、来訪者窓口、記録保管廊下は同じ複合施設の中にありながら、異なる役割を担います。コンコースへの到着は、その先の全部門へのアクセスを意味しません。")],
      [pair("Industrial discipline", "産業の規律"), pair("Neural interfaces and smart equipment begin as different engineering assignments. Precision manufacturing, inspection, and controlled transfer connect the physical object to the institution that maintains it. The product record follows each platform from inspection to the office responsible for its custody.", "神経接続機器とスマート装備は、異なる開発課題から始まります。精密製造、検査、管理された移管が、物体とその維持を担う組織を結びます。製品記録は、検査から保管責任を担う部門まで、各基盤に付随します。")],
      [pair("Leadership and succession", "指導体制と継承"), pair("Saburo Arasaka's restored leadership gives continuity an institutional significance beyond a product encounter. Executive mandates, regional asset succession, and private-client instructions remain different matters. Tokyo is where those distinctions become a group responsibility.", "サブロウ・アラサカの指導体制への復帰は、製品との出会いを超えた組織上の意味を継承に与えます。経営上の委任、地域資産の移管、個人顧客の指示は、異なる事柄であり続けます。東京では、その違いをグループの責任として引き受けます。")],
    ], related: ["organization", "company", "technology", "asset-succession", "succession-directive"],
  },
  {
    id: "night-city-operations", route: "/operations/night-city/", section: "contact", parent: "contact", image: "night-city-annex",
    name: pair("Night City", "ナイトシティ"), code: "NIGHT CITY / REGIONAL ANNEX",
    summary: pair("Protective operations. Japanese-made equipment. A regional presence measured at the threshold.", "警護運用。日本製装備。境界に現れる地域展開。"),
    intro: pair("Arasaka's regional presence connects protective services and the distribution of Japanese-made products to North American operations. At the annex, a loading hall and a pedestrian entrance meet the same building under different instructions. The upper walkways connect offices; the ground-level counter determines who may enter them.", "アラサカの地域展開は、警護サービスと日本製品の流通を北米の事業に結びます。別館では、荷受けホールと職員入口が、異なる指示の下で同じ建物につながります。上階の連絡橋は部門を結び、地上の窓口はそこへ入る者を確認します。"),
    sections: [
      [pair("Regional transition complete", "地域移行完了"), pair("The annex operates under its receiving administrator following the regional asset transition. Distribution has resumed under the retained movement instruction. The transition establishes institutional control of the facility; individual appointments remain subject to their recorded scope.", "地域資産の移行後、別館は引受管理者の下で運用されています。保持された移動指示に基づき流通は再開しました。この移行は施設に対する組織の管理を確立するものであり、個別の任用には記録された範囲を適用します。")],
      [pair("Two entrances", "二つの入口"), pair("Cargo appointments and pedestrian credentials are different records. Security checks each against its responsible office rather than treating a familiar face as an instruction. A resumed delivery schedule does not automatically renew the permissions of the people who maintain the equipment inside.", "貨物の予約と職員の資格証は、異なる記録です。警備は、見知った顔を指示として扱わず、それぞれを責任部門に確認します。搬入予定の再開によって、内部装備を維持する人々の権限が自動的に更新されるわけではありません。")],
      [pair("The regional working day", "地域の一日"), pair("A maintenance roster, a cabinet key, and the first shift after handover become part of the same institutional account. The regional office retains the exception alongside the completion statement. Its responsibility includes the questions left at the counter after the loading hall has reopened.", "保守勤務表、設備棚の鍵、引き継ぎ後の最初の勤務は、一つの組織記録の一部になります。地域部門は完了の公表とともに例外を保持します。荷受けホールが再開した後、窓口に残された問いも、その責任に含まれます。")],
    ], related: ["security", "shingen", "yukimura", "asset-succession", "territorial-access", "institutional-review"],
  },
];

export const inspections = {
  relic: [["relic", pair("Overview", "全体"), pair("A personality construct carried on a neural biochip. The physical interface is distinct from the archive that retains it.", "神経バイオチップに格納される人格構築体。物理的な接続基盤と、それを保持するアーカイブは異なります。")], ["relic-detail", pair("Detail", "細部"), pair("Connector and cartridge housing, shown as a visual reconstruction rather than a certified engineering drawing.", "端子とカートリッジ外装。認証された設計図ではなく、再構成画像として示しています。")], ["relic-context", pair("Context", "運用環境"), pair("Controlled custody connects the object to an instruction, a responsible office, and an authorized encounter.", "管理保管が、物体と指示、責任部門、承認された対話を結びます。")]],
  shingen: [["shingen", pair("Overview", "全体"), pair("TKI-20 Shingen. Arasaka's smart submachine-gun classification, presented without variant-specific performance figures.", "TKI-20シンゲン。個別モデルの性能値を付さず、アラサカのスマート・サブマシンガン分類を示します。")], ["shingen-detail", pair("Detail", "細部"), pair("The reconstructed industrial surface and smart-system housing. This is an illustrative product view, not a mechanism diagram.", "再構成した工業的な表面とスマートシステムの外装。機構図ではなく、製品の補足画像です。")], ["shingen-context", pair("Context", "運用環境"), pair("Equipment custody within a regional protective-services facility. Distribution and authorization remain separate responsibilities.", "地域警護施設内の装備管理。流通と承認は異なる責任として扱われます。")]],
  yukimura: [["yukimura", pair("Overview", "全体"), pair("HJKE-11 Yukimura. A smart-pistol format distinct from the Shingen platform.", "HJKE-11ユキムラ。シンゲンとは異なる形式のスマート・ピストル。")], ["yukimura-detail", pair("Detail", "細部"), pair("A close reconstruction of the product's compact industrial form. No real-world operating procedure is implied.", "小型の工業的形状を再構成した接写。現実の操作手順を示すものではありません。")], ["yukimura-context", pair("Context", "運用環境"), pair("A retained equipment record accompanies a physical product beyond the showroom.", "展示を離れた製品にも、保管された装備記録が付随します。")]],
  mikoshi: [["mikoshi-overview", pair("Infrastructure", "基盤"), pair("A reconstructed archive environment. Mikoshi retains constructs; Relic provides a distinct interface.", "再構成したアーカイブ環境。ミコシは構築体を保持し、Relicは別の接続機能を担います。")], ["mikoshi-detail", pair("Threshold", "境界"), pair("The maintenance boundary illustrates controlled access, not a disclosure of canonical internal security procedures.", "保守の境界によってアクセス管理を表現しています。公式の内部警備手順を開示するものではありません。")]],
};

// All institutional offices and facilities below are project fiction.
export const institutionalEntities = [
  { id: "group-secretariat", type: "office", page: "organization", anchor: "office-1", name: pair("Group Secretariat", "グループ事務局") },
  { id: "regional-counsel", type: "office", page: "organization", anchor: "office-2", name: pair("Regional Counsel", "地域法務") },
  { id: "financial-relationships", type: "office", page: "organization", anchor: "office-3", name: pair("Financial Relationships", "金融関係室") },
  { id: "regional-security", type: "office", page: "organization", anchor: "office-4", name: pair("Regional Security & Archive Operations", "地域警備・アーカイブ運用") },
  { id: "tokyo-concourse", type: "facility", page: "tokyo-operations", anchor: "location-1", name: pair("Headquarters concourse", "本社コンコース") },
  { id: "regional-annex", type: "facility", page: "night-city-operations", anchor: "location-1", name: pair("Night City regional annex", "ナイトシティ地域別館") },
  { id: "NC-0417", type: "case", page: "archive", anchor: "NC-0417", name: pair("The cost of continuity", "継承の代償") },
  { id: "NC-1102", type: "case", page: "archive", anchor: "NC-1102", name: pair("The regional transition", "地域の移行") }
];
export const institutionalEdges = [
  ["group-secretariat", "institutional-review", "issues"],
  ["regional-counsel", "institutional-review", "reviews-scope"],
  ["financial-relationships", "asset-succession", "issues"],
  ["regional-security", "territorial-access", "issues"],
  ["tokyo-concourse", "group-secretariat", "situates"],
  ["regional-annex", "territorial-access", "subject-of"],
  ["NC-1102", "asset-succession", "contains"],
  ["NC-1102", "territorial-access", "contains"],
  ["NC-1102", "institutional-review", "contains"],
  ...["client-intake", "access-review", "identity-assessment", "succession-directive", "case-disposition"].map(id => ["NC-0417", id, "contains"])
].map(([from, to, relationship]) => ({ from, to, relationship }));

// Build-time relationships power ordinary links and search, not a simulated network.
export const connections = {
  home: ["organization", "tokyo-operations", "night-city-operations"],
  company: ["organization", "tokyo-operations", "institutional-review"],
  businesses: ["organization", "night-city-operations"],
  security: ["night-city-operations", "territorial-access", "institutional-review"],
  banking: ["organization", "asset-succession", "case-disposition"],
  technology: ["tokyo-operations", "engram-technology", "identity-assessment"],
  contact: ["tokyo-operations", "night-city-operations", "organization"],
  relic: ["mikoshi", "client-intake", "organization"],
  mikoshi: ["relic", "access-review", "tokyo-operations"],
  shingen: ["security", "night-city-operations", "yukimura"],
  yukimura: ["security", "night-city-operations", "shingen"],
  research: ["identity-assessment", "tokyo-operations", "technology"],
  "engram-technology": ["identity-assessment", "succession-directive", "organization"],
  products: ["technology", "security", "organization"],
  "asset-succession": ["banking", "organization", "night-city-operations"],
  "territorial-access": ["security", "night-city-operations", "asset-succession"],
  "institutional-review": ["organization", "night-city-operations", "succession-directive"],
  "client-intake": ["relic", "banking"], "access-review": ["mikoshi", "organization"],
  "identity-assessment": ["research", "technology"], "succession-directive": ["company", "organization"],
  "case-disposition": ["banking", "institutional-review"],
};
