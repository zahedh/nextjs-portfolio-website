import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

type HeadingProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Allows 'h1'–'h6'
  className?: string;
};

/** Semantic heading component wired to the heading type scale. */
export default function Heading({
  children,
  as: Component = 'h2',
  className,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        'font-heading text-xl leading-tight font-bold tracking-tight sm:text-2xl md:text-3xl text-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Component>
  );
}
