'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { en } from '@/language';
import { SecondaryButton, ThemeToggleButton } from '../buttons';
import { CloseGraphic } from '@/components/media';

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

  return (
    <>
      {/* Burger Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 p-2 md:hidden"
        aria-label="Toggle menu"
      >
        <span className="bg-brand-500 block h-0.5 w-6 transition-transform" />
        <span className="bg-brand-500 block h-0.5 w-6 transition-opacity" />
        <span className="bg-brand-500 block h-0.5 w-6 transition-transform" />
      </button>

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
              onTouchStart={(e) => e.preventDefault()}
              onWheel={(e) => e.preventDefault()}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="border-brand-500 fixed top-0 right-0 z-50 w-48 rounded-bl-3xl border-b-2 border-l-2 bg-neutral-100 shadow-xl md:hidden dark:bg-neutral-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 rounded-full p-2 text-neutral-900 transition-colors hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
                aria-label="Close menu"
              >
                <CloseGraphic className="h-6 w-6" />
              </button>

              <nav className="flex flex-col items-center gap-8 p-8 pt-16 pb-6">
                <a
                  href="#home"
                  onClick={() => setIsOpen(false)}
                  className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
                >
                  {en.home}
                </a>
                <a
                  href="#skills"
                  onClick={() => setIsOpen(false)}
                  className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
                >
                  {en.skills}
                </a>
                <a
                  href="#projects"
                  onClick={() => setIsOpen(false)}
                  className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
                >
                  {en.projects}
                </a>
                <a
                  href="#about"
                  onClick={() => setIsOpen(false)}
                  className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
                >
                  {en.about}
                </a>
                <a
                  href="#experience"
                  onClick={() => setIsOpen(false)}
                  className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
                >
                  {en.experience}
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
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
