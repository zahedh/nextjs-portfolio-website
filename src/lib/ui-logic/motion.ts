import type { Transition, Variants } from 'motion/react';

/**
 * The site's motion language: things rise a short way and come to rest, all on
 * one curve. The curve is the one the project-title morph already uses in
 * `utilities.css`, so entrances and page transitions read as one family.
 */
export const SETTLE = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
  rise: 12,
  stagger: 0.06,
} as const;

/** Under reduced motion the fade survives, briefly; the rise does not. */
const REDUCED_FADE = 0.15;

/** Plays an in-view entrance once, a little after the element's edge appears. */
export const IN_VIEW_ONCE = { once: true, margin: '-80px' } as const;

function settleTransition(noMotion: boolean, delay: number): Transition {
  return noMotion
    ? { duration: REDUCED_FADE, ease: 'linear', y: { duration: 0 } }
    : { duration: SETTLE.duration, ease: SETTLE.ease, delay };
}

/**
 * An element that fades in while rising into place.
 *
 * The hidden state is the same whether or not motion is reduced, on purpose:
 * `useReducedMotion` is a client-only reading, so branching the values would
 * make the server and the client write different styles and React would report
 * a hydration mismatch. Only the transition varies.
 */
export function getSettleVariants(noMotion: boolean, delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: SETTLE.rise },
    visible: {
      opacity: 1,
      y: 0,
      transition: settleTransition(noMotion, delay),
    },
  };
}

/** A parent that plays its children's settle one after another. */
export function getStaggerVariants(
  noMotion: boolean,
  stagger: number = SETTLE.stagger
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: noMotion ? 0 : stagger } },
  };
}
