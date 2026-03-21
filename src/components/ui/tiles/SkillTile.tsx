'use client';
import clsx from 'clsx';
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

const tooltipSurfaceClass =
  'pointer-events-none fixed z-[9999] rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-neutral-200 shadow-lg transition-opacity duration-200 dark:bg-neutral-100 dark:text-neutral-900';

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
    onTileClick,
    onTileMouseEnter,
    onTileMouseLeave,
  } = useSkillTilePortalTooltip();

  const tooltipNode =
    mounted &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        role="tooltip"
        className={clsx(
          tooltipSurfaceClass,
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
        onClick={onTileClick}
        onMouseEnter={onTileMouseEnter}
        onMouseLeave={onTileMouseLeave}
        className={clsx(
          compact
            ? 'relative inline-flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12'
            : 'relative inline-flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16',
          'rounded-full',
          'border-brand-500 bg-brand-300 border text-neutral-900 dark:text-neutral-200',
          'shadow-sm transition-all duration-300 hover:scale-110',
          'hover:bg-brand-500 cursor-pointer',
          className
        )}
      >
        <Icon
          className={
            compact ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-7 w-7 sm:h-8 sm:w-8'
          }
        />
      </div>
      {tooltipNode}
    </>
  );
}

export default SkillTile;
