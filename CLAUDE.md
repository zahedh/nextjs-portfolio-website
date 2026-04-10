# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run type-check    # TypeScript validation
npm run lint          # ESLint
npm run prettier-format  # Format with Prettier
npm run test          # Jest (run a single test file: npm test -- path/to/file.test.ts)
npm run validate      # Full check: type-check + lint + prettier + test
```

## Architecture

**Next.js 15 App Router** portfolio site using React 19, TypeScript 5, and Tailwind CSS v4.

### Structure

- `src/app/(dashboard)/` — Route group containing the home page (`/`) and `/privacy`
- `src/app/api/contributions/` — API route handler for GitHub contributions calendar (requires `GITHUB_TOKEN` env var)
- `src/components/ui/sections/` — Top-level page sections: Hero, Skills, Projects, About, Experience, Contributions
- `src/data/` — All site content as hardcoded TypeScript: `projects.ts`, `skills.ts`, `experience.ts`, `about.ts`
- `src/language/english.ts` — Centralized UI copy (translation-ready; all user-facing strings live here)
- `src/stores/global-store.ts` — Zustand store: `isDark` (theme), `heroAnimationComplete`, `selectedSkillId`
- `src/providers/` — Zustand + React context wrapper used in root layout
- `src/styles/` — `theme.css` (CSS vars for colors), `utilities.css`, `components.css`, imported via `index.css`
- `src/lib/utils/utils.ts` — `cn()` (clsx + tailwind-merge), scroll helpers, skill-project matching logic

### Key Patterns

**Content updates**: Edit files in `src/data/` for projects/skills/experience, or `src/language/english.ts` for UI text.

**Styling**: Use `cn()` from `src/lib/utils/utils.ts` for conditional Tailwind classes. Theme colors are CSS variables defined in `theme.css`.

**State**: The Zustand store in `src/stores/global-store.ts` is the single source of truth for theme, hero animation state, and the selected skill filter. The `selectedSkillId` drives the skill→project filtering — clicking a skill tile sets this, and the Projects section filters accordingly.

**Client vs Server**: Most components are server components. `'use client'` is used sparingly for interactive elements (theme toggle, navigation menu, animated sections, Swiper carousel).

**GitHub Contributions**: The calendar section fetches from `/api/contributions?year=YYYY`. The `GITHUB_TOKEN` env var is optional but prevents rate limiting.

**Analytics**: `@vercel/analytics` and `@vercel/speed-insights` are only injected when `VERCEL=1` is set (automatic on Vercel deployments).

**Tests**: Colocated with source (`utils.test.ts`, `dateUtils.test.ts`). Jest with jsdom and React Testing Library.
