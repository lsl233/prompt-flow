# Web Extension - CLAUDE.md

Browser extension built with WXT framework and React. Targets Chrome and Firefox with Manifest V3.

## Common Commands

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
```

## WXT Development Guidelines

### Correct API Usage

- **Content Script UI**: Always use `createShadowRootUi` from `wxt/utils/content-script-ui/shadow-root`
  - ⚠️ Never use `createContentScriptUi` in background script context
  - Shadow DOM provides proper style isolation

- **Permission Handling**: Remember that permission request dialogs destroy the popup
  - Handle permission flows with proper state management
  - Use background script for permission requests that need to survive popup closure

- **Always verify against WXT documentation**: https://wxt.dev/

### Entrypoints

WXT auto-discovers entrypoints from `entrypoints/`:

| Entrypoint | File/Folder | Purpose |
|------------|-------------|---------|
| Background | `background.ts` | Service worker - persistent logic |
| Content Script | `content/` | Injected into web pages |
| Options Page | `options/` | Full-page settings UI |
| Popup | `popup/` | Extension popup UI |

### Content Script Patterns

```typescript
import { createShadowRootUi } from 'wxt/utils/content-script-ui/shadow-root';

export default defineContentScript({
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'my-ui',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Render React component
        const root = ReactDOM.createRoot(container);
        root.render(<MyComponent />);
      },
    });
    ui.mount();
  }
});
```

## Architecture

### State Management

Options page uses centralized store (`useStore.ts`):
- `browser.storage.local` for persistence
- React state for UI reactivity
- Auto-save on changes
- Theme persistence across sessions

### Component Reuse

Before creating new components, check for existing ones in:
- `shared/components/` - Cross-entrypoint shared components
  - `PromptPicker.tsx` - Prompt selection UI
  - `Toast.tsx` - Notification system
- `entrypoints/options/components/` - Options page specific
  - `Modals/` - Modal dialogs

### Styling

- **Content Scripts**: Use `pf-` prefixed utility classes (`content/content-styles.css`)
- **Options/Popup**: Standard Tailwind CSS v4 with `@custom-variant dark`
- **Shadow DOM**: CSS automatically injected, isolated from host page

## Internationalization (i18n)

Extension supports 3 languages via Chrome Extension i18n API:

- **Languages**: English (`en`), Simplified Chinese (`zh_CN`), Traditional Chinese (`zh_TW`)
- **Files**: `public/_locales/<lang>/messages.json`

### Usage

```typescript
// In React
const { t } = useI18n();
<button>{t('saveButton')}</button>

// With placeholders
const message = t('welcomeMessage', [userName]);

// In Content Scripts
import { t } from '@/shared/i18n';
console.log(t('prompt'));
```

**Rule**: All UI text must use i18n keys. Add new keys to all 3 `messages.json` files.

## Path Aliases

```typescript
// Use path aliases instead of relative paths
import { Prompt } from '@/shared/types';
import PromptPicker from '@/shared/components/PromptPicker';
import { useStore } from '@/entrypoints/options/useStore';
```

Configured in `tsconfig.json` and `wxt.config.ts`:
- `@/*` - Maps to project root
- `@/shared/*` - Shared code
- `@/entrypoints/*` - Entrypoint code

## Post-Implementation Verification

Extension-specific checks:

- [ ] **WXT patterns correct**: `createShadowRootUi` used properly
- [ ] **i18n complete**: All strings wrapped with `t()`, all 3 language files updated
- [ ] **Content Script isolation**: Styles properly scoped with `pf-` prefix
- [ ] **Provider wrapping**: Content Script components wrapped with `I18nProvider`
- [ ] **Browser compatibility**: Test in both Chrome and Firefox if possible
