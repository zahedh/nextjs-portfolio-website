'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { en } from '@/language';
import {
  SecondaryButton,
  ThemeToggleButton,
  BurgerMenuButton,
  CloseButton,
} from '../buttons';
import { createEscapeHandler, handleSmoothScroll } from '@/lib/utils';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
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
      {/* Burger Icon Button */}
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
              {/* Close Button */}
              <CloseButton onClick={() => setIsOpen(false)} />

              <nav className="flex flex-col items-center gap-8 p-8 pt-16">
                <a
                  href="#home"
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.home}
                </a>
                <a
                  href="#skills"
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.skills}
                </a>
                <a
                  href="#projects"
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.projects}
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.about}
                </a>
                <a
                  href="#experience"
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.experience}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    setIsOpen(false);
                  }}
                  className="nav-link"
                >
                  {en.contact}
                </a>
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
