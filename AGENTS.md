# AGENTS.md

This file gives coding agents the minimum repo-specific context needed to work safely in this project.

## Quick Commands

```bash
npm run dev
npm run build
npm run type-check
npm run lint
npm run test
npm run validate
```

Use `npm run validate` before finishing broad changes.

## Stack

- Next.js 15 App Router
- React 19 + TypeScript 5
- Tailwind CSS v4
- Motion for animation
- Zustand for shared UI state
- Jest + React Testing Library

## Source Of Truth

- Routes and layouts: `src/app/`
- Main page shell: `src/app/(dashboard)/`
- Contributions API: `src/app/api/contributions/route.ts`
- Portfolio content: `src/data/`
- UI copy: `src/language/english.ts`
- Shared state: `src/stores/global-store.ts`
- Provider wiring: `src/providers/`
- Shared logic: `src/lib/`
- Global styles and theme tokens: `src/styles/`

## Working Rules

- Prefer server components by default. Add `'use client'` only when interactivity, browser APIs, or client state actually require it.
- Do not hardcode portfolio content or UI copy into components when it belongs in `src/data/` or `src/language/english.ts`.
- Use the `@/*` path alias for imports from `src`.
- Use `cn()` from `@/lib/utils` for conditional Tailwind class composition.
- Keep theme and skill-filter behavior aligned with the Zustand store instead of introducing duplicate local state.
- The GitHub contributions feature depends on `GITHUB_TOKEN`; changes around that path should preserve graceful failure behavior.
- Keep tests close to the code they cover when adding new unit-tested logic.

## Finish Checklist

- Run the smallest relevant checks while iterating; run `npm run validate` for cross-cutting changes.
- Do not overwrite unrelated local edits already present in the worktree.
