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
- Check `app/globals.css` for theme configuration

### Path Aliases

```typescript
// Use path aliases
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
```

Standard Next.js `@/*` alias maps to project root.

## Development Guidelines

### Component Patterns

- Prefer Server Components by default
- Use `'use client'` directive only when needed (hooks, browser APIs)
- Place shared components in `components/` directory
- Place page-specific components in `app/<route>/_components/`

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
