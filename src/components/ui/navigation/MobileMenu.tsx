'use client';

import { useState, useId, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from 'motion/react';
import { en } from '@/language';
import {
  ThemeToggleButton,
  BurgerMenuButton,
  DismissButton,
} from '@/components/ui/buttons';
import {
  useBodyScrollLock,
  useEscapeKeydown,
  useFocusCloseButtonOnOpen,
} from '@/hooks/overlayHooks';
import { scrollToTop, handleSmoothScroll } from '@/lib/utils';
import {
  MOBILE_MENU_SWIPE_DISMISS_OFFSET_PX,
  MOBILE_MENU_SWIPE_DISMISS_VELOCITY_PX,
  getMobileMenuOverlayTransition,
  getMobileMenuPanelTransition,
} from '@/lib/ui-logic';

/**
 * Slide-in mobile navigation drawer with backdrop, swipe-to-dismiss, scroll lock,
 * Escape to close, and focus management on the dismiss control while open.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useBodyScrollLock(isOpen);
  useEscapeKeydown(isOpen, () => setIsOpen(false));
  useFocusCloseButtonOnOpen(isOpen, closeRef);

  const overlayTransition = getMobileMenuOverlayTransition(noMotion);
  const panelTransition = getMobileMenuPanelTransition(noMotion);

  const handleDragEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (noMotion) return;
      if (
        info.offset.x > MOBILE_MENU_SWIPE_DISMISS_OFFSET_PX ||
        info.velocity.x > MOBILE_MENU_SWIPE_DISMISS_VELOCITY_PX
      ) {
        setIsOpen(false);
      }
    },
    [noMotion]
  );

  return (
    <>
      {isOpen ? (
        <DismissButton
          ref={closeRef}
          variant="plainNav"
          onClick={() => setIsOpen(false)}
          aria-label={en.closeMenu}
          aria-controls={menuId}
        />
      ) : (
        <BurgerMenuButton
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen(!isOpen)}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={overlayTransition}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={noMotion ? { opacity: 0 } : { x: '100%' }}
              animate={noMotion ? { opacity: 1 } : { x: 0 }}
              exit={noMotion ? { opacity: 0 } : { x: '100%' }}
              transition={panelTransition}
              drag={noMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 320 }}
              dragElastic={0.06}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              className="mobile-menu-panel"
            >
              <nav className="flex flex-col items-center gap-8 p-8 pt-8">
                <Link
                  href="/"
                  onClick={(mouseEvent) => {
                    if (isHome) {
                      mouseEvent.preventDefault();
                      scrollToTop(mouseEvent);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.home}
                </Link>
                <Link
                  href={isHome ? '#skills' : '/#skills'}
                  onClick={(mouseEvent) => {
                    if (isHome) {
                      handleSmoothScroll(mouseEvent);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.skills}
                </Link>
                <Link
                  href={isHome ? '#projects' : '/#projects'}
                  onClick={(mouseEvent) => {
                    if (isHome) {
                      handleSmoothScroll(mouseEvent);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.projects}
                </Link>
                <Link
                  href={isHome ? '#about' : '/#about'}
                  onClick={(mouseEvent) => {
                    if (isHome) {
                      handleSmoothScroll(mouseEvent);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.about}
                </Link>
                <Link
                  href={isHome ? '#experience' : '/#experience'}
                  onClick={(mouseEvent) => {
                    if (isHome) {
                      handleSmoothScroll(mouseEvent);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.experience}
                </Link>
                <Link
                  href={isHome ? '#contributions' : '/#contributions'}
                  onClick={(mouseEvent) => {
                    if (isHome) {
                      handleSmoothScroll(mouseEvent);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.activity}
                </Link>
                <Link
                  href={isHome ? '#contact' : '/#contact'}
                  onClick={(mouseEvent) => {
                    if (isHome) {
                      handleSmoothScroll(mouseEvent);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.contact}
                </Link>
                <ThemeToggleButton />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
