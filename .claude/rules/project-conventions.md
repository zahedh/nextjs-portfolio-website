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

## Icons in buttons

Which side an icon sits on is decided by what the icon _means_, not by a house preference for one side:

- **Leading** — the icon says what the control **is**. `Download`, `Mail`, a category glyph. This is the `icon` prop on `SecondaryButton` and `TertiaryButton`, which render it before their children.
- **Trailing** — the icon says where the control **takes you**, or what happens next. `ChevronDown` for disclosure, `ExternalLink` for a link that leaves the page, an arrow for "continue". Write these inline after the label rather than through the `icon` prop.

```tsx
// Leading: the glyph names the action
<TertiaryButton icon={<Download aria-hidden className="size-4" />}>
  {en.footerSection.cvLabel}
</TertiaryButton>

// Trailing: the glyph names the destination or the consequence
<a href={link.url}>
  {link.label}
  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
</a>
```

A blanket "always left" or "always right" is the thing to avoid: trailing position is itself a signal, and spending it on icons that merely identify the action leaves nothing to mark the ones that change where you end up. Icon-only controls (`BurgerMenuButton`, `DismissButton`) are outside this rule and need an `aria-label`.

## Control state

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
