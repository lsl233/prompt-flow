# Multilingual SEO Reference

Use this file when the site serves more than one language, locale, or region.

## Core Rules

- Keep each locale URL stable and unique.
- Emit reciprocal `hreflang` links across alternates.
- Include a self-referencing `hreflang`.
- Match page intent across alternates; do not point one locale to a loosely related page.
- Keep canonical and `hreflang` strategy aligned.

## Locale Mapping

Confirm:

- language-only locales such as `en`
- language-region locales such as `en-US`, `zh-CN`, `pt-BR`
- fallback rules when translation is missing
- default-locale routing behavior

Flag bugs when:

- URLs use one locale code and metadata uses another
- content falls back silently to the wrong market language
- one locale is indexable but not linked in the alternate cluster
- localized slugs are inconsistent with router lookup

## Canonical and Hreflang

Use this default pattern for genuinely localized equivalents:

- each localized page canonicalizes to itself
- each localized page links all alternates including itself

Flag these cases:

- all locales canonicalize to the default locale
- `hreflang` points to redirected or non-indexable URLs
- missing `x-default` on global selector or catch-all page when the strategy calls for it
- alternate sets differ between pages that should be peers

## Copy and Metadata Localization

Require localization of:

- title
- meta description
- H1 and key headings
- body copy
- CTA labels
- image alt text when the surrounding page is localized

Do not mix:

- English metadata on non-English pages
- translated body copy with untranslated product/category slugs unless the URL strategy intentionally preserves the source slug
- localized page content with shared canonical pointing elsewhere

## Regional Nuance

Check region-specific details when relevant:

- currency
- units
- availability
- shipping or legal claims
- spelling variants
- contact information

These are SEO issues when they create mismatch between query intent, snippet text, and landing-page content.

## Translation Quality Red Flags

Flag:

- machine-translated titles that break meaning
- keyword stuffing added only in localized versions
- untranslated placeholders or variables
- duplicate descriptions reused across many locale pages
- mixed-language breadcrumbs, nav labels, or alt text
