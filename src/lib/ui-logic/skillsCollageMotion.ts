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
        staggerChildren: noMotion ? 0 : 0.04,
        delayChildren: noMotion ? 0 : 0.02,
      },
    },
  };
}

export function getSkillsCollageItemVariants(
  prefersReducedMotion: boolean | null
) {
  const noMotion = Boolean(prefersReducedMotion);
  return {
    hidden: noMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween' as const,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
}
