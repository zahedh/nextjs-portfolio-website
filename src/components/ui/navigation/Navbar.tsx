import { en } from '@/language';
import { SecondaryButton, ThemeToggleButton } from '../buttons';
import { InitialsGraphic } from '@/components/media';
import MobileMenu from './MobileMenu';
import clsx from 'clsx';

type NavbarProps = {
  showInitials?: boolean;
  showMobileMenu?: boolean;
  className?: string;
};

export default function Navbar({
  showInitials = true,
  showMobileMenu = true,
  className,
}: NavbarProps) {
  return (
    <nav className={clsx('flex items-center justify-between', className)}>
      {showInitials && <InitialsGraphic className="-ml-4 h-12 w-20" />}

      {/* Desktop Navigation */}
      <ul className="hidden items-center gap-5 md:flex">
        <li>
          <a href="#home" className="nav-link">
            {en.home}
          </a>
        </li>
        <li>
          <a href="#skills" className="nav-link">
            {en.skills}
          </a>
        </li>
        <li>
          <a href="#projects" className="nav-link">
            {en.projects}
          </a>
        </li>
        <li>
          <a href="#about" className="nav-link">
            {en.about}
          </a>
        </li>
        <li>
          <a href="#experience" className="nav-link">
            {en.experience}
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-link">
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
