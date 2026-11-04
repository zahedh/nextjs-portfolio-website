import React from 'react';
import { cn } from '@/lib/utils';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
};

/** Semantic heading component wired to the heading type scale. */
export function Heading({ children, className, as = 'h2' }: HeadingProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        'font-display text-heading lg:text-heading-lg 2xl:text-display text-fg font-bold tracking-tight',
        className
      )}
    >
      {children}
    </Comp>
  );
}
