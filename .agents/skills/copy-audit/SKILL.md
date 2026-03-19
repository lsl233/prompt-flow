---
name: copy-audit
description: Audit and improve product copy across codebases and websites from SEO, product clarity, and user-experience perspectives. Use when Codex needs to review or fix user-facing copy such as page text, headings, button labels, helper text, error messages, empty states, HTML title and meta description, image alt or title text, navigation labels, form copy, onboarding text, and multilingual/localized content quality.
---

Audit the wording, not just the markup. Focus on whether the copy is clear, useful, specific, consistent, and appropriate for search intent and product context. Distinguish this skill from technical SEO work: do not optimize routing, canonical, sitemap, robots, or indexing logic here unless the wording itself is wrong.

## Quick Start

1. Identify where user-facing copy lives: source code, templates, CMS fields, translation files, metadata builders, image helpers.
2. Group pages or components by intent: acquisition, onboarding, conversion, support, account, empty/error/system states.
3. Review copy quality from three lenses: SEO intent, product clarity, UX clarity.
4. Fix reusable copy patterns first, then page-specific wording.
5. Flag decisions that need product, brand, legal, or localization input.

## Review Scope

Inspect all user-visible copy that affects comprehension, trust, conversion, or search snippets, including:

- page titles and meta descriptions
- H1/H2 and body copy
- CTA labels and link text
- navigation labels, breadcrumbs, tab names
- form labels, placeholders, helper text, validation, errors, success states
- onboarding steps, empty states, loading states, confirmations
- image `alt` and `title` text when present
- card titles, list-item summaries, badges, status labels
- multilingual strings and translation resources

Use `references/seo-copy.md` for search-facing wording, `references/product-ux-copy.md` for clarity and conversion, and `references/localization-copy.md` for multilingual consistency.

## Workflow

### 1. Map intent before editing

Identify what the user is trying to do on each page or component:

- discover via search
- understand an offer or feature
- compare options
- complete a task
- recover from an error
- continue after an empty or zero-data state

Do not rewrite copy until the task and audience are clear.

### 2. Audit search-facing copy

Check:

- page title clearly names the topic, entity, or offer
- meta description accurately previews the page and encourages the right click
- H1 aligns with the query intent and page promise
- body intro explains value quickly
- image alt text supports understanding without stuffing keywords

Prefer specificity over slogans. Remove vague claims that do not help the user decide.

### 3. Audit product clarity

Check whether the copy:

- explains what the feature or page does
- distinguishes primary and secondary actions
- uses consistent naming for product concepts
- avoids internal jargon and unexplained abbreviations
- states outcomes, constraints, and next steps where needed

### 4. Audit UX writing quality

Check whether the copy is:

- concise
- actionable
- contextual
- consistent in tone
- appropriate for the interaction state

Pay close attention to:

- button labels that hide the result of clicking
- placeholders used as labels
- error messages that do not say what happened or how to fix it
- empty states that describe absence but give no next action
- success messages that do not confirm what changed

### 5. Audit multilingual copy

When multiple languages exist:

- verify titles, descriptions, headings, body copy, CTAs, and alt text are localized consistently
- prevent mixed-language UI within the same flow unless explicitly intended
- keep terminology aligned across locale files and CMS fields
- preserve brand names and regulated wording according to existing source material

### 6. Fix systemically

Prefer shared fixes in:

- translation keys
- shared UI components
- metadata generation helpers
- CMS field mappings
- default empty/error/success state components

Avoid patching isolated strings if the same wording pattern appears elsewhere.

## Output

When reviewing, report findings in priority order with:

- issue
- why it matters for SEO, product understanding, or UX
- exact file or location
- improved wording or rewrite direction

When implementing, make the edits and summarize:

- what wording changed
- where the changes apply
- what still requires product or localization review

## Guardrails

- Do not keyword-stuff titles, descriptions, headings, anchors, or alt text.
- Do not replace clear product language with vague marketing language.
- Do not shorten copy so aggressively that instructions lose meaning.
- Do not translate brand names, legal copy, or regulated claims unless the source material already does so.
- Do not use placeholders as the primary way to communicate required input.
- Do not invent unsupported product promises, pricing claims, or feature behavior.

## Distinguish From SEO Audit

Use this skill for wording quality. Use `seo-audit` when the task is about technical SEO implementation such as canonical, robots, sitemap, hreflang wiring, structured data output, rendering/indexability, or URL mechanics.

## Escalation Criteria

Call out uncertainty when blocked by:

- unclear target audience or funnel stage
- missing brand voice guidance
- missing source-of-truth terminology
- conflicting translations across code and CMS
- legal or compliance-sensitive claims
- unclear search intent for a page group
