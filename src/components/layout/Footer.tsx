import { Navbar } from '../ui';

/** Site footer with copyright and secondary navigation. */
export default function Footer() {
  return (
    <footer className="text-center text-neutral-900">
      <p>© 2025 Zahed Heidari. All rights reserved.</p>
      <Navbar
        className="justify-end"
        showInitials={false}
        showMobileMenu={false}
      />
    </footer>
  );
}
