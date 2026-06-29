# Arasaka Systems Concept

An unofficial, open-source, bilingual corporate website concept for `arasaka.com`.

This is a Geoffrey Woo personal project: a design-fiction study of how a fictional cyberpunk megacorporation might present itself if it behaved like a real multi-trillion-dollar conglomerate with products, services, governance, procurement, security operations, and public accountability surfaces.

The project is not a fan wiki, lore recap, or marketing homage. It is built as a plausible institutional website: dense, mobile-first, bilingual, restrained, operational, and intentionally corporate.

## Mission

The mission of this site is to explore a single question:

What would a sovereign-scale technology, security, capital, and continuity conglomerate publish if memory, identity, autonomous force, private defense, and institutional custody were real enterprise product lines?

The site treats fictional cyberpunk themes as if they were serious corporate systems:

- Neural continuity and identity custody as regulated infrastructure
- Black ICE and counterintrusion as enterprise security products
- Autonomous protection and robotic force as service lines
- Capital custody and mandate control as board-governed systems
- Incident archives as institutional evidence packets
- Japanese and English localization as a first-class interface layer

The intended effect is quiet plausibility. A visitor should feel like they have found the public website of a vast, opaque corporation, not a page explaining the joke.

## Live Site

- Production: https://www.arasaka.com/
- Repository: https://github.com/geoffreywoo/arasaka

## Project Goals

- Build a mobile-optimized corporate website that feels authentic, operational, and premium.
- Present fictional products and services with believable enterprise information architecture.
- Support English and Japanese copy across the main experience.
- Keep the Geoffrey Woo authorship signal subtle and personal.
- Preserve clear attribution and disclaimers around third-party references and assets.
- Make the code easy to inspect, fork, and modify as an open-source static site.

## What Is Inside

This is a static frontend. There is no framework, package install, or build step.

Core files:

- `index.html` - homepage structure, metadata, bilingual content hooks, product/service surfaces, operations modules, disclosures, and the main corporate experience.
- `styles.css` - responsive visual system, route layouts, mobile navigation, product/service dossiers, cyberpunk interface treatment, and reduced-motion support.
- `app.js` - language switching, interactive console behavior, route hydration, localized product/service data, and casefile content registries.
- `vercel.json` - static deployment configuration for Vercel.
- `LICENSE.md` - MIT license for the original source code and documentation, with scope notes.

Route families:

- `technology/` - technical platform overview and subsystem dossiers.
- `operations/` - command, deployment, and operational readiness surfaces.
- `archive/` - institutional archive and public casefiles.
- `governance/` - board authority, custody gates, and control doctrine.
- `blackwall/` - perimeter doctrine and rogue-machine containment.
- `divisions/`, `subsidiaries/`, and `regional/` - corporate organization, operating entities, and command geography.
- `products/*/` - product pages for Relic, Mikoshi, Black ICE, Black Ledger, Swarm, and Soulkiller-inspired systems.
- `services/*/` - service pages for continuity, counterintrusion, mandate, and autonomous protection offerings.
- `assets/` - generated imagery, user-provided identity assets, credited Cyberpunk 2077 press references, and attribution notes.

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
http://127.0.0.1:4187/products/relic/
http://127.0.0.1:4187/products/relic/technical-specification/
http://127.0.0.1:4187/products/mikoshi/
http://127.0.0.1:4187/products/mikoshi/runtime-specification/
http://127.0.0.1:4187/products/ice/
http://127.0.0.1:4187/products/ledger/
http://127.0.0.1:4187/products/swarm/
http://127.0.0.1:4187/products/soulkiller/
http://127.0.0.1:4187/services/executive-continuity/
http://127.0.0.1:4187/services/counterintrusion/
http://127.0.0.1:4187/services/black-ledger-mandate/
http://127.0.0.1:4187/services/autonomous-protection/
```

## Design Principles

This project intentionally avoids the shape of a normal startup landing page. The website should read as a controlled corporate artifact from a serious institution.

Guiding principles:

- Make every page feel like it belongs to a large, old, powerful company.
- Prefer operational specificity over vague cyberpunk flavor.
- Treat fictional products like real procurement and governance objects.
- Keep mobile layouts dense, legible, and fast to scan.
- Use Japanese localization as a real surface, not decorative texture.
- Keep personal references subtle.
- Credit source material clearly.
- Avoid turning the project into a lore explainer.

## Open Source Scope

The original source code and documentation in this repository are open-sourced under the MIT License. See `LICENSE.md`.

Important exclusions:

- Cyberpunk 2077 names, references, screenshots, and related intellectual property belong to CD PROJEKT RED / CD PROJEKT.
- Arasaka and related fictional universe concepts are used here as unofficial fan-work references.
- User-provided logo and wordmark assets, generated imagery, and composite assets in `assets/` may have separate provenance and are not automatically relicensed for unrestricted reuse.
- Asset provenance notes live in `assets/ATTRIBUTION.md`.

If you fork this project, replace or re-clear brand, game, and image assets before using it commercially.

## Attribution And Disclaimer

This site is an unofficial fan-made web concept. It is not affiliated with, approved by, sponsored by, or endorsed by CD PROJEKT RED, CD PROJEKT, Cyberpunk 2077, or any rights holder.

Cyberpunk 2077 referenced names and credited press imagery belong to their respective owners. This project exists as design fiction, interface study, and personal creative production.

## Contributing

Small improvements are welcome, especially:

- Mobile layout fixes
- Accessibility improvements
- Japanese copy corrections
- Attribution corrections
- Performance improvements
- Cleaner route information architecture
- Better product/spec imagery that preserves the corporate tone

Please keep the site restrained, corporate, and plausible. The best contribution makes the fiction feel more like a real operating company and less like a fan page.
