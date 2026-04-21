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
