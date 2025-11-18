import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

type BodyTextProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export default function BodyText({
  children,
  as: Component = 'p',
  className,
}: BodyTextProps) {
  return (
    <Component
      className={cn(
        'font-body t-sm text-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </Component>
  );
}
