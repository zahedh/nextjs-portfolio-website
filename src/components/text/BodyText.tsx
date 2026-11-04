import React from 'react';
import { cn } from '@/lib/utils';

type BodyTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function BodyText({ children, className }: BodyTextProps) {
  return (
    <p className={cn('font-body text-body text-fg tracking-tight', className)}>
      {children}
    </p>
  );
}
