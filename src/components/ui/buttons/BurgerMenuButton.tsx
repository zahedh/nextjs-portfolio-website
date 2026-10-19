'use client';

import { forwardRef } from 'react';

export type BurgerMenuButtonProps = {
  onClick: () => void;
  'aria-expanded': boolean;
  'aria-controls': string;
};

/**
 * Icon-only button that opens the mobile navigation drawer. Two lines of
 * unequal length, set against the button's right edge so they sit on the
 * content edge.
 */
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
        className="nav-burger"
        aria-label="Toggle menu"
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        <span aria-hidden className="w-[22px]" />
        <span aria-hidden className="w-[14px]" />
      </button>
    );
  }
);

export default BurgerMenuButton;
