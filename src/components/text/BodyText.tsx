import React from 'react';
import { cn } from '@/lib/utils';

type BodyTextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BodyText({ children, className }: BodyTextProps) {
  return (
    <p
      className={cn(
        'font-body text-sm leading-normal tracking-tight text-neutral-900 sm:text-base md:text-lg dark:text-neutral-200',
        className
      )}
    >
      {children}
    </p>
  );
}
