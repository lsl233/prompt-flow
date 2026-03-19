# Technical SEO Reference

Use this file when auditing rendering, metadata, indexing, crawl signals, or structured data.

## Priority Order

1. Indexation and duplicate control
2. Rendered content visibility
3. Metadata quality and consistency
4. Internal linking and information architecture
5. Structured data
6. Media and performance-adjacent issues

## Indexation

Check:

- canonical points to the preferred absolute URL
- canonical is self-referential on unique indexable pages unless consolidation is intentional
- `noindex` pages are not included in sitemap
- robots directives do not conflict between HTML and headers
- staging or preview environments do not leak indexable URLs
- parameterized pages, filters, sorts, and search results do not create uncontrolled duplicate pages

Common bugs:

- canonical built from request host and accidentally using preview domains
- pagination or faceted routes all canonicalizing to page 1 without product intent
- `noindex,follow` or `index,nofollow` emitted inconsistently by environment flags
- sitemap including redirected, canonicalized, or 404 pages

## Rendering

Prefer HTML that already contains primary content, title, description, headings, canonicals, and structured data.

Flag risks when:

- critical copy loads only after client-side API calls
- metadata depends on browser-only state
- routes render empty shells to non-JS clients
- lazy components hide main text or links behind interaction

## Metadata

Require per-page logic for:

- `<title>`
- meta description
- canonical
- robots
- Open Graph title, description, URL, image
- Twitter card metadata when used by the stack

Check for:

- duplicate titles across templates
- titles that omit the differentiating entity
- descriptions copied across many pages
- absolute URLs for canonical and social images
- incorrect `og:url`

## Headings and Main Content

Check:

- one clear H1 matching the page intent
- heading hierarchy that reflects content structure
- meaningful body copy above thin templated content
- crawlable text links, not button-only navigation

## Internal Linking

Check:

- indexable pages reachable from other indexable pages
- anchor text describes destination intent
- breadcrumb links resolve and reflect hierarchy
- related content modules avoid generic "read more" patterns when context is missing

## Structured Data

Use only when page data supports it. Typical candidates:

- `Organization` / `WebSite`
- `BreadcrumbList`
- `Article`
- `Product`
- `FAQPage` only when the page visibly contains the FAQs

Check:

- JSON-LD matches on-page content
- required fields exist for the chosen schema
- URLs, dates, prices, availability, images are consistent with rendered content

## Sitemap and Robots

Require:

- canonical indexable URLs only
- consistent hostname
- locale URLs included only when live and indexable
- `robots.txt` not blocking assets needed for rendering

## Framework Hotspots

Look in:

- shared layout and document wrappers
- route-level metadata builders
- middleware that rewrites hosts, locales, or trailing slashes
- CMS adapter layers that map SEO fields into head tags
- static generation config, revalidation, and route params
