import React from 'react';
import { cn } from '@/lib/utils';

type SubHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SubHeading({ children, className }: SubHeadingProps) {
  return (
    <h3
      className={cn(
        'font-heading text-lg leading-tight font-semibold tracking-tight text-neutral-900 sm:text-xl md:text-2xl dark:text-neutral-200',
        className
      )}
    >
      {children}
    </h3>
  );
}
