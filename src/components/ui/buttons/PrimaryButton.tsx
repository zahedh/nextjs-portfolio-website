'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hyperlink?: string;
  target?: string;
  'aria-label'?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Rounded primary button used for main actions. */
export function PrimaryButton({
  children,
  className,
  onClick,
  hyperlink,
  target,
  'aria-label': ariaLabel,
  ...props
}: PrimaryButtonProps) {
  const button = (
    <span
      className={clsx(
        'inline-flex items-center justify-center gap-2 px-3 py-1.5',
        'rounded-full',
        'bg-brand-500 text-neutral-900 dark:text-neutral-200',
        'font-heading text-base leading-normal font-bold tracking-tight',
        'shadow-sm transition-colors duration-150',
        'hover:bg-brand-600',
        className
      )}
    >
      {children}
    </span>
  );
  if (hyperlink) {
    return (
      <a
        href={hyperlink}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        style={{ display: 'inline-flex' }}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {button}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        'inline-flex items-center justify-center gap-2 px-3 py-1.5',
        'rounded-full',
        'bg-brand-500 text-neutral-900 dark:text-neutral-200',
        'font-heading text-base leading-normal font-bold tracking-tight',
        'shadow-sm transition-colors duration-150',
        'hover:bg-brand-600',
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
