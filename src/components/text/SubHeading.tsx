import React from 'react';
import { cn } from '@/lib/utils';

type SubHeadingProps = {
  children: React.ReactNode;
  className?: string;
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
        'font-heading text-title-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Comp>
  );
}
