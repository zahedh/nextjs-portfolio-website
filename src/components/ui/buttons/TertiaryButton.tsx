'use client';

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
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

const tertiaryStyles = (
  className: string | undefined,
  iconOnly: boolean
) =>
  clsx(
    'inline-flex items-center justify-center gap-2',
    iconOnly ? 'p-2' : 'px-3 py-1.5',
    'rounded-full',
    'border-brand-500 border bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200',
    'font-heading text-base leading-normal font-bold tracking-tight',
    'shadow-sm transition-colors duration-150',
    'hover:bg-brand-600',
    className
  );

/** Rounded tertiary button used for tertiary actions. With `hyperlink`, renders a styled anchor (no nested button). */
export function TertiaryButton({
  children,
  className,
  icon,
  iconOnly = false,
  onClick,
  hyperlink,
  target,
  'aria-label': ariaLabel,
  id,
  ...rest
}: TertiaryButtonProps) {
  const styles = tertiaryStyles(className, iconOnly);

  const inner = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {!iconOnly && children}
    </>
  );

  if (hyperlink) {
    return (
      <a
        href={hyperlink}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={styles}
        aria-label={ariaLabel}
        id={id}
        onClick={onClick}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles}
      aria-label={ariaLabel}
      id={id}
      {...rest}
    >
      {inner}
    </button>
  );
}

export default TertiaryButton;
