import { ThemeToggleButton } from '../ui';

export default function Header() {
  return (
    <header className="bg-brand-600 p-4 text-neutral-100">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Zahed Heidari</h1>
        <ul className="hidden gap-6 md:flex">
          <li>
            <a href="#home" className="hover:text-neutral-300">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-neutral-300">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-neutral-300">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-neutral-300">
              Contact
            </a>
          </li>
          <li>
            <ThemeToggleButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
