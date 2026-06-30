# Arasaka

An open-source, bilingual corporate website concept for `arasaka.com`.

This is a Geoffrey Woo personal project and design-fiction study. It imagines how a fictional cyberpunk megacorporation might present itself if it behaved like a real sovereign-scale conglomerate: products, services, governance, procurement language, regional command, technical specifications, incident archives, investor-grade custody surfaces, and public accountability disclosures.

The site is intentionally not a wiki, recap, or reference explainer. It is designed to feel like the controlled public web presence of a multi-trillion-dollar institution that treats memory, identity, security, capital, autonomous force, and continuity as operational product lines.

## Live Site

- Production: https://www.arasaka.com/
- Repository: https://github.com/geoffreywoo/arasaka
- License: MIT for original source code and documentation, with separate asset and IP scope notes

## Mission

The project explores one question:

> What would a sovereign-scale technology, security, capital, and continuity conglomerate publish if cybernetic identity, neural persistence, autonomous defense, private intelligence, and institutional custody were real enterprise infrastructure?

The website treats speculative cyberpunk themes as serious corporate systems:

- Neural continuity as executive succession and identity custody infrastructure
- Black ICE and counterintrusion as enterprise-grade security products
- Autonomous protection as regional command, force readiness, and route assurance
- Capital custody as board-governed mandate, patent, settlement, and escrow infrastructure
- Incident archives as public evidence packets rather than lore summaries
- Japanese and English localization as a real operating layer, not decorative texture

The intended effect is quiet plausibility. A visitor should feel like they have found a controlled corporate website from a vast, opaque company.

## Design Principles

- Make every surface feel owned by a large, old, powerful institution.
- Prefer operational specificity over generic cyberpunk style.
- Treat fictional products like real procurement, compliance, and governance objects.
- Keep the mobile experience dense, legible, and fast to scan.
- Use Japanese localization as product infrastructure.
- Keep Geoffrey Woo authorship subtle and personal.
- Credit source material clearly.
- Preserve enough restraint that the fiction feels corporate before it feels theatrical.

## Technology

This is a static website. There is no framework, package install, compile step, or application server.

- `index.html` - homepage structure, metadata, bilingual content hooks, product/service surfaces, operations modules, disclosures, and the main corporate experience
- `styles.css` - responsive visual system, route layouts, mobile navigation, product/service dossiers, cyberpunk interface treatment, and reduced-motion support
- `app.js` - language switching, interactive console behavior, route hydration, localized product/service data, and casefile content registries
- `vercel.json` - static deployment configuration for Vercel
- `LICENSE.md` - MIT license for original source code and documentation, with scope notes
- `assets/ATTRIBUTION.md` - asset provenance and third-party reference notes

## Site Map

- `technology/` - platform overview and subsystem dossiers
- `operations/` - command, deployment, and readiness surfaces
- `archive/` - institutional archive and public casefiles
- `governance/` - board authority, custody gates, and control doctrine
- `blackwall/` - perimeter doctrine and rogue-machine containment
- `divisions/`, `subsidiaries/`, and `regional/` - organization, operating entities, and command geography
- `products/*/` - product pages for Relic, Mikoshi, Black ICE, Black Ledger, Swarm, and Soulkiller-inspired systems
- `services/*/` - service pages for executive continuity, counterintrusion, mandate, and autonomous protection offerings
- `assets/` - generated imagery, identity assets, credited press references, and attribution notes

## Local Development

You can open the homepage directly:

```bash
open index.html
```

For route testing, run a local static server from the repository root:

```bash
python3 -m http.server 4187
```

Then visit:

```text
http://127.0.0.1:4187/
http://127.0.0.1:4187/technology/
http://127.0.0.1:4187/technology/neural-substrate/
http://127.0.0.1:4187/technology/neural-substrate/engram-custody/
http://127.0.0.1:4187/technology/black-ice-runtime/
http://127.0.0.1:4187/technology/capital-custody/
http://127.0.0.1:4187/technology/autonomous-force/
http://127.0.0.1:4187/divisions/
http://127.0.0.1:4187/subsidiaries/
http://127.0.0.1:4187/regional/
http://127.0.0.1:4187/operations/
http://127.0.0.1:4187/archive/
http://127.0.0.1:4187/archive/tower/
http://127.0.0.1:4187/archive/konpeki/
http://127.0.0.1:4187/archive/afterlife/
http://127.0.0.1:4187/governance/
http://127.0.0.1:4187/blackwall/
http://127.0.0.1:4187/blackwall/contact-protocol/
http://127.0.0.1:4187/blackwall/containment-docket/
http://127.0.0.1:4187/products/relic/
http://127.0.0.1:4187/products/relic/technical-specification/
http://127.0.0.1:4187/products/mikoshi/
http://127.0.0.1:4187/products/mikoshi/runtime-specification/
http://127.0.0.1:4187/products/mikoshi/release-arbitration/
http://127.0.0.1:4187/products/ice/
http://127.0.0.1:4187/products/ice/mesh-specification/
http://127.0.0.1:4187/products/ledger/
http://127.0.0.1:4187/products/ledger/custody-specification/
http://127.0.0.1:4187/products/swarm/
http://127.0.0.1:4187/products/swarm/formation-specification/
http://127.0.0.1:4187/products/soulkiller/
http://127.0.0.1:4187/products/soulkiller/extraction-specification/
http://127.0.0.1:4187/services/executive-continuity/
http://127.0.0.1:4187/services/executive-continuity/activation-protocol/
http://127.0.0.1:4187/services/counterintrusion/
http://127.0.0.1:4187/services/counterintrusion/response-protocol/
http://127.0.0.1:4187/services/black-ledger-mandate/
http://127.0.0.1:4187/services/black-ledger-mandate/settlement-protocol/
http://127.0.0.1:4187/services/autonomous-protection/
http://127.0.0.1:4187/services/autonomous-protection/route-protocol/
```

## Deployment

The production site is deployed on Vercel as a static project:

```text
https://www.arasaka.com/
```

Vercel serves the checked-in static files directly. There are no required environment variables.

## Open Source Scope

The original source code and documentation in this repository are open-sourced under the MIT License. See `LICENSE.md`.

Important exclusions:

- Cyberpunk 2077 names, references, screenshots, and related intellectual property belong to CD PROJEKT RED / CD PROJEKT.
- Arasaka and related fictional universe concepts are used here as unofficial design-fiction references.
- User-provided logo and wordmark assets, generated imagery, and composite assets in `assets/` may have separate provenance and are not automatically relicensed for unrestricted reuse.
- Asset provenance notes live in `assets/ATTRIBUTION.md`.

If you fork this project, replace or re-clear brand, game, and image assets before using it commercially.

## Attribution And Disclaimer

This site is an unofficial, independent web concept. It is not affiliated with, approved by, sponsored by, or endorsed by CD PROJEKT RED, CD PROJEKT, Cyberpunk 2077, or any rights holder.

Cyberpunk 2077 referenced names and credited press imagery belong to their respective owners. This project exists as design fiction, interface study, and personal creative production.

## Contributing

Contributions are welcome when they make the project feel more plausible, usable, accessible, or technically clean.

Good contribution areas:

- Mobile layout fixes
- Accessibility improvements
- Japanese copy corrections
- Attribution corrections
- Performance improvements
- Cleaner route information architecture
- Product/spec imagery that preserves the restrained corporate tone

Please keep the site controlled, corporate, and believable. The best contribution makes the fiction feel more like a real operating company and less like a reference page.

See `CONTRIBUTING.md` for contribution guidelines.
