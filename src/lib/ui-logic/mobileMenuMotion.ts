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
