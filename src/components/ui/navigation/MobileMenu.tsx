'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { en } from '@/language';
import {
  SecondaryButton,
  ThemeToggleButton,
  BurgerMenuButton,
  CloseButton,
} from '../buttons';
import {
  createEscapeHandler,
  scrollToTop,
  handleSmoothScroll,
} from '@/lib/utils';

/** Slide-in mobile navigation drawer with backdrop and keyboard support. */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = createEscapeHandler(() => setIsOpen(false));
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <BurgerMenuButton onClick={() => setIsOpen(!isOpen)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="mobile-menu-panel"
            >
              <CloseButton onClick={() => setIsOpen(false)} />

              <nav className="flex flex-col items-center gap-8 p-8 pt-16">
                <Link
                  href="/"
                  onClick={(e) => {
                    if (isHome) {
                      e.preventDefault();
                      scrollToTop(e);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.home}
                </Link>
                <Link
                  href={isHome ? '#skills' : '/#skills'}
                  onClick={(e) => {
                    if (isHome) {
                      handleSmoothScroll(e);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.skills}
                </Link>
                <Link
                  href={isHome ? '#projects' : '/#projects'}
                  onClick={(e) => {
                    if (isHome) {
                      handleSmoothScroll(e);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.projects}
                </Link>
                <Link
                  href={isHome ? '#about' : '/#about'}
                  onClick={(e) => {
                    if (isHome) {
                      handleSmoothScroll(e);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.about}
                </Link>
                <Link
                  href={isHome ? '#experience' : '/#experience'}
                  onClick={(e) => {
                    if (isHome) {
                      handleSmoothScroll(e);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.experience}
                </Link>
                <Link
                  href={isHome ? '#contributions' : '/#contributions'}
                  onClick={(e) => {
                    if (isHome) {
                      handleSmoothScroll(e);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.activity}
                </Link>
                <Link
                  href={isHome ? '#contact' : '/#contact'}
                  onClick={(e) => {
                    if (isHome) {
                      handleSmoothScroll(e);
                    }
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.contact}
                </Link>
                <SecondaryButton onClick={() => setIsOpen(false)}>
                  {en.cV}
                </SecondaryButton>
                <ThemeToggleButton />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
