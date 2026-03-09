---
name: verify
description: Run post-implementation verification checklist
---

Verify the recent changes by:
1. Run TypeScript compilation: `npm run type-check` or `tsc --noEmit`
2. Check for i18n: ensure all user-facing strings use t()
3. Check for context providers: verify components are wrapped with needed providers
4. For extension work: test in browser, check WXT patterns
5. Run lint: `npm run lint`

Report any issues found with specific file paths and fix suggestions.