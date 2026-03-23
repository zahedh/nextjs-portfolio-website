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
        'font-heading text-xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Comp>
  );
}
