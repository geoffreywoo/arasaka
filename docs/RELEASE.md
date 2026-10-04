# Restored Empire Release Verification

Release work began 2026-10-03, America/Los_Angeles. UTC sitemap timestamps may fall on 2026-10-04. Technical checks do not prove Google indexing or ranking.

## Existing Project & Rollback

- GitHub: `geoffreywoo/arasaka`, public.
- Vercel: `arasaka`, project `prj_Gl14w6hEJA8bJ86DxwA5rjL7l3iY`, Geoffrey Woo's projects.
- Canonical: `https://www.arasaka.com/`; existing apex redirect retained, no DNS migration.
- Previous production retained: `dpl_ConAyrTqKgk9pgLCthf1eiRZW9Y7`.
- Previous deployment URL: `https://arasaka-lebkjdbti-geoffrey-woos-projects.vercel.app`.

If a production regression is confirmed, restore that deployment with Vercel's rollback/promotion workflow, then reopen the custom domain and verify the previous content. Do not delete the prior deployment during this release.

## Local Verification

| Check | Result |
| --- | --- |
| Manifest-driven static verifier | PASS: 28 localized pages; links, fragments, assets, metadata, language pairs, sitemap, 127 redirect rules |
| Browser viewport matrix | PASS: all 28 pages at 360, 390, 768, and 1440px (112 cases), zero horizontal overflow or broken images |
| English/Japanese no-JS navigation | PASS: all 28 pages, full rendered content, native menu and ordinary language links |
| Keyboard and reduced motion | PASS: menu Enter/Escape, focus restoration, fragment-preserving language switch, animation disabled |
| JavaScript errors | None recorded across the matrix |
| Mobile Lighthouse EN homepage | Three runs: 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.5/1.6/1.7s, CLS 0 |
| Mobile Lighthouse JA homepage | 100 in all four categories |
| Mobile Lighthouse Shingen | 100 in all four categories |
| Code/build checks | Node syntax, Python structural checks, generated-file consistency, `git diff --check` |

These Lighthouse scores are local simulated mobile lab results, not field Core Web Vitals or rankings. Raw browser and Lighthouse outputs remain in ignored `test-results/`. README screenshots are real captures of the final local design.

## Preview

Final preview deployment: `dpl_4dLFa6MSYFvvurszZhnLDJijwwXf`, [preview](https://arasaka-gw4ryp37f-geoffrey-woos-projects.vercel.app), READY in the existing project. Deployment protection was retained and access used Vercel's authenticated curl, with a temporary scoped browser cookie. The earlier preview (`dpl_6SZAWrfXhQFKmHeQpHzjCmtVMRbo`) passed before the final terminology correction; the final preview is checked again before release.

The protected preview passed the full 112-case browser matrix and 28 no-JavaScript checks. HTTP verification checks every localized HTML hash, shared assets, sitemap and 127 actual permanent redirects. Vercel's known preview-only feedback script is the sole allowed response addition; production requires exact HTML hashes.

Production receipt will be appended after alias and live checks. No outreach was published, no Search Console ownership token was invented, and no sitemap was submitted to an account without access.

## CI Authorization

GitHub rejected creation of `.github/workflows/verify.yml` because the active OAuth authorization lacks workflow-write scope. The same configuration is preserved as `docs/ci-verify.yml.example`, not an active workflow. Local and preview verification ran successfully; no GitHub Actions success is claimed. Repository admins can activate the template using appropriately scoped access.
