import { en } from '@/language';
import { SecondaryButton, ThemeToggleButton } from '../buttons';
import { InitialsGraphic } from '@/components/media';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <InitialsGraphic className="-ml-4 h-12 w-20" />

      {/* Desktop Navigation */}
      <ul className="hidden items-center gap-5 md:flex">
        <li>
          <a
            href="#home"
            className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
          >
            {en.home}
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
          >
            {en.skills}
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
          >
            {en.projects}
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
          >
            {en.about}
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
          >
            {en.experience}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="font-heading hover:text-brand-600 dark:hover:text-brand-600 font-bold text-neutral-900 dark:text-neutral-200"
          >
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
      <MobileMenu />
    </nav>
  );
}
