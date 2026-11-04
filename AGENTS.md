# AGENTS.md

This file provides guidance to Codex and other agents when working with code in this repository. `CLAUDE.md` carries the same rules for Claude Code; change both together.

## Project Overview

**portfolio-site** — personal portfolio site (Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS v4), designed in Figma and implemented with Claude Code. Full brief, stack, engineering standard, and project-specific rules live in `.context/projects/portfolio-site.md` — read that before working in this repo.

Engineering standard: Next.js / React, **Showcase** tier. `.context/engineering/tiers.md` owns what that obliges; `.context/engineering/nextjs-react.md` owns how it is evidenced in this stack.

## Running locally

```bash
npm run dev           # Development server
npm run build         # Production build
npm run validate      # Full checkpoint: type-check + lint + prettier-check + test
```

`npm run validate` is the per-task checkpoint, not `git diff --check`. `GITHUB_TOKEN` is required for the Contributions section; without it the section shows its error state.

## Role division

`.context/tool-guidance/agent-roles.md` owns who plans, executes and reviews; read it rather than relying on a summary here. Claude executes by default. Codex executes only when the owner opts in for a task, and then these mechanics apply:

- Codex works from a brief under `docs/briefs/` naming its source task, files, constraints and verification commands. The brief and ledger shapes, and the handoff procedure, come from the `claude-codex-handoff` skill.
- After each dispatch, append to `docs/progress.md`: status, files changed, and the validation result.

`docs/README.md` is the documentation standard pointer; read it before creating any document under `docs/`. `docs/` is gitignored at the Showcase tier, so archive rather than delete, and date brief filenames.

## Git

Git authority is declared in `.context/projects/portfolio-site.md`: an agent may branch, commit, push and open the pull request. It never merges, never commits to `master`, and never rewrites history. Branches and pull requests follow `.context/engineering/tickets.md` and `.context/engineering/pr-template.md`; commit messages follow `.context/engineering/commits.md`.

## Small fixes

The small-fix workflow override in `.context/AGENTS.md` applies to scoped bug fixes and review follow-ups. Here that means: inspect and establish the root cause → propose the fix once → patch → run focused checks → run `npm run validate` once. Do not create a brief, design specification, implementation plan, worktree, or branch for these fixes.

## Architecture

The folder map, a traced page request and what lint enforces are in `ARCHITECTURE.md`. `.claude/skills/` holds project-level skills bespoke to this repo.

### Key patterns

**Content updates** — edit `src/data/` for projects, skills, and experience; `src/language/english.ts` for UI text.

**State** — the theme is the `dark` class on `<html>`, read through `useTheme`. There is no global store; a section that needs state keeps it local.

**Client vs server** — most components are server components. `'use client'` goes at the smallest interactive leaf, and only for the reasons listed under [Repo-local conventions](#repo-local-conventions).

**Skill tiles are not interactive.** They render `role="img"` and carry no route into the projects section. That path was removed deliberately — the projects section already filters itself by type, and the tile route needed a double activation with no affordance. Do not reintroduce it.

**Contributions** — the calendar fetches `/api/contributions?year=YYYY`.

**Analytics** — `@vercel/analytics` and `@vercel/speed-insights` are injected only when `VERCEL=1`.

## Repo-local conventions

> Conventions specific to this repo that the context hub does not already cover. The hub owns code style, testing, and communication — read `.context/engineering/code-style.md`, `.context/engineering/testing.md`, and `.context/engineering/nextjs-react.md` first. This section adds only what is specific here.

### Imports

- Use the `@/*` alias for anything under `src/`. Never a relative path traversing more than one level.
- Domain types shared across layers (`Project`, `JobExperience`, `Skill`) live in `src/types/`; import them from there, not re-exported through data files. Any other type lives with the module that owns it.

### Styling

- Compose conditional classes with `cn()` from `@/lib/utils`.
- Colours come from the CSS variables in `src/styles/theme.css`. Never hardcode a colour value.
- Styling used by one component stays in that component as utilities, however long the list. Use the semantic colour roles (`text-fg-muted`, `bg-raised`, `border-line`) rather than a `dark:` pair.
- Extract a named class to `src/styles/components.css` only when the same combination is used by more than one component, or when it needs CSS that utilities cannot express readably (nested or sibling selectors, keyframes, grid areas). A CSS module next to the component is the fallback for the second case when the rule belongs to one component.
- `components.css` still holds single-use classes from before this rule; move them into their components when you touch them, rather than adding to them.

### Client components

Add `'use client'` only when the component itself uses browser APIs, client-context React hooks, or event handlers that cannot be passed down from a server parent. Do not create a client wrapper to avoid prop drilling — solve that with composition.

### Animation

Motion variants and viewport configs live in `src/lib/ui-logic/`, and components import them.

- Never define a `Variants` object inside a component file.
- No inline `animate`, `initial`, or `transition` objects in JSX unless the value is a single dynamic prop.
- Keep the JSX side to two or three Motion props.
- Do not reach for `useAnimation()` when `whileInView` or `animate` with a state toggle does the job, or `AnimatePresence` unless the element is conditionally mounted.
- Reduced-motion handling is required wherever animation is used — Showcase tier.

### Where logic goes

Keep UI files thin. Beyond simple conditional rendering or a single derived value, extract: data transforms and filtering to `src/lib/utils/`, side effects and DOM interaction to `src/hooks/`, motion configuration to `src/lib/ui-logic/`.

### Icons in buttons

Which side an icon sits on is decided by what the icon _means_, not by a house preference for one side:

- **Leading** — the icon says what the control **is**. `Download`, `Mail`, a category glyph. This is the `icon` prop on `TertiaryButton`, which renders it before its children.
- **Trailing** — the icon says where the control **takes you**, or what happens next. `ChevronDown` for disclosure, `ExternalLink` for a link that leaves the page, an arrow for "continue". Write these inline after the label rather than through the `icon` prop.

```tsx
// Leading: the glyph names the action
<TertiaryButton icon={<Download aria-hidden className="size-4" />}>
  {en.footerSection.downloadCVLabel}
</TertiaryButton>

// Trailing: the glyph names the destination or the consequence
<a href={link.url}>
  {link.label}
  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
</a>
```

A blanket "always left" or "always right" is the thing to avoid: trailing position is itself a signal, and spending it on icons that merely identify the action leaves nothing to mark the ones that change where you end up. Icon-only controls (`BurgerMenuButton`) are outside this rule and need an `aria-label`.

### Control state

A toggle says which of its options is active by changing **fill and border**, never by dimming itself.

- **Idle** — transparent fill, neutral border, text at full strength.
- **Selected** — solid brand fill, with the label checked for contrast against it.
- **Hover** — a visible background change on the idle state, distinct from selected.
- Add `aria-pressed` when the control is a toggle rather than a link or an action.

```css
.filter-pill {
  @apply gap-1.5 border-neutral-400 bg-transparent text-neutral-800 hover:bg-neutral-200 ...;
}
/* Declared after, so the selected fill wins on source order. */
.filter-pill-selected {
  @apply bg-brand-500 border-brand-500 dark:bg-brand-100 text-neutral-900 dark:text-neutral-900;
}
```

**Never use opacity to mean "not selected".** `opacity: 50%` on a control dims its label and its icon along with its fill, and it halves whatever the hover rule shifts — a 14% background change becomes roughly 7% of perceived change, which reads as a control that does not respond. This is what made the projects filters look greyed out and unclickable.

**Check both themes.** The dark brand ramp runs the opposite way to the light one: `brand-100` is dark's _brightest_ amber, not its lightest tint. A selected fill of `brand-500` measured 3.50:1 against its label in dark; the same pattern on `brand-100` measures 6.60:1, against 7.15:1 in light.

**An icon inside a control inherits the control's colour** — `text-current`, not a colour of its own. `.category-mark` hard-pins a muted grey and is declared late in the file, so at equal specificity it beats a pill's own colour and the glyph washes out against a saturated fill. Two classes (`.filter-pill .category-mark`) is enough to win it back.

## Never read

- `.env` files
- Any file with "secret", "key", or "token" in the name

---

## Personal context

The user's private context hub is mounted at `.context/` (gitignored).
Read `.context/AGENTS.md` first on every task; it routes to the rest.
