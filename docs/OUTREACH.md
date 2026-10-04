# Outreach Kit: Restored Empire

**Drafts only. Nothing posted, emailed, or submitted.** Rules checked against primary pages on 2026-10-03. Recheck before publishing; inclusion and backlink treatment are editorial choices, not guaranteed SEO results. Human review must verify claims, identity-asset permissions, and the chosen ending's spoiler disclosure.

## X Launch Thread

Suggested screenshots: `docs/screenshots/desktop.jpg`, `docs/screenshots/mobile.jpg`, and the Relic/Mikoshi product views. Posts are intended for Geoff's real account, not an account impersonating Arasaka or CDPR.

1. I bought arasaka.com and built the corporate website I wanted to exist. Security. Capital. Continuity. A speculative next chapter for Arasaka after 2077. https://www.arasaka.com/
2. Products first: Relic, Mikoshi, Shingen, and Yukimura. Then the institution behind them: security and defense, banking and capital, advanced technology.
3. English and Japanese are complete, separate pages. Mobile-first imagery, a small letter-lock detail, and no theatrical loading gate. The site still works with JavaScript off.
4. The visual system uses generated concept reconstructions, not official product photos. The README separates established setting material from the imagined aftermath. This is independent design fiction, not an official CDPR project.
5. Open source: https://github.com/geoffreywoo/arasaka. I would welcome precise Japanese localization feedback and thoughtful ideas for making this fictional institution feel more coherent.

Do not ask for coordinated votes, artificial engagement, or links. Label any ending-specific screenshot or follow-up discussion as containing spoilers.

## Community Draft 1: DEV

**Title:** Generating 28 bilingual static pages from one manifest

This is a technical draft, not a launch advertisement. Geoff should only publish explanations he understands and has reviewed. The purpose must be sharing implementation lessons, not backlink acquisition.

> I used a fictional corporate website as a test case for a small static publishing system. Fourteen page definitions render in English and Japanese, producing 28 ordinary HTML URLs. There is no client-side locale state and no runtime framework.
>
> A page definition holds its route, parent, localized title and description, and image ID. The builder uses those fields for navigation, breadcrumbs, self-canonicals, language alternates, social metadata, and the sitemap. One registry prevents a translated page from quietly disappearing from one of those outputs.
>
> The useful constraint was progressive enhancement: turning JavaScript off must not remove the content, language links, or menu. A native details element handles the mobile menu; JavaScript adds Escape behavior and a short optional text effect. Reduced motion disables the effect.
>
> A Python verifier resolves local links, fragments, image sources, and language pairs. Browser checks exercise every URL at four widths and repeat navigation without JavaScript. The next improvement would be native Japanese editorial review, rather than relying solely on structural checks.
>
> The implementation is available in the Arasaka repository: https://github.com/geoffreywoo/arasaka. This draft and parts of the implementation were prepared with AI assistance. The project is independent design fiction; referenced identity assets remain outside the code license.

Include one real code excerpt from `scripts/site-content.mjs`, one generated-language pair, and the actual verification result. Avoid a copied generic tutorial, product promotion, or automated comments. [DEV's AI-assisted article rules](https://dev.to/guidelines-for-ai-assisted-articles-on-dev) require disclosure and factual review and prohibit posts whose main purpose is building SEO backlinks.

## Community Draft 2: Hashnode

**Title:** Keeping fictional branding immersive without misleading search engines

> The visual brief for Arasaka was a plausible corporate institution, but the website is an independent speculative project. That creates two different jobs: the visible experience should be coherent, and the machine-readable description should be truthful.
>
> I kept the corporate tone in the main page copy and placed the provenance in the footer and repository. Structured data describes a website, web pages, breadcrumbs, and a creative work. It deliberately does not describe a real financial services or defense company.
>
> The same distinction shapes the product pages. Relic, Mikoshi, Shingen, and Yukimura have qualitative profiles, not invented throughput, revenue, pricing, or real-world weapon performance. A separate source document identifies which names and relationships come from the setting and which details are new design fiction.
>
> Images have a similar boundary. The new product and corporate scenes are generated reconstructions. They are delivered through picture elements with multiple sizes, stable dimensions, and localized alt text. Mobile product compositions preserve the object instead of relying on an arbitrary desktop crop.
>
> The result is a static English/Japanese site with 28 URLs: https://www.arasaka.com/. Source and verification tooling: https://github.com/geoffreywoo/arasaka. AI assisted this project and this draft; human review is required before publication. I am interested in how other developers keep provenance visible without overwhelming the experience.

Add concrete source/schema examples and measured results before publication. [Hashnode's conduct policy](https://hashnode.com/code-of-conduct) permits reviewed AI-assisted writing and relevant references but prohibits spam, impersonation, and SEO abuse.

## Eight Rule-Checked Targets

These are relevant places to earn contextual references, not a bulk submission queue. A checked rule can yield a conditional or no-go result. No account creation, payment, or rights-holder permission is assumed.

| Target | Relevant format | Checked rule / next action |
| --- | --- | --- |
| Geoffrey's personal website | Small Projects entry linking to the canonical site | Owner-controlled, no outside submission policy. Suggested copy below; **not edited in this release**. |
| [GitHub repository](https://github.com/geoffreywoo/arasaka) | README, About homepage, accurate topics, product deep links | Existing public repo; [GitHub topic rules](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics) allow up to 20 descriptive lowercase topics. No unrelated tags. Repository updates are part of this release. |
| [X / @geoffwoo](https://x.com/geoffwoo) | Original launch thread with screenshots and one canonical link | Use the real owner account and disclose fiction; avoid manipulation and impersonation under [X authenticity policy](https://help.x.com/en/rules-and-policies/authenticity). Draft only. |
| [DEV](https://dev.to/) | Educational generator/localization case study | [Rules](https://dev.to/guidelines-for-ai-assisted-articles-on-dev): reviewed, disclosed AI assistance; no promotional or backlink-first article. Publish only after genuine human technical review. |
| [Hashnode](https://hashnode.com/) | Original technical case study with source examples | [Rules](https://hashnode.com/code-of-conduct): relevant references welcome; own the accuracy; no bulk posts or SEO abuse. Use a substantive, distinct article rather than duplicating the DEV text. |
| [Codrops](https://tympanus.net/codrops/submit/) | Website submission or editorial case-study pitch | Official page invites website/development projects through its contact link (`codrops@gmail.com`). No automatic acceptance or AI-specific eligibility statement was found. Disclose reconstruction and rights limitations; editor decides. No email sent. |
| [Behance](https://help.behance.net/hc/en-us/articles/204483894-What-is-Behance) | A free design-process project with real page screenshots | [AI FAQ](https://help.behance.net/hc/en-us/articles/13850092907931-Behance-and-Adobe-Firefly-FAQ) allows generative work and encourages tool labeling. Check [community rules](https://www.behance.net/misc/community) and identity permissions first. Never promote through other creators' comments. |
| [Hacker News](https://news.ycombinator.com/showhn.html) | Conditional discussion of the static architecture, not a backlink campaign | [Guidelines](https://news.ycombinator.com/newsguidelines.html) prohibit AI-generated/edited posts. **Do not use these drafts there.** The owner must write independently; [Show HN](https://news.ycombinator.com/showhn.html) requires substantive tryable work and excludes ordinary landing pages. Treat as conditional/low priority, not an assumed eligible submission. |

## Deliberately Excluded

- [Dribbble](https://dribbble.com/guidelines): restrictions on wholly AI-generated work, trademarked content, and URLs in shot descriptions make it unsuitable for this launch's backlink goal.
- [Httpster](https://httpster.net/about/): submissions were explicitly closed at the rule check.
- r/Cyberpunk and r/cyberpunkgame: current moderator notices restrict AI-generated content; do not submit this imagery there or evade restrictions with an unlabeled post.
- Paid directories, link exchanges, bulk guest posts, automated comments, and voting campaigns: excluded.
- Siteinspire: submission page returned an access restriction during research; eligibility was not verified, so it is not in the approved target list.

## Personal-Website Mention

Suggested unframed Projects entry, no external edit performed:

> **Arasaka** — An open-source corporate design-fiction project imagining Arasaka's next chapter, in English and Japanese. [Visit arasaka.com](https://www.arasaka.com/).

Use the natural anchor `Arasaka` or `arasaka.com`, not a repeated keyword list. Keep any deeper write-up on Geoffrey's site original and personal; do not manufacture an endorsement by a real company.

## Submission Ledger

Record each future human-approved action with date, exact submitted text, destination URL, status (draft/submitted/accepted/published/rejected), and the actual live referring URL. A submitted pitch is not a published backlink. Revisit the [measurement worksheet](SEARCH.md) after equal-length observation windows; do not attribute ranking changes to an isolated submission without evidence.
