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
