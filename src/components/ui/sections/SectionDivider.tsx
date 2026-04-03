import React from 'react';
import { cn } from '@/lib/utils';

type SectionDividerProps = {
  width?: 'full' | 'half' | 'third';
  align?: 'left' | 'center' | 'right';
  color?: string;
  opacity?: string;
  className?: string;
};

/** Decorative divider bar displayed under section headings. */
export default function SectionDivider({
  width = 'full',
  align = 'left',
  color = 'bg-brand-600 dark:bg-brand-400',
  opacity = 'opacity-70',
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        'h-[3px]',
        width === 'half' && 'w-1/2',
        width === 'third' && 'w-1/3',
        width === 'full' && 'w-full',
        align === 'center' && 'mx-auto',
        align === 'right' && 'ml-auto',
        color,
        opacity,
        className
      )}
    />
  );
}
