'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hyperlink?: string;
  target?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Rounded primary button used for main actions. */
export function PrimaryButton({
  children,
  className,
  onClick,
  hyperlink,
  target,
  ...props
}: PrimaryButtonProps) {
  const button = (
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
      {...props}
    >
      {children}
    </button>
  );
  if (hyperlink) {
    return (
      <a
        href={hyperlink}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        style={{ display: 'inline-flex' }}
      >
        {button}
      </a>
    );
  }
  return button;
}

export default PrimaryButton;
