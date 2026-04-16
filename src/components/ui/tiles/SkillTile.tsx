'use client';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import { useDoubleActivation } from '@/hooks/useDoubleActivation';
import { useSkillTilePortalTooltip } from '@/hooks/skillTilePortalTooltip';
import { getSkillTileTooltipTransform } from '@/lib';
import { getSkillsIdleItemVariants } from '@/lib/ui-logic/skillsCollageMotion';

type SkillTileProps = {
  icon: IconType;
  label: string;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
  /** Stagger delay (seconds) for idle glow animation, to offset tiles like floating orbs */
  idleDelay?: number;
};

/** Circular icon tile representing a single skill with tooltip. */
export function SkillTile({
  icon: Icon,
  label,
  className,
  compact = false,
  onClick,
  idleDelay = 0,
}: SkillTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
  const idleAnimation = getSkillsIdleItemVariants(
    prefersReducedMotion,
    idleDelay
  );

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
      <motion.div
        {...idleAnimation}
        animate={isHovered ? {} : idleAnimation.animate}
      >
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
          onMouseEnter={() => {
            setIsHovered(true);
            onTileMouseEnter();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            onTileMouseLeave();
          }}
          style={!isHovered ? { animationDelay: `${idleDelay}s` } : undefined}
          className={cn(
            compact
              ? 'relative inline-flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12'
              : 'relative inline-flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16',
            'rounded-full',
            'border-brand-500 border',
            'bg-brand-200 dark:bg-brand-400',
            'text-neutral-900 dark:text-neutral-200',
            'hover:bg-brand-400 dark:hover:bg-brand-700',
            'shadow-sm transition-transform duration-150 hover:scale-110 active:scale-90',
            !isHovered && 'skill-tile-glow',
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
      </motion.div>
      {tooltipNode}
    </>
  );
}

export default SkillTile;
