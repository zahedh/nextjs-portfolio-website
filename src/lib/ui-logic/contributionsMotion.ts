/**
 * The hidden state is identical either way on purpose: `useReducedMotion` is a
 * client-only reading, so branching the variant values makes the server and the
 * client write different styles and React reports a hydration mismatch. Only the
 * duration varies, which collapses the move to nothing without changing markup.
 */
export function getContributionsBandVariants(noMotion: boolean) {
  return {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: noMotion ? 0 : 0.4, ease: 'easeOut' as const },
    },
  };
}
