# Web App - CLAUDE.md

Next.js web application built with modern React patterns.

## Common Commands

```bash
# Development
pnpm dev              # Start development server

# Building
pnpm build            # Build for production

# Production
pnpm start            # Start production server

# Linting
pnpm lint             # Run ESLint
```

## Architecture

### Framework

- **Next.js 15+** with App Router
- **React 19+** with Server Components by default
- **TypeScript** for type safety

### Styling

- **Tailwind CSS v4** for styling
- **CSS Variables** for theming (see Theme System below)
- Check `app/globals.css` for theme configuration

### Path Aliases

```typescript
// Use path aliases
import { Button } from '@/components/Button';
import { cn } from '@ui/lib/utils';
```

Standard Next.js `@/*` alias maps to project root.

## Theme System

The app uses a dual-theme system (Dark/Light) powered by `next-themes`.

### Theme Configuration

**Location**: `app/[locale]/globals.css`

CSS variables are used for all theme-aware colors:

```css
/* Dark theme (default) */
--color-bg-primary: #0a0a0b;
--color-bg-secondary: #121214;
--color-bg-tertiary: #1a1a1e;
--color-bg-elevated: #222228;

--color-accent-primary: #00d4aa;
--color-accent-secondary: #00b4d8;
--color-accent-glow: rgba(0, 212, 170, 0.15);

--color-text-primary: #fafafa;
--color-text-secondary: #a1a1aa;
--color-text-tertiary: #71717a;

--color-border-subtle: rgba(255, 255, 255, 0.06);
--color-border-strong: rgba(255, 255, 255, 0.12);
```

### Using Theme Variables

Always use CSS variables instead of hardcoded colors:

```tsx
// ✅ Correct
<div className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">

// ❌ Incorrect
<div className="bg-[#121214] text-white">
```

### Theme Components

- **ThemeProvider**: Wraps the app in `layout.tsx`
- **ThemeSwitcher**: Button to toggle themes (sun/moon icons)

### Theme Guidelines

- Default theme is **dark**
- Always test both themes when adding new UI
- Avoid `suppressHydrationWarning` on non-theme elements

## UI Design System

### Aesthetic Direction: "Developer-Tool Precision"

A dark-first, functional aesthetic inspired by code editors and modern developer tools (Raycast, Linear).

### Typography

- **Display**: Plus Jakarta Sans (clean, modern)
- **Mono**: JetBrains Mono (technical feel)

```css
--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Color Palette

| Purpose | Dark | Light |
|---------|------|-------|
| Background | `#0a0a0b` | `#ffffff` |
| Surface | `#121214` | `#f8f9fa` |
| Primary Accent | `#00d4aa` | `#0d9488` |
| Secondary Accent | `#00b4d8` | `#0891b2` |
| Text Primary | `#fafafa` | `#111827` |
| Text Secondary | `#a1a1aa` | `#4b5563` |

### Common CSS Classes

#### Layout
```css
/* Section spacing */
section { @apply py-24 lg:py-32; }

/* Container */
.container-narrow { @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8; }
```

#### Cards
```css
/* Spotlight border card (hover effect) */
.spotlight-border

/* Elevated card with hover lift */
.card-lift

/* Standard card background */
bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]
```

#### Buttons
```css
/* Primary CTA with glow effect */
.btn-glow

/* Secondary outline */
border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)]
```

#### Text
```css
/* Gradient accent text */
.gradient-text

/* Mono text */
.font-mono
```

### Visual Effects

- **Spotlight borders**: Cards have subtle radial gradient on hover
- **Grid pattern**: Background uses CSS grid pattern
- **Glow effects**: Primary buttons have glow on hover
- **Section dividers**: Gradient line between sections

## Development Guidelines

### Component Patterns

- Prefer Server Components by default
- Use `'use client'` directive only when needed (hooks, browser APIs, theme)
- Place shared components in `components/` directory
- Place page-specific components in `app/<route>/_components/`

### Client Component Boundaries

The following require `'use client'`:
- Theme-related components (useTheme hook)
- Interactive elements with state
- Components using browser APIs (localStorage, etc.)

### Data Fetching

```typescript
// Server Component - async/await
async function Page() {
  const data = await fetch('/api/data');
  return <div>{data}</div>;
}

// Client Component - use hooks
'use client';
function ClientComponent() {
  const { data } = useSWR('/api/data', fetcher);
  return <div>{data}</div>;
}
```

### Reuse Before Create

Before creating new components, check:
- `components/` - Shared UI components
- `app/_components/` - App-level shared components
- `lib/` - Utility functions and hooks

## Post-Implementation Verification

- [ ] **TypeScript compilation passes**: `pnpm compile`
- [ ] **No hydration mismatches**: Check Server/Client component boundaries
- [ ] **Build succeeds**: `pnpm build` completes without errors
- [ ] **Both themes work**: Test dark and light mode
- [ ] **i18n strings complete**: All three language files updated

## Localization

### i18n Setup

The app uses `next-intl` for internationalization:
- **Messages**: `messages/en.json`, `messages/zh.json`, `messages/zh-Hant.json`
- **Routing**: `i18n/routing.ts` configures supported locales
- **Namespaces**: Use dot notation `t("home.hero.title")`

### Message Structure

```json
{
  "metadata": { "title": "...", "description": "..." },
  "nav": { "brand": "...", "features": "..." },
  "home": {
    "hero": { "title": "...", "cta": "..." }
  }
}
```

### Multi-language Images

Use the `LocaleImage` component for images that need locale-specific versions:

```tsx
import { LocaleImage } from "@/components/LocaleImage";

<LocaleImage
  name="hero"           // Base filename
  alt={t("screenshotAlt")}
  fill                  // or width/height for fixed size
  className="object-cover"
  priority              // Optional: for above-the-fold images
/>
```

**File Naming Convention**:
```
public/screen-short/
├── hero.en.png       # English version (default)
├── hero.zh.png       # Chinese version
├── demo.en.png
└── demo.zh.png
```

**Behavior**:
- Automatically detects current locale via `getLocale()`
- Falls back to `en` version if locale-specific image doesn't exist
- Server Component only (uses `fs.existsSync` for file checking)
- SEO-friendly: correct image path is rendered in static HTML per locale

## Project Structure

```
app/[locale]/
├── _components/      # Shared locale components (Navbar, Footer, etc.)
├── community/        # Community page
├── globals.css       # Theme styles
├── layout.tsx        # Locale layout with ThemeProvider
└── page.tsx          # Home page

components/           # Shared components
├── Button.tsx
├── ImportButton.tsx
├── LocaleImage.tsx
├── ThemeProvider.tsx
└── ThemeSwitcher.tsx

lib/                  # Utilities
├── community-prompts.ts
└── utils.ts

types/                # TypeScript types
└── prompt.ts

messages/             # i18n translations
├── en.json
├── zh.json
└── zh-Hant.json
```
