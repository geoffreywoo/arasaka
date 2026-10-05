# Search Setup & Measurement

Canonical host: **https://www.arasaka.com**. The Cost of Continuity release expands the technical inventory to 40 canonical pages; this is not a count of confirmed indexed pages. Search Console access and provider metrics have not been supplied; those values remain unknown, not zero.

## Implemented

Distinct localized titles/descriptions, self-canonicals, reciprocal EN/JA/x-default alternates, ordinary language links, breadcrumbs, contextual internal links, responsive image elements with dimensions and alt text, image sitemap entries, and truthful creative-project structured data. The apex retains its existing redirect to www. Legacy product routes map to the nearest active business or brief.

This follows Google's [multilingual site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) and [image guidance](https://developers.google.com/search/docs/appearance/google-images). No automatic language routing, keyword stuffing, real-company schema, or paid backlink scheme is used.

## Search Console Handoff

1. Sign in to [Search Console](https://search.google.com/search-console) with the intended owner account. Add a **Domain property** for `arasaka.com`, or use an existing verified property.
2. Obtain Google's exact verification TXT value. If Namecheap is still the authoritative DNS provider, add a TXT record at the root (`@`) without replacing existing A/CNAME/TXT records. If nameservers have moved, add it at the actual authoritative provider instead.
3. Return to Google and verify after DNS propagation. Keep the verification record. Do not use an invented or example token. An alternative is a URL-prefix property for `https://www.arasaka.com/` with Google's supplied HTML file/tag deployed exactly as instructed.
4. In **Sitemaps**, submit `https://www.arasaka.com/sitemap.xml`. Confirm the report receives it successfully; a submission alone does not prove indexing.
5. Inspect `/`, `/ja/`, Relic, Mikoshi, and the engram brief with URL Inspection. Review the selected canonical and render; request indexing only through the normal owner workflow.

Google's current [ownership verification instructions](https://support.google.com/webmasters/answer/9008080) and [Sitemaps report instructions](https://support.google.com/webmasters/answer/7451001) are the authorities for this process. No verification or submission was performed during the website refresh.

## Baseline Worksheet

Create the first saved receipt after owner access is available. Use the last complete 28 days before launch, then compare equal-length windows 28 and 56 days after launch. Record date range, property, timezone, source, and any reporting lag.

| Metric | Baseline | Source / definition |
| --- | --- | --- |
| Published canonical URLs | 40 after continuity release | Generated manifest; technical inventory only |
| Search impressions | Pending owner export | Search Console Performance, web search, same date filters |
| Search clicks | Pending owner export | Same Performance export; not total traffic |
| Indexed pages | Pending owner export | Page Indexing report; distinguish indexed/excluded/pending |
| Referring domains | Pending owner export | Search Console Links, unique external linking sites; partial coverage, not an exhaustive web crawl |
| Canonical selected correctly | Pending URL inspections | Sample EN/JA and product pages; save receipts |

Save raw dated exports locally; do not commit account credentials, tokens, or private analytics. Use null/pending for unavailable values, never inferred zeros. Group EN and JA URL prefixes separately. Track branded queries (Arasaka, Relic, Mikoshi, Shingen, Yukimura) without rewriting copy to stuff keywords.

Review changes monthly as an owner-operated process, not an automated monitor. Search Console data is observational; it cannot guarantee rankings, index coverage, or causality from a particular backlink.

## Linkage Strategy

The repository's canonical homepage and README deep links are the first durable references. A small personal-site project mention is the next owner-controlled step. Technical case studies should explain the generator, localization, accessibility, and image pipeline; design showcases should reveal the real page and cite the visual reconstruction process.

Use the [outreach kit](OUTREACH.md) only after human review and fresh rule checks. No bulk submissions, promotional comments, purchased links, or engagement manipulation.
