'use client';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import { createPortal } from 'react-dom';
import { useSkillTilePortalTooltip } from '@/hooks/skillTilePortalTooltip';
import { getSkillTileTooltipTransform } from '@/lib';

type SkillTileProps = {
  icon: IconType;
  label: string;
  className?: string;
  compact?: boolean;
};

/** Circular icon tile representing a single skill with tooltip. */
export function SkillTile({
  icon: Icon,
  label,
  className,
  compact = false,
}: SkillTileProps) {
  const {
    tileRef,
    mounted,
    tooltipVisible,
    tooltipPos,
    onTileMouseEnter,
    onTileMouseLeave,
  } = useSkillTilePortalTooltip();

  const tooltipNode =
    mounted &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        role="tooltip"
        className={cn(
          'skill-tile-tooltip',
          tooltipVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          left: tooltipPos.x,
          top: tooltipPos.y,
          transform: getSkillTileTooltipTransform(),
        }}
      >
        {label}
      </div>,
      document.body
    );

  return (
    <>
      <div
        ref={tileRef}
        role="img"
        aria-label={label}
        onMouseEnter={onTileMouseEnter}
        onMouseLeave={onTileMouseLeave}
        className={cn(
          compact
            ? 'relative inline-flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12'
            : 'relative inline-flex h-12 w-12 items-center justify-center lg:h-14 lg:w-14',
          'rounded-full',
          'border-brand-500 border',
          'bg-brand-200 dark:bg-brand-400',
          'text-neutral-900 dark:text-neutral-200',
          'hover:bg-brand-400 dark:hover:bg-brand-600',
          'shadow-sm transition-transform duration-150 hover:scale-110 active:scale-90',
          'cursor-default',
          className
        )}
      >
        <Icon
          className={
            compact ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-6 w-6 lg:h-7 lg:w-7'
          }
        />
      </div>
      {tooltipNode}
    </>
  );
}

export default SkillTile;
