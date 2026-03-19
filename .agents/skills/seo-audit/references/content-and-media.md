# Content, URL, and Media Reference

Use this file when reviewing page copy, slugs, image usage, or information architecture.

## URL Structure

Prefer URLs that are:

- short enough to read and share
- descriptive of page intent
- lowercase
- hyphen-separated
- free of dates or volatile IDs unless required by product logic

Flag:

- uppercase variants that create duplicates
- mixed underscore and hyphen styles
- translated pages sharing unreadable slug fragments from another language without a deliberate policy
- excessive nesting with little semantic value
- unnecessary query parameters on canonical URLs

## Slug Strategy

Choose one policy and keep it consistent:

- preserve source-language slugs for all locales
- localize slugs by locale

Both can work. The bug is inconsistency, collisions, or broken alternate mapping.

## Copy Quality

Check:

- page title clearly names the entity or topic
- H1 matches user intent without stuffing
- intro copy explains the page value quickly
- repeated boilerplate does not dominate unique content
- anchor text is specific

Flag:

- near-duplicate copy across template-generated pages
- placeholders or CMS fallbacks exposed to users
- category or tag pages with no unique explanatory text
- generic anchors like "click here" without context

## Images

Check:

- informative images have useful alt text tied to page context
- decorative images use empty alt text
- filenames are sensible when directly public
- dimensions are declared when the framework supports it
- important images are not hidden from crawlers behind scripts or CSS-only backgrounds when semantic `<img>` content is expected

Avoid:

- repeating the exact page title in every alt attribute
- stuffing keywords into alt text
- using image text instead of real HTML headings or body copy

## Social Preview Coverage

For shareable pages, check:

- default OG/Twitter image exists
- major templates can override image/title/description
- image aspect ratio is suitable for previews
- locale-specific previews exist when the page is localized

## Internal Architecture

Check:

- breadcrumb depth matches URL depth where appropriate
- hub pages link to child pages
- child pages link back to relevant hubs
- related-content modules reinforce topical clusters

Flag orphan pages even when they exist in the sitemap. Sitemaps do not replace internal links.
