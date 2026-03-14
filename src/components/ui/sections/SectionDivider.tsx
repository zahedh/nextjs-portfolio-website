'use client';

import React from 'react';
import clsx from 'clsx';
import { motion } from 'motion/react';

type SectionDividerProps = {
  width?: 'full' | 'half' | 'third';
  align?: 'left' | 'center' | 'right';
  color?: string;
  opacity?: string;
  className?: string;
};

/** Decorative divider bar under section headings – gradient, rounded, with a subtle draw-in when in view. */
export default function SectionDivider({
  width = 'full',
  align = 'left',
  color,
  opacity = 'opacity-90',
  className,
}: SectionDividerProps) {
  const wrapperClass = clsx(
    'overflow-hidden',
    width === 'half' && 'w-1/2',
    width === 'third' && 'w-1/3',
    width === 'full' && 'w-full',
    align === 'center' && 'mx-auto',
    align === 'right' && 'ml-auto',
    className
  );

  const barClass = clsx(
    'h-1 rounded-full',
    opacity,
    color ??
      'bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 dark:from-brand-400 dark:via-brand-500 dark:to-brand-600'
  );

  return (
    <div className={wrapperClass}>
      <motion.div
        className={barClass}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        style={{
          transformOrigin:
            align === 'right'
              ? 'right'
              : align === 'center'
                ? 'center'
                : 'left',
        }}
      />
    </div>
  );
}
