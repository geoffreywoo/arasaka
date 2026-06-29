# Arasaka Systems Concept

An unofficial, bilingual cyberpunk corporate website for `arasaka.com`.

This is a Geoffrey Woo personal project exploring what a fictional megacorporation website could feel like if it were built as a real enterprise product surface: dense, mobile-first, multilingual, operational, and strangely plausible.

## Mission

The project asks a simple design question:

What would a multi-trillion-dollar cyberpunk conglomerate publish if it treated memory, identity, capital, security, and autonomous force as product lines?

The site is not meant to be a fan wiki or lore recap. It is designed as a fictional corporate system of record, with product pages, service pages, procurement surfaces, assurance ledgers, governance gates, deployment runbooks, evidence packets, lifecycle covenants, and Japanese/English language support.

The goal is to make the fiction feel institutional:

- Cyberpunk technologies presented as believable enterprise systems
- Product and service pages with real information architecture
- Mobile-first layouts for people encountering the site from a phone
- Japanese and English interface copy
- Credited use of Cyberpunk 2077 references and press imagery
- A subtle Geoffrey Woo authorship signal without turning the site into a biography page

## Live Site

- Production: https://www.arasaka.com/
- Repository: https://github.com/geoffreywoo/arasaka

## What Is Inside

The site is a static frontend. There is no framework, no package install, and no build step.

Core files:

- `index.html` - homepage structure, metadata, bilingual content hooks, product/service surfaces, operations modules, disclosure sections, and the public-facing corporate experience.
- `styles.css` - responsive visual system, route layouts, mobile navigation, cyberpunk interface treatment, reduced-motion support, and product/service dossier styling.
- `app.js` - language switching, interactive consoles, product/service route hydration, route-level information architecture, and localized data registries.
- `technology/`, `operations/`, `archive/`, `archive/konpeki/`, `governance/`, and `blackwall/` - standalone institutional routes for technical dossiers, live command, incident doctrine, board authority controls, and rogue-machine perimeter doctrine.
- `products/*/index.html` - standalone product pages for Relic, Mikoshi, Black ICE, Black Ledger, Swarm, and Soulkiller-inspired systems.
- `services/*/index.html` - standalone service pages for continuity, counterintrusion, mandate, and autonomous protection offerings.
- `assets/` - generated images, user-provided identity assets, credited Cyberpunk 2077 press references, and attribution notes.

## Local Development

You can open the site directly:

```bash
open index.html
```

For route testing, run a local static server from the repo root:

```bash
python3 -m http.server 4187
```

Then visit:

```text
http://127.0.0.1:4187/
http://127.0.0.1:4187/technology/
http://127.0.0.1:4187/operations/
http://127.0.0.1:4187/archive/
http://127.0.0.1:4187/archive/konpeki/
http://127.0.0.1:4187/governance/
http://127.0.0.1:4187/blackwall/
http://127.0.0.1:4187/products/relic/
http://127.0.0.1:4187/services/counterintrusion/
```

## Design Principles

This project intentionally avoids a normal startup landing-page feel. The design should read as a controlled corporate artifact, not a marketing splash page.

Guiding principles:

- Make every page feel like it belongs to a serious institution.
- Prefer operational specificity over vague cyberpunk flavor.
- Treat fictional products like real procurement objects.
- Keep mobile layouts dense but readable.
- Use Japanese localization as a first-class surface, not an afterthought.
- Keep external personal references subtle.
- Credit source material clearly.

## Open Source Scope

The original source code in this repository is open-sourced under the MIT License. See [`LICENSE.md`](LICENSE.md).

Important exclusions:

- Cyberpunk 2077 names, references, screenshots, and related intellectual property belong to CD PROJEKT RED / CD PROJEKT.
- Arasaka and related fictional universe concepts are used here as unofficial fan-work references.
- User-provided logo and wordmark assets, generated imagery, and composite assets in `assets/` may have separate provenance and are not automatically relicensed for unrestricted reuse.
- See [`assets/ATTRIBUTION.md`](assets/ATTRIBUTION.md) for asset notes.

If you fork this project, replace or re-clear brand, game, and image assets before using it commercially.

## Attribution And Disclaimer

This site is an unofficial fan-made web concept. It is not affiliated with, approved by, or endorsed by CD PROJEKT RED, CD PROJEKT, Cyberpunk 2077, or any rights holder.

Cyberpunk 2077 referenced names and credited press imagery belong to their respective owners. This project exists as design fiction, interface study, and personal creative production.

## Contributing

Small improvements are welcome, especially:

- Mobile layout fixes
- Accessibility improvements
- Japanese copy corrections
- Attribution corrections
- Performance improvements
- Cleaner route information architecture

Please keep the tone restrained, corporate, and plausible. The best contribution makes the fiction feel more like a real operating company and less like a fan page.
