/** Backdrop fade when the project detail overlay opens / closes. */
export function getProjectDetailBackdropMotion(noMotion: boolean) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: noMotion
      ? { duration: 0 }
      : { duration: 0.22, ease: 'easeOut' as const },
  };
}

/** @deprecated Use getProjectDetailBackdropMotion instead. */
export function getProjectDetailOverlayTransition(noMotion: boolean) {
  return noMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: 'easeOut' as const };
}

/** Dialog sheet: initial / animate / transition for desktop modal vs mobile bottom sheet. */
export function getProjectDetailDialogMotion(
  noMotion: boolean,
  isDesktop: boolean
) {
  const DIALOG_DELAY = noMotion ? 0 : 0.18;

  const initial = noMotion
    ? { opacity: 0 }
    : isDesktop
      ? { opacity: 0, y: 20, scale: 0.94 }
      : { y: '100%', opacity: 1 };

  const animate = noMotion
    ? { opacity: 1 }
    : isDesktop
      ? { opacity: 1, y: 0, scale: 1 }
      : { y: 0, opacity: 1 };

  const transition = noMotion
    ? { duration: 0 }
    : isDesktop
      ? {
          type: 'spring' as const,
          damping: 30,
          stiffness: 320,
          delay: DIALOG_DELAY,
        }
      : {
          y: { type: 'spring' as const, damping: 34, stiffness: 380, delay: DIALOG_DELAY },
          opacity: { duration: 0.2, delay: DIALOG_DELAY },
        };

  return { initial, animate, transition };
}
