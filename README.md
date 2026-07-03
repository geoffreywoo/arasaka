# Arasaka

An open-source, bilingual design-fiction corporate website for `arasaka.com`.

Arasaka is a Geoffrey Woo personal project exploring how a fictional cyberpunk megacorporation might present itself if it behaved like a real sovereign-scale conglomerate: products, services, governance, procurement language, regional command, technical specifications, incident archives, investor-grade custody surfaces, and public accountability disclosures.

The site is intentionally not a wiki, recap, reference explainer, or fanpage. It is built to feel like the controlled public web presence of a multi-trillion-dollar institution that treats memory, identity, security, capital, autonomous force, and continuity as operational product lines.

The repository is public so the craft is inspectable: information architecture, bilingual copy systems, static deployment, responsive layout, generated/composite asset handling, and the small details that make speculative fiction feel operationally real.

## Status

- Production: https://www.arasaka.com/
- Repository: https://github.com/geoffreywoo/arasaka
- License: MIT for original source code and documentation
- Deployment: static site on Vercel
- Scope note: brand, universe, press, generated, and composite assets have separate provenance notes

## Mission

Arasaka is a public-web thought experiment about institutional power.

The project starts from one question:

> What would a sovereign-scale technology, security, capital, and continuity conglomerate publish if cybernetic identity, neural persistence, autonomous defense, private intelligence, and institutional custody were real enterprise infrastructure?

The website treats speculative cyberpunk themes as serious corporate systems:

- Neural continuity as executive succession and identity custody infrastructure
- Black ICE and counterintrusion as enterprise-grade security products
- Autonomous protection as regional command, force readiness, and route assurance
- Capital custody as board-governed mandate, patent, settlement, and escrow infrastructure
- Incident archives as public evidence packets rather than lore summaries
- Japanese and English localization as a real operating layer, not decorative texture

The intended effect is quiet plausibility. A visitor should feel like they have found a controlled corporate website from a vast, opaque company rather than a page describing one.

## Project Goals

- Build the most plausible public website a fictional sovereign-scale conglomerate would publish.
- Keep English and Japanese localization central to the operating model.
- Treat every route as a real corporate surface: product, service, governance, archive, region, or protocol.
- Preserve mobile-first usability for visitors arriving from social links, search, or direct domain entry.
- Make the repo understandable enough that other designers, writers, and engineers can study or improve the illusion.
- Maintain clear attribution and licensing boundaries around third-party IP, trademarks, press images, user-provided brand assets, and generated/composite imagery.

## Why Open Source

The repository is open so people can inspect how the illusion is built: the copy system, route architecture, bilingual content model, responsive layout, asset attribution, and static deployment setup.

Good forks and contributions should improve the craft of the site:

- More credible corporate information architecture
- Better mobile reading and navigation
- Cleaner Japanese localization
- Stronger accessibility and performance
- Better attribution and asset provenance
- More restrained product, service, and governance surfaces

The project is open source as code and documentation. It is not a blanket license to reuse third-party intellectual property, trademarks, screenshots, fictional universe concepts, or generated/composite identity assets.

## Repository Philosophy

This project is open source in the spirit of a design studio case file: the implementation is visible, reusable, and critiqueable, while the referenced fictional universe and visual identity remain bounded by their respective rights.

Contributions should make the public website more credible, not louder. The best change usually removes friction, sharpens language, improves localization, fixes an accessibility issue, clarifies attribution, or adds a route that feels like it could have passed through a corporate communications department.

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
- `LICENSE` - MIT license for original source code and documentation, with scope notes
- `assets/ATTRIBUTION.md` - asset provenance and third-party reference notes

## Repository Structure

```text
.
├── index.html                 # primary corporate homepage
├── app.js                     # localization, route data, and interactions
├── styles.css                 # responsive visual system
├── vercel.json                # static Vercel deployment configuration
├── assets/                    # identity, generated, composite, and credited media
├── products/                  # product-line routes and specification dossiers
├── services/                  # service-line routes and protocol dossiers
├── technology/                # platform and subsystem routes
├── archive/                   # public casefiles and evidence surfaces
├── blackwall/                 # perimeter and containment routes
├── .github/                   # issue and pull request templates
├── CONTRIBUTING.md            # contribution guidelines
├── SECURITY.md                # security reporting scope
└── LICENSE                    # MIT license for original code and docs
```

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
http://127.0.0.1:4187/technology/autonomous-force/rules-of-force-ledger/
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
http://127.0.0.1:4187/blackwall/mirror-cell-substrate/
http://127.0.0.1:4187/blackwall/containment-docket/
http://127.0.0.1:4187/products/relic/
http://127.0.0.1:4187/products/relic/technical-specification/
http://127.0.0.1:4187/products/relic/host-compatibility/
http://127.0.0.1:4187/products/mikoshi/
http://127.0.0.1:4187/products/mikoshi/runtime-specification/
http://127.0.0.1:4187/products/mikoshi/release-arbitration/
http://127.0.0.1:4187/products/ice/
http://127.0.0.1:4187/products/ice/mesh-specification/
http://127.0.0.1:4187/products/ice/credential-geometry/
http://127.0.0.1:4187/products/ledger/
http://127.0.0.1:4187/products/ledger/custody-specification/
http://127.0.0.1:4187/products/ledger/patent-gravity/
http://127.0.0.1:4187/products/swarm/
http://127.0.0.1:4187/products/swarm/formation-specification/
http://127.0.0.1:4187/products/swarm/civilian-exclusion/
http://127.0.0.1:4187/products/soulkiller/
http://127.0.0.1:4187/products/soulkiller/extraction-specification/
http://127.0.0.1:4187/products/soulkiller/redaction-warrant/
http://127.0.0.1:4187/services/executive-continuity/
http://127.0.0.1:4187/services/executive-continuity/activation-protocol/
http://127.0.0.1:4187/services/executive-continuity/succession-rehearsal/
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

## Maintainer Notes

- Keep `.vercel/` local and untracked.
- Update `assets/ATTRIBUTION.md` whenever adding or replacing imagery.
- Run `node --check app.js` after JavaScript or localization edits.
- Spot-check changed routes on a narrow mobile viewport before publishing.
- Keep public copy restrained, institutional, and procurement-grade.

## Open Source Scope

The original source code and documentation in this repository are open-sourced under the MIT License. See `LICENSE`.

Important exclusions:

- Cyberpunk 2077 names, references, screenshots, and related intellectual property belong to CD PROJEKT RED / CD PROJEKT.
- Arasaka and related fictional universe concepts are used here as unofficial design-fiction references.
- User-provided logo and wordmark assets, generated imagery, and composite assets in `assets/` may have separate provenance and are not automatically relicensed for unrestricted reuse.
- Asset provenance notes live in `assets/ATTRIBUTION.md`.

If you fork this project, replace or re-clear brand, game, and image assets before using it commercially.

## Attribution And Disclaimer

This site is an unofficial, independent web concept. It is not affiliated with, approved by, sponsored by, or endorsed by CD PROJEKT RED, CD PROJEKT, Cyberpunk 2077, or any rights holder.

Cyberpunk 2077 referenced names and credited press imagery belong to their respective owners. This project exists as design fiction, interface study, and personal creative production by Geoffrey Woo.

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
