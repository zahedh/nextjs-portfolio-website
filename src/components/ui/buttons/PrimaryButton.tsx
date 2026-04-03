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
        className={cn('btn-primary', className)}
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
      className={cn('btn-primary', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
