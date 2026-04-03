'use client';

import { forwardRef } from 'react';

export type BurgerMenuButtonProps = {
  onClick: () => void;
  'aria-expanded': boolean;
  'aria-controls': string;
};

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
        className="p-2 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        <span className="burger-line block h-0.5 w-6" />
        <span className="burger-line my-1.5 block h-0.5 w-6" />
        <span className="burger-line block h-0.5 w-6" />
      </button>
    );
  }
);

export default BurgerMenuButton;
