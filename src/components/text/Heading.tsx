import React from 'react';
import { cn } from '@/lib/utils';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

/** Semantic heading component wired to the heading type scale. */
export default function Heading({ children, className }: HeadingProps) {
  return (
    <h2
      className={cn(
        'font-heading text-xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl dark:text-neutral-200',
        className
      )}
    >
      {children}
    </h2>
  );
}
