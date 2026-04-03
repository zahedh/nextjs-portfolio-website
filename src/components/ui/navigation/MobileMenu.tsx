'use client';

import { useState, useEffect, useId, useRef, useCallback } from 'react';
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
  createEscapeHandler,
  scrollToTop,
  handleSmoothScroll,
} from '@/lib/utils';

/** Minimum horizontal drag (px) toward the screen edge to dismiss. */
const SWIPE_DISMISS_OFFSET_PX = 56;
/** Flick velocity (px/s) toward the edge that dismisses even with a short drag. */
const SWIPE_DISMISS_VELOCITY_PX = 420;

/** Slide-in mobile navigation drawer with backdrop and keyboard support. */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const noMotion = Boolean(prefersReducedMotion);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const overlayTransition = noMotion
    ? { duration: 0 }
    : { duration: 0.2 };

  const panelTransition = noMotion
    ? { duration: 0 }
    : { type: 'spring' as const, damping: 30, stiffness: 300 };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = createEscapeHandler(() => setIsOpen(false));
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const frameId = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(frameId);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleDragEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (noMotion) return;
      if (
        info.offset.x > SWIPE_DISMISS_OFFSET_PX ||
        info.velocity.x > SWIPE_DISMISS_VELOCITY_PX
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
