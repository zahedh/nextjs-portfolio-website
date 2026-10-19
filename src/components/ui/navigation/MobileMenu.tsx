'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { en } from '@/language';
import { BurgerMenuButton, ThemeSwitch } from '@/components/ui/buttons';
import { useBodyScrollLock } from '@/hooks/overlayHooks';

// Tailwind's `md`, where the bar shows its own links and the sheet is hidden.
const WIDE_QUERY = '(min-width: 48rem)';

export type MobileMenuLink = { id: string; label: string; href: string };

type MobileMenuProps = {
  links: readonly MobileMenuLink[];
  activeSection: string | null;
  onNavigate: (
    mouseEvent: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => void;
};

/**
 * Full-screen phone menu. A modal `<dialog>`, so the browser traps focus,
 * makes the page inert, closes on Escape and returns focus to the burger.
 * Its top row repeats the bar's, so the mark does not move when it opens.
 */
export default function MobileMenu({
  links,
  activeSection,
  onNavigate,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // A hidden modal would leave the page inert and scroll-locked, so widening
  // past the phone layout (rotating to landscape on a tablet) closes it.
  useEffect(() => {
    const wide = window.matchMedia(WIDE_QUERY);
    const closeIfWide = () => {
      if (wide.matches) setIsOpen(false);
    };
    wide.addEventListener('change', closeIfWide);
    return () => wide.removeEventListener('change', closeIfWide);
  }, []);

  const navigate = (
    mouseEvent: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    onNavigate(mouseEvent, id);
    setIsOpen(false);
  };

  return (
    <>
      <BurgerMenuButton
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen(true)}
      />

      <dialog
        id={menuId}
        ref={dialogRef}
        aria-label={en.menu}
        className="mobile-sheet"
        onClose={() => setIsOpen(false)}
      >
        <div className="prime-parent flex flex-col pb-[26px]">
          <div className="h-header flex items-center justify-between">
            <Link
              href="/"
              onClick={(mouseEvent) => navigate(mouseEvent, 'home')}
              className="nav-mark"
              aria-label={en.home}
            >
              ZH
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="nav-close"
              aria-label={en.closeMenu}
            >
              <X className="size-[17px]" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <ul className="mobile-sheet-links">
            {links.map(({ id, label, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  className="mobile-sheet-link"
                  aria-current={activeSection === id ? 'location' : undefined}
                  onClick={(mouseEvent) => navigate(mouseEvent, id)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-sheet-theme">
            <span>{en.theme}</span>
            <ThemeSwitch />
          </div>
        </div>
      </dialog>
    </>
  );
}
