import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

type SubHeadingProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export default function SubHeading({
  children,
  as: Component = 'h3',
  className,
}: SubHeadingProps) {
  return (
    <Component
      className={cn(
        'font-heading text-lg leading-tight font-semibold tracking-tight sm:text-xl md:text-2xl text-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Component>
  );
}
