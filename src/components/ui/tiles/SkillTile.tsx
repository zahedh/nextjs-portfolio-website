import clsx from 'clsx';
import { IconType } from 'react-icons';

type SkillTileProps = {
  icon: IconType;
  label: string;
  className?: string;
};

export function SkillTile({ icon: Icon, label, className }: SkillTileProps) {
  return (
    <div
      className={clsx(
        // Layout
        'group relative inline-flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16',
        // Shape
        'rounded-full',
        // Style: pill with brand border/background
        'border-brand-500 bg-brand-300 border text-neutral-900 dark:text-neutral-200',
        // Effects
        'shadow-sm transition-all duration-300 hover:scale-110',
        className
      )}
    >
      {/* Icon */}
      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />

      {/* Tooltip on hover */}
      <div className="hover-tooltip">{label}</div>
    </div>
  );
}

export default SkillTile;
