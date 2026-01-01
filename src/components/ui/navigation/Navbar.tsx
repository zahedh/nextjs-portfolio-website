'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { en } from '@/language';
import { SecondaryButton, ThemeToggleButton } from '../buttons';
import { InitialsGraphic } from '@/components/media';
import MobileMenu from './MobileMenu';
import { handleSmoothScroll, scrollToTop } from '@/lib/utils';
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
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      handleSmoothScroll(e);
    }
    // If not on home, let the browser navigate to /#anchor
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      scrollToTop(e);
    }
    // If not on home, let the browser navigate to /
  };

  return (
    <nav className={clsx('flex items-center justify-between', className)}>
      {showInitials && <InitialsGraphic className="-ml-4 h-16 w-20" />}

      {/* Desktop Navigation */}
      <ul className="hidden items-center gap-5 md:flex">
        <li>
          <Link href="/" className="nav-link" onClick={handleHomeClick}>
            {en.home}
          </Link>
        </li>
        <li>
          <Link
            href={isHome ? '#skills' : '/#skills'}
            className="nav-link"
            onClick={handleNavClick}
          >
            {en.skills}
          </Link>
        </li>
        <li>
          <Link
            href={isHome ? '#projects' : '/#projects'}
            className="nav-link"
            onClick={handleNavClick}
          >
            {en.projects}
          </Link>
        </li>
        <li>
          <Link
            href={isHome ? '#about' : '/#about'}
            className="nav-link"
            onClick={handleNavClick}
          >
            {en.about}
          </Link>
        </li>
        <li>
          <Link
            href={isHome ? '#experience' : '/#experience'}
            className="nav-link"
            onClick={handleNavClick}
          >
            {en.experience}
          </Link>
        </li>
        <li>
          <Link
            href={isHome ? '#contact' : '/#contact'}
            className="nav-link"
            onClick={handleNavClick}
          >
            {en.contact}
          </Link>
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
