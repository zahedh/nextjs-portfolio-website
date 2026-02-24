'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type TertiaryButtonProps = {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconOnly?: boolean;
  onClick?: () => void;
  hyperlink?: string;
  target?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Rounded tertiary button used for tertiary actions. */
export function TertiaryButton({
  children,
  className,
  icon,
  iconOnly = false,
  onClick,
  hyperlink,
  target,
  ...props
}: TertiaryButtonProps) {
  const button = (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        iconOnly ? 'p-2' : 'px-3 py-1.5',
        'rounded-full',
        'border-brand-500 border bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200',
        'font-heading text-base leading-normal font-bold tracking-tight',
        'shadow-sm transition-colors duration-150',
        'hover:bg-brand-600',
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {!iconOnly && children}
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

export default TertiaryButton;
