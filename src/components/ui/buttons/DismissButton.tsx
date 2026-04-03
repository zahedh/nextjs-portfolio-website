'use client';

import { CloseGraphic } from '@/components/media';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export type DismissButtonProps = {
  onClick: () => void;
  /** `plain`: icon only, no default fill (e.g. mobile drawer). `brand`: bordered brand surface (e.g. dialogs). */
  variant?: 'plain' | 'brand';
  'aria-label': string;
  className?: string;
};

/** Icon-only control for closing dialogs, drawers, and overlays. */
const DismissButton = forwardRef<HTMLButtonElement, DismissButtonProps>(
  function DismissButton(
    { onClick, variant = 'plain', 'aria-label': ariaLabel, className },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(
          'focus-visible:ring-brand-500 flex shrink-0 items-center justify-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-900',
          variant === 'plain' &&
            'absolute top-4 right-4 z-10 p-2 text-neutral-900 hover:bg-neutral-200/90 dark:text-neutral-200 dark:hover:bg-neutral-700/80',
          variant === 'brand' && 'brand-icon-btn h-12 w-12 md:h-11 md:w-11',
          className
        )}
      >
        <CloseGraphic className="h-6 w-6" aria-hidden />
      </button>
    );
  }
);

export default DismissButton;
