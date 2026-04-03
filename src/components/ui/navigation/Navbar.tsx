'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { en } from '@/language';
import { ThemeToggleButton } from '@/components/ui/buttons';
import { InitialsGraphic } from '@/components/media';
import MobileMenu from './MobileMenu';
import { handleSmoothScroll, scrollToTop } from '@/lib/utils';
import { cn } from '@/lib/utils';

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
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      scrollToTop(e);
    }
  };

  return (
    <nav className={cn('flex items-center justify-between', className)}>
      {showInitials && (
        <Link
          href="/"
          onClick={handleHomeClick}
          className="block transition-transform duration-150 active:scale-90"
          aria-label={en.home}
        >
          <InitialsGraphic className="-ml-4 h-16 w-20" />
        </Link>
      )}

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
            href={isHome ? '#contributions' : '/#contributions'}
            className="nav-link"
            onClick={handleNavClick}
          >
            {en.activity}
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
          <ThemeToggleButton />
        </li>
      </ul>

      {showMobileMenu && <MobileMenu />}
    </nav>
  );
}
