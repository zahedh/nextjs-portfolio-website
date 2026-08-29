import React from 'react';
import { cn } from '@/lib/utils';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
};

/** Semantic heading component wired to the heading type scale. */
export default function Heading({
  children,
  className,
  as = 'h2',
}: HeadingProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        'font-heading text-heading md:text-heading-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Comp>
  );
}
