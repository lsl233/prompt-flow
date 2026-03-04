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

## Project Structure

```
apps/web-extension/
├── entrypoints/          # WXT entrypoints (auto-discovered)
│   ├── background.ts     # Service worker
│   ├── content.ts        # Content script
│   ├── content/          # Content script components
│   │   └── ContentFloatingPopup.tsx
│   ├── options/          # Options page
│   │   ├── App.tsx
│   │   ├── useStore.ts   # Main state management
│   │   └── components/
│   └── popup/            # Popup UI (React app)
│       ├── index.html
│       ├── main.tsx
│       └── App.tsx
├── shared/               # Shared code between entrypoints
│   ├── components/       # Shared React components
│   │   └── PromptPicker.tsx
│   ├── hooks/            # Shared hooks
│   ├── utils/            # Utility functions
│   └── types.ts          # Shared TypeScript types
├── assets/               # Static assets imported in code
├── public/               # Static files copied to output
├── wxt.config.ts         # WXT configuration
└── tsconfig.json         # TypeScript config with path aliases
```

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

## Recent Refactoring (2026-03-04)

1. **Created `shared/` directory** - For code shared between options, content, and popup
2. **Extracted `PromptPicker` component** - Shared between FloatingPopup (options) and ContentFloatingPopup (content script)
3. **Added path aliases** - Simplified imports across the codebase
4. **Fixed Content Script styles** - Now using WXT's proper Shadow DOM handling
5. **Theme persistence** - Dark/light mode now saves to storage
6. **Tags selector improvement** - Dropdown with filtering and keyboard navigation
7. **Save as New Prompt** - VariableFillerModal can save filled prompts

## Important File Locations

- `pnpm-workspace.yaml` - Workspace configuration
- `apps/web-extension/wxt.config.ts` - Extension build config
- `apps/web-extension/package.json` - Extension dependencies and scripts
- `apps/web-extension/shared/types.ts` - Shared TypeScript types
- `apps/web-extension/shared/components/` - Shared React components
- `apps/web-extension/entrypoints/options/useStore.ts` - Main state management
