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
        'font-body text-body tracking-tight text-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </p>
  );
}
