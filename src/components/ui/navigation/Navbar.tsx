'use client';

import { en } from '@/language';
import { SecondaryButton, ThemeToggleButton } from '../buttons';
import { InitialsGraphic } from '@/components/media';
import MobileMenu from './MobileMenu';
import { handleSmoothScroll } from '@/lib/utils';
import clsx from 'clsx';

type NavbarProps = {
  showInitials?: boolean;
  showMobileMenu?: boolean;
  className?: string;
};

/** Responsive top navigation bar for primary site links. */
export default function Navbar({
  showInitials = true,
  showMobileMenu = true,
  className,
}: NavbarProps) {
  return (
    <nav className={clsx('flex items-center justify-between', className)}>
      {showInitials && <InitialsGraphic className="-ml-4 h-16 w-20" />}

      {/* Desktop Navigation */}
      <ul className="hidden items-center gap-5 md:flex">
        <li>
          <a href="#home" className="nav-link" onClick={handleSmoothScroll}>
            {en.home}
          </a>
        </li>
        <li>
          <a href="#skills" className="nav-link" onClick={handleSmoothScroll}>
            {en.skills}
          </a>
        </li>
        <li>
          <a href="#projects" className="nav-link" onClick={handleSmoothScroll}>
            {en.projects}
          </a>
        </li>
        <li>
          <a href="#about" className="nav-link" onClick={handleSmoothScroll}>
            {en.about}
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className="nav-link"
            onClick={handleSmoothScroll}
          >
            {en.experience}
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-link" onClick={handleSmoothScroll}>
            {en.contact}
          </a>
        </li>
        <li>
          <SecondaryButton>{en.cV}</SecondaryButton>
        </li>
        <li>
          <ThemeToggleButton />
        </li>
      </ul>

      {/* Mobile Navigation */}
      {showMobileMenu && <MobileMenu />}
    </nav>
  );
}
