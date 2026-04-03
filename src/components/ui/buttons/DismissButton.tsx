'use client';

import { CloseGraphic } from '@/components/media';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export type DismissButtonProps = {
  onClick: () => void;
  variant?: 'plain' | 'plainNav' | 'brand';
  'aria-label': string;

  'aria-controls'?: string;
  className?: string;
};

const DismissButton = forwardRef<HTMLButtonElement, DismissButtonProps>(
  function DismissButton(
    {
      onClick,
      variant = 'plain',
      'aria-label': ariaLabel,
      'aria-controls': ariaControls,
      className,
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-controls={ariaControls}
        className={cn(
          'focus-visible:ring-brand-500 flex shrink-0 items-center justify-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-900',
          variant === 'plain' &&
            'absolute top-4 right-4 z-10 p-2 text-neutral-900 hover:bg-neutral-200/90 dark:text-neutral-200 dark:hover:bg-neutral-700/80',
          variant === 'plainNav' &&
            'fixed top-0 right-0 z-[60] flex h-16 items-center p-2 text-neutral-900 hover:bg-neutral-200/90 md:hidden dark:text-neutral-200 dark:hover:bg-neutral-700/80',
          variant === 'brand' && 'brand-icon-btn h-10 w-10 md:h-9 md:w-9',
          className
        )}
      >
        <CloseGraphic
          className={variant === 'brand' ? 'h-5 w-5' : 'h-6 w-6'}
          aria-hidden
        />
      </button>
    );
  }
);

export default DismissButton;
