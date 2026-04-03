'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hyperlink?: string;
  target?: string;
  'aria-label'?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 font-heading text-base leading-normal font-bold tracking-tight bg-brand-500 text-neutral-900 dark:text-neutral-200 shadow-sm transition-colors duration-150 hover:bg-brand-600';

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
  if (hyperlink) {
    return (
      <a
        href={hyperlink}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={cn(baseClass, className)}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(baseClass, className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
