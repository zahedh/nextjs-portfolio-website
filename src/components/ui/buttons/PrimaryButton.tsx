'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Rounded primary button used for main actions. */
export function PrimaryButton({
  children,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        // Layout
        'inline-flex items-center justify-center gap-2 px-3 py-1.5',
        // Shape
        'rounded-full',
        // Colours
        'bg-brand-500 text-neutral-900 dark:text-neutral-200',
        // Typography
        'font-heading text-base leading-normal font-bold tracking-tight',
        // Effects
        'shadow-sm transition-colors duration-150',
        // Interactions
        'hover:bg-brand-600',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
