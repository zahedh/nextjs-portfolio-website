import { Navbar } from '../ui';

/** Site header containing the primary navigation bar. */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-100/95 dark:bg-neutral-900/95">
      <Navbar />
    </header>
  );
}
