export const MOBILE_MENU_SWIPE_DISMISS_OFFSET_PX = 56;
export const MOBILE_MENU_SWIPE_DISMISS_VELOCITY_PX = 420;

export function getMobileMenuOverlayTransition(noMotion: boolean) {
  return noMotion ? { duration: 0 } : { duration: 0.2 };
}

export function getMobileMenuPanelTransition(noMotion: boolean) {
  return noMotion
    ? { duration: 0 }
    : { type: 'spring' as const, damping: 30, stiffness: 300 };
}

export function getMobileMenuNavContainerVariants(noMotion: boolean) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: noMotion ? 0 : 0.045,
        delayChildren: noMotion ? 0 : 0.08,
      },
    },
  };
}

export function getMobileMenuNavItemVariants(noMotion: boolean) {
  return {
    hidden: noMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 400, damping: 28 },
    },
  };
}
