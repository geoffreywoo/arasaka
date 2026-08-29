# Contributing

Thanks for considering a contribution. This repository is a static design-fiction website, so the best changes are usually small, careful, and specific.

## What Belongs Here

- Mobile layout and responsive behavior improvements
- Accessibility fixes
- Japanese localization corrections
- Copy edits that make the site sound more like a real institution
- Performance and asset-loading improvements
- Route, metadata, or information-architecture cleanup
- Attribution corrections
- Original product/spec imagery that fits the restrained corporate tone

## Tone And Content

This site should read like a controlled corporate website from a sovereign-scale conglomerate. Please avoid additions that make the project feel like a lore explainer, parody page, meme, or wiki.

Good copy is operational, specific, and restrained. It should sound like procurement, compliance, investor relations, security operations, or public accountability material from a company that expects to be obeyed.

## Local Checks

Page content and shared templates live in `scripts/build-site.mjs`. After changing them, regenerate the committed static pages:

```bash
node scripts/build-site.mjs
```

Before opening a pull request, run the structural verifier and JavaScript checks:

```bash
python3 scripts/verify_site.py
node --check app.js
node --check scripts/build-site.mjs
```

Then run a local server:

```bash
python3 -m http.server 4187
```

Then spot-check the page or route you changed at:

```text
http://127.0.0.1:4187/
```

Spot-check the homepage, the relevant route, and a 390px mobile viewport in both English and Japanese.

## Asset And IP Boundaries

Original source code and documentation are MIT licensed. Third-party trademarks, fictional universe concepts, game screenshots, press assets, generated images, user-provided identity artwork, and composites in `assets/` are not automatically relicensed for unrestricted reuse.

If you add an asset, update `assets/ATTRIBUTION.md` with its provenance and intended scope.

## Pull Requests

Please keep pull requests focused. A strong PR usually changes one route, one component family, one accessibility concern, or one copy pass.

Include:

- What changed
- Why it improves plausibility, usability, accessibility, or maintainability
- What you tested locally
