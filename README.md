# Arasaka

An open-source, bilingual corporate design-fiction website for [arasaka.com](https://www.arasaka.com/).

Arasaka is a Geoff Woo project. It explores how a fictional sovereign-scale conglomerate might present continuity, network security, strategic custody, and protective autonomy as credible institutional products.

The public site is intentionally written and structured like a real corporation. It is not a wiki, game recap, or lore index. Product architecture, deployment, assurance, industries, research, company information, and institutional contact are the primary surfaces.

This project is unofficial and unaffiliated with CD PROJEKT RED, CD PROJEKT, or Cyberpunk 2077.

## Mission

The project asks one question:

> What would a sovereign-scale technology company publish if neural continuity, accountable autonomy, and institutional custody were ordinary enterprise infrastructure?

The intended effect is quiet plausibility. Visitors should encounter a focused product company before they encounter the fiction behind it.

## Public Site Map

The public architecture is deliberately small:

```text
/
├── products/
│   ├── relic/
│   ├── securenet/
│   ├── custody/
│   └── perimeter/
├── industries/
├── research/
├── company/
└── contact/
```

- **Homepage** introduces the integrated portfolio, operating architecture, industries, and deployment model.
- **Products** compares four flagship systems and explains how they operate together.
- **Product pages** cover capabilities, architecture, deployment, assurance, and related products.
- **Industries** maps products to public institutions, financial services, advanced industry, and life sciences.
- **Research** presents neural continuity, secure compute, institutional systems, and trustworthy autonomy.
- **Company** covers operating groups, regional operations, governance, and careers.
- **Contact** routes an institutional inquiry into a prepared email draft.

Earlier experimental product, service, archive, technology, and protocol URLs are permanently redirected to the closest canonical product or corporate page in `vercel.json`.

## Design Principles

- Present products before universe references.
- Use operationally specific copy instead of theatrical interface language.
- Keep the public architecture easy to scan and difficult to misunderstand.
- Treat English and Japanese as equal product surfaces.
- Make mobile the default reading environment.
- Use named authority, client control, evidence, and assurance as recurring product concepts.
- Keep the user-provided Arasaka mark and wordmark consistent across every page.
- Credit third-party names and imagery without interrupting the corporate experience.

## Technology

The site is static and has no runtime dependencies.

- `scripts/build-site.mjs` contains the structured bilingual content model and page templates.
- `index.html` and the route `index.html` files are generated and committed for static hosting.
- `styles.css` contains the shared responsive design system.
- `app.js` handles localization, the mobile menu, short code-lock animation, and contact email preparation.
- `vercel.json` defines security headers, asset caching, and legacy redirects.
- `sitemap.xml` lists only canonical public pages.
- `assets/ATTRIBUTION.md` records image provenance and rights boundaries.

## Local Development

Regenerate the static pages after changing page content or templates:

```bash
node scripts/build-site.mjs
```

Run a local server from the repository root:

```bash
python3 -m http.server 4187
```

Then open:

```text
http://127.0.0.1:4187/
http://127.0.0.1:4187/products/
http://127.0.0.1:4187/products/relic/
http://127.0.0.1:4187/products/securenet/
http://127.0.0.1:4187/products/custody/
http://127.0.0.1:4187/products/perimeter/
http://127.0.0.1:4187/industries/
http://127.0.0.1:4187/research/
http://127.0.0.1:4187/company/
http://127.0.0.1:4187/contact/
```

The homepage can also be opened directly as `index.html`. A local server is recommended for testing clean route URLs and redirects.

## Verification

Before publishing:

```bash
node --check app.js
node --check scripts/build-site.mjs
node scripts/build-site.mjs
git diff --check
```

Also verify:

- Every canonical page returns successfully.
- Internal links resolve to canonical pages or valid fragment targets.
- English and Japanese switching works on desktop and mobile.
- Mobile pages have no horizontal overflow.
- Navigation, focus states, form labels, and reduced motion remain usable.
- Legacy URLs redirect to the intended canonical destination.
- The custom domain contains a distinctive change from the release.

## Deployment

Production is a static Vercel project:

```text
https://www.arasaka.com/
```

Vercel serves the committed HTML, CSS, JavaScript, and image assets directly. There are no required environment variables.

## Open Source Scope

Original source code and documentation are provided under the MIT License. That license does not automatically cover third-party names, fictional-universe concepts, user-provided identity assets, press imagery, or generated/composite media.

See [LICENSE](LICENSE) and [assets/ATTRIBUTION.md](assets/ATTRIBUTION.md) before reusing the project or its assets.

## Attribution

This is an unofficial, independent design-fiction project. Referenced names and credited imagery belong to their respective rights holders.

Project: [X / @geoffwoo](https://x.com/geoffwoo)
