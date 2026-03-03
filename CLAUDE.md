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
│   └── popup/            # Popup React app
│       ├── index.html
│       ├── main.tsx
│       └── App.tsx
├── assets/               # Static assets imported in code
├── public/               # Static files copied to output
└── wxt.config.ts         # WXT configuration
```

## Adding Shared Packages

To add a shared package in `packages/`:

1. Create directory: `mkdir packages/<name>`
2. Initialize: `cd packages/<name> && pnpm init`
3. Add to workspace: already configured via `pnpm-workspace.yaml`
4. Reference in apps: `pnpm --filter web-extension add @prompt-flow/<name>`

## Important File Locations

- `pnpm-workspace.yaml` - Workspace configuration
- `apps/web-extension/wxt.config.ts` - Extension build config
- `apps/web-extension/package.json` - Extension dependencies and scripts
