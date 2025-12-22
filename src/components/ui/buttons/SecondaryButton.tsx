'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type SecondaryButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Rounded secondary button used for supporting actions. */
export function SecondaryButton({
  children,
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        // Layout
        'inline-flex items-center justify-center gap-2 px-3 py-1.5',
        // Shape
        'rounded-full',
        // Light mode secondary style: white pill with brand border/text
        'border-brand-500 bg-brand-400 border text-neutral-900 dark:text-neutral-200',
        // Typography
        'font-heading text-sm font-bold',
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

export default SecondaryButton;
