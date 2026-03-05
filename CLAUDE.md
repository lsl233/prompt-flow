# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A pnpm monorepo containing a browser extension built with WXT and React.

- **Package Manager**: pnpm (workspace enabled)
- **Monorepo Structure**: `apps/` for applications, `packages/` for shared utilities
- **Main Application**: `apps/web-extension` - Cross-browser extension (Chrome/Firefox)

## Common Commands

All commands should be run from the repository root:

```bash
# Development
pnpm dev              # Start dev mode (Chrome)
pnpm dev:firefox      # Start dev mode (Firefox)

# Building
pnpm build            # Build for production (Chrome)
pnpm build:firefox    # Build for production (Firefox)

# Packaging
pnpm zip              # Create distribution zip (Chrome)
pnpm zip:firefox      # Create distribution zip (Firefox)

# Type Checking
pnpm compile          # Run TypeScript check (tsc --noEmit)

# Install dependencies
pnpm install          # Installs all workspace dependencies
```

To run commands in a specific package:
```bash
pnpm --filter web-extension <command>
```

## Architecture

### WXT Framework

The extension uses [WXT](https://wxt.dev/) as the build framework:
- Entrypoints are auto-discovered from `apps/web-extension/entrypoints/`
- Each entrypoint type has specific conventions:
  - `background.ts` - Service worker
  - `content.ts` - Content script
  - `content/` - Content script components and styles
  - `options/` - Options page (full-page settings UI)
  - `popup/` - Popup UI (React app with index.html)

### Browser Support

WXT abstracts browser differences. The same codebase targets both Chrome and Firefox:
- Use `wxt -b firefox` for Firefox-specific builds
- Manifest V3 is used for both browsers (WXT handles compatibility)

### React Integration

- React is configured via `@wxt-dev/module-react`
- Popup UI is a standard React app at `entrypoints/popup/`
- Use the standard React hooks and patterns

## Adding Shared Packages

To add a shared package in `packages/`:

1. Create directory: `mkdir packages/<name>`
2. Initialize: `cd packages/<name> && pnpm init`
3. Add to workspace: already configured via `pnpm-workspace.yaml`
4. Reference in apps: `pnpm --filter web-extension add @prompt-flow/<name>`

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of relative paths like:
import { Prompt } from '../../../shared/types';

// Use path aliases:
import { Prompt } from '@/shared/types';
import PromptPicker from '@/shared/components/PromptPicker';
```

Configured in `tsconfig.json` and `wxt.config.ts`:
- `@/*` - Maps to project root
- `@/shared/*` - Shared code
- `@/entrypoints/*` - Entrypoint code

## State Management

The options page uses a centralized store (`useStore.ts`) with:
- `browser.storage.local` for persistence
- React state for UI reactivity
- Auto-save on changes
- Theme persistence across sessions

## Content Script Styling

Content scripts use Shadow DOM for style isolation:

```typescript
// Uses WXT's createShadowRootUi helper
import { createShadowRootUi } from 'wxt/utils/content-script-ui/shadow-root';

export default defineContentScript({
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      // ... configuration
    });
    ui.mount();
  }
});
```

CSS is automatically injected into the Shadow DOM. The content script uses `pf-` prefixed utility classes (in `content/content-styles.css`) to avoid conflicts with host page styles.

## Internationalization (i18n)

The extension supports multiple languages using Chrome Extension's i18n API:

- **Supported Languages**: English (`en`), Simplified Chinese (`zh_CN`), Traditional Chinese (`zh_TW`)
- **Translation Files**: Located in `public/_locales/<lang>/messages.json`
- **Usage in React**: `const { t } = useI18n()` from `@/shared/i18n`
- **Usage in Content Scripts**: Direct `t()` function from `@/shared/i18n`

All UI text must use i18n keys instead of hardcoded strings. When adding new text:
1. Add the key to all `messages.json` files
2. Use `t('keyName')` or `t('keyName', [substitution1, substitution2])` for placeholders

## Project Structure (Updated)

```
apps/web-extension/
├── entrypoints/          # WXT entrypoints (auto-discovered)
│   ├── background.ts     # Service worker
│   ├── content/          # Content script
│   │   ├── index.tsx     # Content script entry
│   │   └── ContentFloatingPopup.tsx
│   ├── options/          # Options page
│   │   ├── App.tsx
│   │   ├── useStore.ts   # Main state management
│   │   └── components/
│   │       └── Modals/   # Modal components
│   └── popup/            # Popup UI
├── shared/               # Shared code
│   ├── components/       # Shared React components
│   │   ├── PromptPicker.tsx
│   │   └── Toast.tsx
│   ├── i18n/             # i18n utilities
│   │   └── index.tsx     # I18nProvider and useI18n hook
│   ├── types.ts          # Shared TypeScript types
│   └── style.css         # Shared styles
├── public/_locales/      # Translation files
│   ├── en/messages.json
│   ├── zh_CN/messages.json
│   └── zh_TW/messages.json
└── wxt.config.ts
```

## Recent Refactoring (2026-03-05)

1. **Multi-language Support (i18n)** - Full internationalization with 3 languages
   - `I18nProvider` wraps all entry points (options, popup, content)
   - `useI18n()` hook for React components
   - `t()` function for non-React contexts
   - Browser language auto-detection with manual override
2. **Created `shared/` directory** - For code shared between options, content, and popup
3. **Extracted `PromptPicker` component** - Shared between FloatingPopup (options) and ContentFloatingPopup (content script)
4. **Added path aliases** - Simplified imports across the codebase
5. **Fixed Content Script styles** - Now using WXT's proper Shadow DOM handling
6. **Theme persistence** - Dark/light mode now saves to storage
7. **Tags selector improvement** - Dropdown with filtering and keyboard navigation
8. **Save as New Prompt** - VariableFillerModal can save filled prompts
9. **Content Script interactions** - Click outside to close popup, Toast notifications for copy/insert
10. **Created `Toast` component** - Reusable toast notification in `shared/components/`

## Important File Locations

- `pnpm-workspace.yaml` - Workspace configuration
- `apps/web-extension/wxt.config.ts` - Extension build config
- `apps/web-extension/package.json` - Extension dependencies and scripts
- `apps/web-extension/shared/types.ts` - Shared TypeScript types
- `apps/web-extension/shared/components/` - Shared React components
- `apps/web-extension/shared/i18n/index.tsx` - i18n Provider and hooks
- `apps/web-extension/public/_locales/` - Translation files
- `apps/web-extension/entrypoints/options/useStore.ts` - Main state management
