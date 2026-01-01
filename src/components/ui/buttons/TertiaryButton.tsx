'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type TertiaryButtonProps = {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconOnly?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Rounded tertiary button used for tertiary actions. */
export function TertiaryButton({
  children,
  className,
  icon,
  iconOnly = false,
  ...props
}: TertiaryButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        // Layout
        'inline-flex items-center justify-center gap-2',
        iconOnly ? 'p-2' : 'px-3 py-1.5',
        // Shape
        'rounded-full',
        // Colours
        'border-brand-500 border bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200',
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
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {!iconOnly && children}
    </button>
  );
}

export default TertiaryButton;
