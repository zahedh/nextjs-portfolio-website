# AGENTS.md

This file provides guidance to Codex and other agents when working with code in this repository.

## Project Overview

**portfolio-site** — personal portfolio site (Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS v4), designed in Figma and implemented with Claude Code. Full brief, stack, engineering standard, and project-specific rules live in `.context/projects/portfolio-site.md` — read that before working in this repo.

Engineering standard: Next.js / React, **Showcase** tier. `.context/engineering/tiers.md` owns what that obliges; `.context/engineering/nextjs-react.md` owns how it is evidenced in this stack.

## Running locally

```bash
npm run dev           # Development server
npm run build         # Production build
npm run validate      # Full checkpoint: type-check + lint + prettier-check + test
```

`npm run validate` is the per-task checkpoint, not `git diff --check`. `GITHUB_TOKEN` is optional; without it the contributions API is rate-limited.

## Role division

Full rule and rationale live in `.context/tool-guidance/agent-roles.md` — read that file; this section is only the repo-local mechanics.

- Claude Code plans, researches, and reviews. Codex executes numbered tasks.
- Execution tasks are briefed under `docs/briefs/`; each brief names its source task, files, constraints, and verification commands. The brief and ledger shapes, and the handoff procedure, come from the `claude-codex-handoff` skill.
- `docs/README.md` is the documentation standard pointer — read it before creating any document under `docs/`. `docs/` is gitignored at this tier, so archive rather than delete and date brief filenames.
- After each dispatch, append to `docs/progress.md`: status, files changed, and the validation result.
- British English throughout. Never stage, commit, push, or run destructive git commands.

## Small fixes

The small-fix workflow override in `.context/AGENTS.md` applies to scoped bug fixes and review follow-ups. Here that means: inspect and establish the root cause → propose the fix once → patch → run focused checks → run `npm run validate` once. Do not create a brief, design specification, implementation plan, worktree, or branch for these fixes.

## Architecture

### Structure

- `src/app/(dashboard)/` — Route group containing the home page (`/`) and `/privacy`
- `src/app/api/contributions/` — Route handler for the GitHub contributions calendar
- `src/components/ui/sections/` — Top-level page sections: Hero, Skills, Projects, About, Experience, Contributions
- `src/data/` — Site content as typed TypeScript: `projects.ts`, `skills.ts`, `experience.ts`, `about.ts`
- `src/language/english.ts` — All user-facing copy (translation-ready)
- `src/stores/global-store.ts` — Zustand store: `isDark`, `heroAnimationComplete`, `selectedSkillId`
- `src/providers/` — Zustand + React context wrapper used in the root layout
- `src/styles/` — `theme.css` (colour CSS variables), `utilities.css`, `components.css`, imported via `index.css`
- `src/lib/utils/utils.ts` — `cn()`, scroll helpers, skill-project matching
- `src/lib/ui-logic/` — Motion variants and viewport configs
- `src/hooks/` — `useDoubleActivation`, `useScrolled`, `skillTilePortalTooltip`, `overlayHooks`, `projectHooks`, `contributionsCalendarHooks`
- `.claude/rules/project-conventions.md` — repo-local conventions the hub does not cover
- `.claude/skills/` — project-level skills bespoke to this repo

This layout predates `.context/engineering/nextjs-react.md` and diverges from it (top-level `hooks/`, `stores/`, `providers/`, `data/`, and `src/language/` rather than `src/lib/language/`). The divergence is a declared exception in `.context/projects/portfolio-site.md`, not licence to add more top-level folders. Do not migrate it as a drive-by; that is its own dispatch.

### Key patterns

**Content updates** — edit `src/data/` for projects, skills, and experience; `src/language/english.ts` for UI text.

**State** — the Zustand store is the single source of truth for theme, hero animation state, and the selected skill filter. `selectedSkillId` drives skill → project filtering: a skill tile sets it, the Projects section filters on it.

**Client vs server** — most components are server components. `'use client'` goes at the smallest interactive leaf, and only for the reasons listed in `.claude/rules/project-conventions.md`.

**Double activation** — skill tiles need a double-click or double-tap to navigate, gated by `useDoubleActivation` (default 400 ms window).

**Contributions** — the calendar fetches `/api/contributions?year=YYYY`.

**Analytics** — `@vercel/analytics` and `@vercel/speed-insights` are injected only when `VERCEL=1`.

## Never read

- `.env` files
- Any file with "secret", "key", or "token" in the name

---

## Personal context

The user's private context hub is mounted at `.context/` (gitignored).
Read `.context/AGENTS.md` first on every task; it routes to the rest.
