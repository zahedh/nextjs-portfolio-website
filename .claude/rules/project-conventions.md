# Project Conventions

> Repo-local conventions for portfolio-site that the context hub does not already cover. The hub owns code style, testing, and communication — read `.context/engineering/code-style.md`, `.context/engineering/testing.md`, and `.context/engineering/nextjs-react.md` first. This file adds only what is specific to this repo.

## Imports

- Use the `@/*` alias for anything under `src/`. Never a relative path traversing more than one level.
- Never use `import type` — import types the same way as values: `import { MyType } from '...'`.
- Types live in `src/types/`. Import them from there, not re-exported through data files.

## Styling

- Compose conditional classes with `cn()` from `@/lib/utils`.
- Colours come from the CSS variables in `src/styles/theme.css`. Never hardcode a colour value.
- When a class combination repeats across components, or exceeds roughly five utilities for one visual purpose, extract it to `src/styles/components.css` or `src/styles/utilities.css`.

```tsx
// Avoid: className="flex items-center justify-between px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium"
// Prefer: className={cn('card-row', isActive && 'card-row--active')}
```

## Client components

Add `'use client'` only when the component itself uses browser APIs, client-context React hooks, event handlers that cannot be passed down from a server parent, or the Zustand store. Do not create a client wrapper to avoid prop drilling — solve that with composition.

## Animation

All Motion variants and viewport configs live in `src/lib/ui-logic/` (`heroVariants.ts`, `skillsVariants.ts`, and siblings). Components import them.

```ts
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const sectionViewport = { once: true, amount: 0.2 };
```

- Never define a `Variants` object inside a component file.
- No inline `animate`, `initial`, or `transition` objects in JSX unless the value is a single dynamic prop.
- Keep the JSX side to two or three Motion props.
- Do not reach for `useAnimation()` when `whileInView` or `animate` with a state toggle does the job, or `AnimatePresence` unless the element is conditionally mounted.
- Reduced-motion handling is required wherever animation is used — Showcase tier.

## Where logic goes

Keep UI files thin. Beyond simple conditional rendering or a single derived value, extract: data transforms and filtering to `src/lib/utils/`, side effects and DOM interaction to `src/hooks/`, motion configuration to `src/lib/ui-logic/`.
