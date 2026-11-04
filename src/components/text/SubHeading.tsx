import React from 'react';
import { cn } from '@/lib/utils';

type SubHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
};

export function SubHeading({
  children,
  className,
  as = 'h3',
}: SubHeadingProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        'font-heading text-title-sm text-fg font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </Comp>
  );
}
