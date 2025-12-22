'use client';
import clsx from 'clsx';
import { IconType } from 'react-icons';
import { useTooltip } from '@/hooks/tileHooks';

type SkillTileProps = {
  icon: IconType;
  label: string;
  className?: string;
};

/** Circular icon tile representing a single skill with tooltip. */
export function SkillTile({ icon: Icon, label, className }: SkillTileProps) {
  const { showTooltip, handleClick } = useTooltip(2000);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        // Layout
        'group relative inline-flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16',
        // Shape
        'rounded-full',
        // Style: pill with brand border/background
        'border-brand-500 bg-brand-300 border text-neutral-900 dark:text-neutral-200',
        // Effects
        'shadow-sm transition-all duration-300 hover:scale-110',
        // Interactions
        'hover:bg-brand-500 cursor-pointer',
        className
      )}
    >
      {/* Icon */}
      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />

      {/* Tooltip - shows on hover and click */}
      <div className={clsx('hover-tooltip', showTooltip && '!opacity-100')}>
        {label}
      </div>
    </div>
  );
}

export default SkillTile;
