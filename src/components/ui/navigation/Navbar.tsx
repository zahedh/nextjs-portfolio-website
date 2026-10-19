'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { en } from '@/language';
import { ThemeSwitch } from '@/components/ui/buttons';
import { useActiveSection } from '@/hooks/useActiveSection';
import MobileMenu from './MobileMenu';
import { handleSmoothScroll, scrollToTop } from '@/lib/utils';

const SECTIONS = [
  { id: 'home', label: en.home },
  { id: 'skills', label: en.skills },
  { id: 'projects', label: en.projects },
  { id: 'experience', label: en.experience },
  { id: 'about', label: en.about },
  { id: 'contact', label: en.contact },
] as const;

const SECTION_IDS = SECTIONS.map((section) => section.id);

/** Responsive top navigation bar for primary site links. */
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  // Before the first section reaches the line the reader is in the hero.
  const activeSection = useActiveSection(SECTION_IDS, isHome) ?? 'home';
  const currentSection = isHome ? activeSection : null;
  const links = SECTIONS.map(({ id, label }) => ({
    id,
    label,
    href: id === 'home' ? '/' : isHome ? `#${id}` : `/#${id}`,
  }));

  const handleClick = (
    mouseEvent: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (!isHome) return;
    if (id === 'home') scrollToTop(mouseEvent);
    else handleSmoothScroll(mouseEvent);
  };

  // The phone sheet closes onto the section rather than scrolling to it.
  const handleSheetClick = (
    mouseEvent: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (!isHome) return;
    mouseEvent.preventDefault();
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'instant' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  };

  return (
    <nav className="h-header flex items-center justify-between">
      <Link
        href="/"
        onClick={(mouseEvent) => handleClick(mouseEvent, 'home')}
        className="nav-mark"
        aria-label={en.home}
      >
        ZH
      </Link>

      <div className="hidden items-center gap-[26px] md:flex">
        <ul className="nav-links">
          {links.map(({ id, label, href }) => (
            <li key={id}>
              <Link
                href={href}
                className="nav-link"
                aria-current={currentSection === id ? 'location' : undefined}
                onClick={(mouseEvent) => handleClick(mouseEvent, id)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeSwitch />
      </div>

      <MobileMenu
        links={links}
        activeSection={currentSection}
        onNavigate={handleSheetClick}
      />
    </nav>
  );
}
