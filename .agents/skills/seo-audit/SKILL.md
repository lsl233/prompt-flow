---
name: seo-audit
description: Audit and improve SEO issues in codebases and website content. Use when Codex needs to review or fix technical SEO, metadata, structured data, multilingual or localized copy, hreflang, canonicals, indexing directives, URL structure, internal links, images, alt text, Open Graph/Twitter tags, sitemap or robots configuration, or render-time issues affecting search visibility.
---

Audit the implementation first. Work from the rendered document and the source code together. Prefer fixing the root cause in templates, routing, metadata generation, CMS mapping, or content models instead of patching one page at a time.

## Quick Start

1. Identify the stack and SEO surface area.
2. Inspect the relevant routes, layouts, head/meta generation, sitemap, robots, image helpers, localization layer, and content source.
3. Classify issues by impact: indexation, duplication, metadata, multilingual targeting, URL quality, internal linking, media, performance/rendering.
4. Fix systemic issues before page-level wording.
5. Validate the affected pages and list residual risks.

## Inspect

Check these areas early:

- Routing and route generation for stable, descriptive, lowercase URLs
- Layout or document wrappers that emit `<title>`, meta description, canonical, robots, Open Graph, Twitter, JSON-LD
- i18n or locale routing for `hreflang`, locale alternates, and localized slugs
- Sitemap and robots generation
- Image components or CMS mappings for `alt`, dimensions, file naming, lazy loading, and social preview images
- Render mode and data fetching for SSR/SSG/ISR/client-only gaps that may hide content from crawlers

Use `references/technical-seo.md` for technical rules, `references/multilingual-seo.md` for locale behavior, and `references/content-and-media.md` for URLs, copy, and image checks.

## Workflow

### 1. Map the page type

Determine whether the target is:

- marketing page
- blog or editorial content
- product/category/detail page
- help docs
- app shell that should be `noindex`

Apply expectations by page type. A blog post needs article metadata and internal links. A product page needs unique copy, canonical handling, and image markup. An authenticated app shell often needs `noindex`.

### 2. Audit the rendered output

Verify the final HTML or framework metadata output contains:

- unique title
- unique meta description when appropriate
- canonical URL
- robots directives
- Open Graph and Twitter tags for share previews
- structured data when page type justifies it
- indexable main content in server-rendered or prerendered output
- correct heading structure and crawlable links

Do not assume framework helpers are configured correctly. Trace the actual values back to the source code.

### 3. Audit multilingual behavior

When multiple locales or regions exist:

- require self-referencing canonical unless there is a deliberate consolidation strategy
- require `hreflang` alternates that are reciprocal and point to indexable pages
- keep locale, language, and region mapping consistent
- localize titles, descriptions, headings, body copy, and image alt text when the page is localized
- avoid mixing one locale's copy with another locale's URL or metadata

### 4. Audit URL and linking quality

Require URLs that are:

- readable and stable
- lowercase
- hyphen-separated
- free of unnecessary parameters
- consistent about trailing slash behavior

Check for orphan pages, weak anchor text, broken internal links, and pagination or faceted navigation that can create duplicate indexable URLs.

### 5. Audit media and assets

Require:

- meaningful `alt` text for informative images
- empty `alt` for decorative images
- explicit width and height when supported
- optimized formats and sensible file names
- share image coverage for major page types

### 6. Fix and verify

Prefer reusable fixes in shared code. After changes, verify at least one representative URL per affected page type.

## Output

When asked to review, report findings in priority order with:

- issue
- impact
- exact file or rendering location
- recommended fix

When asked to implement, make the code changes and then summarize:

- what was fixed
- which pages or templates are affected
- what still needs content or business input

## Guardrails

- Do not invent canonicals, hreflang clusters, or structured data fields without evidence from routing or content sources.
- Do not translate branded terms, legal text, or regulated copy unless the source already does so.
- Do not add keyword-stuffed titles, descriptions, headings, alt text, or anchor text.
- Do not mark thin, duplicate, internal search, cart, checkout, account, or filter-result pages as indexable without a deliberate strategy.
- Do not treat social tags as a substitute for search metadata, or vice versa.

## Escalation Criteria

Call out uncertainty when blocked by:

- missing production domain or canonical host
- unclear locale-to-market mapping
- conflicting indexing strategy across environments
- CMS fields that do not distinguish localized SEO data from shared content
- JavaScript-only rendering where crawler-visible HTML cannot be confirmed locally
