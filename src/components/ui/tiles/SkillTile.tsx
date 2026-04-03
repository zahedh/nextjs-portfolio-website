'use client';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import { createPortal } from 'react-dom';
import { useDoubleActivation } from '@/hooks/useDoubleActivation';
import { useSkillTilePortalTooltip } from '@/hooks/skillTilePortalTooltip';
import { getSkillTileTooltipTransform } from '@/lib';

type SkillTileProps = {
  icon: IconType;
  label: string;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
};

/** Circular icon tile representing a single skill with tooltip. */
export function SkillTile({
  icon: Icon,
  label,
  className,
  compact = false,
  onClick,
}: SkillTileProps) {
  const {
    tileRef,
    mounted,
    tooltipVisible,
    tooltipPos,
    onTileMouseEnter,
    onTileMouseLeave,
  } = useSkillTilePortalTooltip();

  const isClickable = Boolean(onClick);
  const tryDoubleActivate = useDoubleActivation(onClick, isClickable);

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
        role={isClickable ? 'button' : 'img'}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={label}
        onClick={isClickable ? tryDoubleActivate : undefined}
        onKeyDown={
          isClickable
            ? (keyboardEvent: React.KeyboardEvent<HTMLDivElement>) => {
                if (
                  keyboardEvent.key === 'Enter' ||
                  keyboardEvent.key === ' '
                ) {
                  keyboardEvent.preventDefault();
                  tryDoubleActivate();
                }
              }
            : undefined
        }
        onMouseEnter={onTileMouseEnter}
        onMouseLeave={onTileMouseLeave}
        className={cn(
          compact
            ? 'relative inline-flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12'
            : 'relative inline-flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16',
          'rounded-full',
          'border-brand-500 bg-brand-300 border text-neutral-900 dark:text-neutral-200',
          'shadow-sm transition-transform duration-150 hover:scale-110 active:scale-90',
          'hover:bg-brand-500',
          isClickable ? 'cursor-pointer' : 'cursor-default',
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
