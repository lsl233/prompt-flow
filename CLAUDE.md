# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A pnpm monorepo containing multiple applications built with modern web technologies.

- **Package Manager**: pnpm (workspace enabled)
- **Monorepo Structure**: `apps/` for applications, `packages/` for shared utilities
- **Applications**:
  - `apps/web-extension` - Cross-browser extension (Chrome/Firefox) built with WXT and React. [Details](apps/web-extension/CLAUDE.md)
  - `apps/web` - Next.js web application. [Details](apps/web/CLAUDE.md)
- **Shared Packages**:
  - `packages/ui` - Shared UI components and Tailwind CSS configuration

## First Principles

### 1. Understand Before Implementing
- **Do not start implementing before fully understanding the user's intent and project conventions**
- When user provides a specific implementation plan or references a specific component/file, follow it exactly
- Do not explore alternative approaches or start implementing before confirming understanding
- Ask for clarification if requirements are ambiguous

### 2. Prefer Simple Solutions
- **Implement the minimal viable solution first**
- Avoid proposing complex alternatives (CSS-in-JS, Tailwind config changes, new dependencies) when simple approaches work
- Do not build full settings pages for simple configuration changes
- Reject unnecessary abstractions and premature generalization

### 3. Reuse Existing Components
- **Always search for and reuse existing components and hooks before writing new code**
- Look in `packages/ui/src/components/`, `shared/components/`, `shared/hooks/`, and app-specific component directories
- Present findings and get confirmation before writing new components

## Common Commands

All commands should be run from the repository root:

```bash
# Install dependencies
pnpm install

# Type Checking (all packages)
pnpm compile

# Run commands in a specific app
pnpm --filter web-extension <command>
pnpm --filter web <command>

# Add dependency to specific app
pnpm --filter web-extension add <package>
```

## Post-Implementation Verification

After any multi-file implementation, verify:

- [ ] **TypeScript compilation passes**: Run `pnpm compile`
- [ ] **No runtime errors from missing providers/context**: Check component tree
- [ ] **All new strings are i18n wrapped**: Use `t()` function for all user-facing text
- [ ] **No over-engineering**: Review for unnecessary abstractions
- [ ] **Component reuse verified**: Confirm no duplicate existing components

## Shared UI Package (`packages/ui`)

The `@prompt-flow/ui` package provides shared Tailwind CSS configuration and reusable UI components.

### Tailwind CSS Configuration

**Location**: `packages/ui/src/styles/tailwind-base.css`

Shared configuration includes:
- **Fonts**: Inter (sans), JetBrains Mono (mono)
- **Dark Mode**: `@custom-variant dark` (class-based)
- **Utilities**: `scrollbar-hide`
- **Animations**: `fade-in`, `zoom-in-95`, `slide-in-from-top-4`, `.animate-in`, `.duration-*`

### Usage in Applications

**web-extension** (`apps/web-extension/shared/style.css`):
```css
@import "@ui/styles/tailwind-base.css";
```
Vite alias configured in `wxt.config.ts`.

**web** (`apps/web/app/[locale]/globals.css`):
```css
@import "../../../../packages/ui/src/styles/tailwind-base.css";
```
Uses relative path (Turbopack alias limitation with PostCSS).

### Adding Shared Components

Place shared components in `packages/ui/src/components/` and export from `index.ts`:

```typescript
// packages/ui/src/components/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-500">{children}</button>;
}

// packages/ui/src/components/index.ts
export { Button } from './Button';
```

## Adding Shared Packages

To add a shared package in `packages/`:

1. Create directory: `mkdir packages/<name>`
2. Initialize: `cd packages/<name> && pnpm init`
3. Configure `package.json` with proper name: `@prompt-flow/<name>`
4. Reference in apps: `pnpm --filter <app> add @prompt-flow/<name>`

## TODO Management

This project uses a custom `/todo-manager` skill for task tracking:

- **Add TODO**: `/todo-manager 增加待办事项：描述`
- **Complete TODO**: `/todo-manager 完成第N个TODO`
- **View TODOs**: Read `TODO.md` file

Always check `TODO.md` before starting work to understand current priorities.
