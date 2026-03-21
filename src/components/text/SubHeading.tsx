import React from 'react';
import { cn } from '@/lib/utils';

type SubHeadingProps = {
  children: React.ReactNode;
  className?: string;
  /** Semantic level; default `h3`. Use `h1` for the hero intro line. */
  as?: 'h1' | 'h2' | 'h3';
};

export default function SubHeading({
  children,
  className,
  as = 'h3',
}: SubHeadingProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        'font-heading text-lg leading-tight font-semibold tracking-tight text-neutral-900 sm:text-xl md:text-2xl dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Comp>
  );
}
