import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

type HeadingProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Allows 'h1'–'h6'
  className?: string;
};

export default function Heading({
  children,
  as: Component = 'h2',
  className,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        'font-heading t-2xl text-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Component>
  );
}
