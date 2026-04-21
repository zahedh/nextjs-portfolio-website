# Documentation Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a complete, non-redundant documentation and configuration structure that covers AI behaviour rules, coding conventions, testing practices, animation patterns, and project-level skills scaffolding.

**Architecture:** CLAUDE.md is the entry point — it stays lean and references deeper docs via `@` imports. Three focused rule/reference docs live in `.claude/rules/` and `.claude/docs/`. AGENTS.md is deleted as fully redundant. A `.claude/skills/` folder is scaffolded for future project-specific skills.

**Tech Stack:** Markdown, Claude Code `@` import syntax, `.claude/` directory conventions.

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Modify | `CLAUDE.md` | Add behaviour rules, comment rules, client component rules, import conventions, readability principle, `@` imports to sub-docs |
| Delete | `AGENTS.md` | Fully covered by CLAUDE.md |
| Create | `.claude/rules/conventions.md` | Code + styling conventions: imports, component structure, logic outsourcing, Tailwind lean classes |
| Create | `.claude/rules/testing-guide.md` | GWT/AAA format, what to test, worked example, no `require()` |
| Create | `.claude/docs/animation-patterns.md` | Motion variants, `ui-logic/` structure, how components consume variants |
| Create | `.claude/skills/.gitkeep` | Scaffold the skills folder |

---

## Task 1: Delete AGENTS.md

**Files:**
- Delete: `AGENTS.md`

- [ ] **Step 1: Confirm AGENTS.md is fully covered**

All rules in `AGENTS.md` exist in `CLAUDE.md`:
- Commands ✓ (Commands section)
- Stack ✓ (Architecture section)
- Source of truth ✓ (Structure section)
- `@/*` alias, `cn()`, server-first, content in `src/data/` ✓ (Key Patterns / to be added)

- [ ] **Step 2: Delete the file**

```bash
rm AGENTS.md
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove AGENTS.md (fully covered by CLAUDE.md)"
```

---

## Task 2: Create `.claude/rules/conventions.md`

**Files:**
- Create: `.claude/rules/conventions.md`

- [ ] **Step 1: Create the file**

```markdown
# Coding & Styling Conventions

## Imports

- Always use the `@/*` path alias for imports from `src/`. Never use relative paths that traverse more than one level.
- Use ES module `import` syntax only. Never use `require()`.
- Order: external packages → internal `@/*` imports → relative imports → type imports.

## Component Structure

Components should follow this internal order:

1. Types / props interface (exported if consumed externally)
2. Component function
3. Internal sub-components (if small and tightly coupled)

Keep UI files thin. If a component contains logic beyond simple conditional rendering or a single derived value, extract it:
- Data transforms and filtering → `src/lib/utils/`
- Side effects and DOM interaction → `src/hooks/`
- Motion configuration → `src/lib/ui-logic/`

## Client Components

Default to server components. Add `'use client'` only when the component directly uses:
- Browser APIs (`window`, `document`, `localStorage`)
- React hooks that require client context (`useState`, `useEffect`, `useRef`, etc.)
- Event handlers that cannot be passed as props from a server parent
- Zustand store reads/writes

Do not create a client wrapper just to avoid prop drilling — solve that with composition.

## Comments

JSDoc prop descriptions on exported components only:

```tsx
/**
 * @param label - Button text
 * @param onClick - Click handler
 */
export function Button({ label, onClick }: ButtonProps) {
```

No inline comments explaining what the code does. If a non-obvious constraint or workaround exists, one short comment explaining *why* is acceptable. No multi-line comment blocks.

## Styling

Use `cn()` from `@/lib/utils` for conditional class composition.

Keep Tailwind class lists lean. When a class combination is repeated across components or exceeds ~5 utility classes for a single visual purpose, extract it to `src/styles/components.css` or `src/styles/utilities.css`.

```tsx
// Avoid: className="flex items-center justify-between px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium"
// Prefer: className={cn('card-row', isActive && 'card-row--active')}
// Where .card-row is defined in components.css
```

Theme colors must come from CSS variables defined in `src/styles/theme.css`. Never hardcode color values.

## Readability & Organisation

Readability is a first-class concern. Prefer:
- Short, focused files over large catch-all files
- Descriptive names that make intent obvious
- Flat structure where possible — avoid deep nesting
- Consistent patterns across similar files (if one section component has a certain shape, others should match)
```

- [ ] **Step 2: Commit**

```bash
git add .claude/rules/conventions.md
git commit -m "docs: add coding and styling conventions"
```

---

## Task 3: Create `.claude/rules/testing-guide.md`

**Files:**
- Create: `.claude/rules/testing-guide.md`

- [ ] **Step 1: Create the file**

```markdown
# Testing Guide

## Stack

Jest + React Testing Library, colocated with source files (`*.test.ts` / `*.test.tsx`).

## What to Test

Test pure functions, hooks, and utility logic. Do not test:
- Component rendering for its own sake (avoid snapshot tests)
- Implementation details (internal state, private methods)
- Third-party library behaviour

For components, test behaviour: what the user sees or what happens when they interact.

## Format: Given / When / Then

Test names follow this pattern:

```
GIVEN <initial state> WHEN <action> THEN <expected result>
```

```ts
it('GIVEN an empty skills list WHEN filtering by id THEN returns empty array', () => {
```

## Structure: Arrange / Act / Assert

Every test body has three labelled sections:

```ts
it('GIVEN valid skill IDs WHEN filtering THEN returns matching skills', () => {
  // Arrange
  const skills = [
    { id: 'react', name: 'React' },
    { id: 'ts', name: 'TypeScript' },
  ];
  const ids = ['react'];

  // Act
  const result = getSkillsByIds(ids, skills);

  // Assert
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('react');
});
```

## Grouping

Use `describe` to group by unit, then by scenario:

```ts
describe('getSkillsByIds', () => {
  describe('when IDs match', () => {
    it('GIVEN valid IDs WHEN filtering THEN returns matching skills', () => { ... });
  });

  describe('when IDs are empty or invalid', () => {
    it('GIVEN empty array WHEN filtering THEN returns empty array', () => { ... });
  });
});
```

## Rules

- ES module `import` only — never `require()`
- One assertion concept per test (multiple `expect` calls are fine if they verify the same concept)
- Use `jest.fn()` for callbacks, `jest.useFakeTimers()` for time-dependent logic
- Mock only at system boundaries (external APIs, `Date`, `Math.random`) — do not mock your own module internals
- Keep test data inline unless it's reused across 3+ tests, in which case extract to a `const` above the `describe` block
```

- [ ] **Step 2: Commit**

```bash
git add .claude/rules/testing-guide.md
git commit -m "docs: add testing guide (GWT/AAA format)"
```

---

## Task 4: Create `.claude/docs/animation-patterns.md`

**Files:**
- Create: `.claude/docs/animation-patterns.md`

- [ ] **Step 1: Create the file**

```markdown
# Animation Patterns

## Where Animation Config Lives

All Motion variants and viewport configs live in `src/lib/ui-logic/`. Components import and consume them — they do not define animation logic inline.

```
src/lib/ui-logic/
  heroVariants.ts
  skillsVariants.ts
  projectDetailVariants.ts
  mobileMenuVariants.ts
```

## Structure of a Variants File

```ts
import { Variants } from 'motion/react';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const sectionViewport = { once: true, amount: 0.2 };
```

## How Components Consume Variants

```tsx
import { fadeInUp, sectionViewport } from '@/lib/ui-logic/heroVariants';

<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={sectionViewport}
>
```

No inline `animate`, `initial`, or `transition` objects in JSX unless the value is a single dynamic prop (e.g. `animate={{ opacity: isOpen ? 1 : 0 }}`).

## Adding New Animations

1. Add the variant to the relevant file in `src/lib/ui-logic/`, or create a new file if it belongs to a new section.
2. Export a viewport config alongside the variant if it uses `whileInView`.
3. Import and apply in the component — keep the JSX side to 2–3 Motion props max.

## Anti-patterns

- Do not define `Variants` objects inside component files
- Do not use `useAnimation()` when `whileInView` or `animate` with a state toggle suffices
- Do not add `AnimatePresence` unless the element is conditionally mounted
```

- [ ] **Step 2: Commit**

```bash
git add .claude/docs/animation-patterns.md
git commit -m "docs: add animation patterns reference"
```

---

## Task 5: Scaffold `.claude/skills/`

**Files:**
- Create: `.claude/skills/.gitkeep`

- [ ] **Step 1: Create the folder**

```bash
touch .claude/skills/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/.gitkeep
git commit -m "chore: scaffold .claude/skills/ for project-level skills"
```

---

## Task 6: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

This is the most important task. CLAUDE.md gains: `@` imports to sub-docs, AI behaviour rules, the `@/*` import alias rule, and the readability principle. Existing content is kept — only additions are made.

- [ ] **Step 1: Replace CLAUDE.md with the updated version**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@.claude/rules/conventions.md
@.claude/rules/testing-guide.md
@.claude/docs/animation-patterns.md

## Commands

\`\`\`bash
npm run dev           # Start development server
npm run build         # Production build
npm run type-check    # TypeScript validation
npm run lint          # ESLint
npm run prettier-format  # Format with Prettier
npm run test          # Jest (run a single test file: npm test -- path/to/file.test.ts)
npm run validate      # Full check: type-check + lint + prettier + test
\`\`\`

## AI Behaviour

- Ask clarifying questions when requirements are ambiguous — do not guess and proceed.
- Push back when a proposed approach has a better alternative. Explain why clearly.
- Gather enough context to act confidently before starting. One focused question beats five speculative ones.
- Do not add features, refactors, or abstractions beyond what was asked.
- Do not add comments that explain what the code does. See conventions for comment rules.
- Do not make a component a client component unless it meets the criteria in conventions.

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
```

- [ ] **Step 2: Verify type-check and lint still pass**

```bash
npm run type-check && npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with behaviour rules, conventions refs, and @ imports"
```

---

## Verification

After all tasks are complete:

- [ ] Run `npm run validate` — should pass with zero errors
- [ ] Open a new Claude Code session in this project and confirm it reads the imported docs (ask Claude to summarise the testing conventions — it should describe GWT/AAA)
- [ ] Confirm `AGENTS.md` no longer exists at the repo root
- [ ] Confirm `.claude/skills/` folder exists
