/** Backdrop fade when the project detail overlay opens / closes. */
export function getProjectDetailOverlayTransition(noMotion: boolean) {
  return noMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: 'easeOut' as const };
}

/** Dialog sheet: initial / animate / transition for desktop modal vs mobile bottom sheet. */
export function getProjectDetailDialogMotion(
  noMotion: boolean,
  isDesktop: boolean
) {
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
        }
      : {
          y: { type: 'spring' as const, damping: 34, stiffness: 380 },
          opacity: { duration: 0.2 },
        };

  return { initial, animate, transition };
}
