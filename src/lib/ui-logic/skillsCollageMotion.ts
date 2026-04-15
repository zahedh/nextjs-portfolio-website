export const skillsCollageHintViewport = {
  once: true,
  margin: '-60px 0px' as const,
};

export function getSkillsCollageGridViewport() {
  return { once: true, margin: '-60px 0px' as const, amount: 0.15 as const };
}

export function getSkillsCollageContainerVariants(
  prefersReducedMotion: boolean | null
) {
  const noMotion = Boolean(prefersReducedMotion);
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: noMotion ? 0 : 0.03,
        delayChildren: noMotion ? 0 : 0.04,
      },
    },
  };
}

export function getSkillsCollageItemVariants(
  prefersReducedMotion: boolean | null
) {
  const noMotion = Boolean(prefersReducedMotion);
  return {
    hidden: noMotion
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 0, scale: 0.72, y: 6 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 520,
        damping: 26,
      },
    },
  };
}

export function getSkillsIdleItemVariants(
  prefersReducedMotion: boolean | null,
  delay = 0
) {
  const noMotion = Boolean(prefersReducedMotion);
  return noMotion
    ? {}
    : {
        animate: { x: [0, 3, -2, 0], y: [0, -5, 3, 0] },
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay,
        },
      };
}
