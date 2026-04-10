'use client';

import { forwardRef } from 'react';
import { Menu } from 'lucide-react';

export type BurgerMenuButtonProps = {
  onClick: () => void;
  'aria-expanded': boolean;
  'aria-controls': string;
};

/** Icon-only button that opens the mobile navigation drawer. */
const BurgerMenuButton = forwardRef<HTMLButtonElement, BurgerMenuButtonProps>(
  function BurgerMenuButton(
    { onClick, 'aria-expanded': ariaExpanded, 'aria-controls': ariaControls },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className="text-brand-500 p-2 transition-opacity duration-100 active:opacity-70 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
      </button>
    );
  }
);

export default BurgerMenuButton;
