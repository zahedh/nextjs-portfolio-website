# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@.claude/rules/conventions.md
@.claude/rules/testing-guide.md
@.claude/docs/animation-patterns.md
@.claude/docs/preferences.md

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

## AI Behaviour

- Ask clarifying questions when requirements are ambiguous — do not guess and proceed.
- Push back when a proposed approach has a better alternative. Explain why clearly.
- Gather enough context to act confidently before starting. One focused question beats five speculative ones.
- Do not add features, refactors, or abstractions beyond what was asked.
- Do not add comments that explain what the code does. See conventions for comment rules.
- Do not make a component a client component unless it meets the criteria in conventions.
- Do not run `git commit` unless explicitly asked. This applies to subagents too — never commit autonomously.

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
- `src/lib/ui-logic/` — Motion variants and viewport configs for animated sections
- `src/hooks/` — Custom hooks: `useDoubleActivation`, `useScrolled`, `skillTilePortalTooltip`, `overlayHooks`, `projectHooks`, `contributionsCalendarHooks`
- `.claude/skills/` — Project-level Claude Code skills bespoke to this repo

### Key Patterns

**Content updates**: Edit files in `src/data/` for projects/skills/experience, or `src/language/english.ts` for UI text.

**Styling**: Use `cn()` from `@/lib/utils` for conditional Tailwind classes. Theme colors are CSS variables defined in `theme.css`. Extract repeated or complex class combinations to `src/styles/components.css`.

**State**: The Zustand store in `src/stores/global-store.ts` is the single source of truth for theme, hero animation state, and the selected skill filter. The `selectedSkillId` drives the skill→project filtering — clicking a skill tile sets this, and the Projects section filters accordingly.

**Client vs Server**: Most components are server components. `'use client'` is used sparingly — see AI Behaviour and conventions for the rules.

**Double-activation pattern**: Skill tiles require a double-click (or double-tap on mobile) to trigger navigation. Implemented via `useDoubleActivation` in `src/hooks/useDoubleActivation.ts`, which gates a callback behind two activations within a configurable time window (default 400 ms).

**GitHub Contributions**: The calendar section fetches from `/api/contributions?year=YYYY`. The `GITHUB_TOKEN` env var is optional but prevents rate limiting.

**Analytics**: `@vercel/analytics` and `@vercel/speed-insights` are only injected when `VERCEL=1` is set (automatic on Vercel deployments).

**Tests**: Colocated with source (`utils.test.ts`, `dateUtils.test.ts`). Jest with jsdom and React Testing Library. Follow the testing guide above.

## Never Read

- .env files
- Any file containing "secret", "key", "token" in the name
- /ios/Pods
- /android/.gradle
