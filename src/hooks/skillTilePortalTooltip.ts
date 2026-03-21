import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { getSkillTileTooltipAnchor } from '@/lib/skillTileTooltip';
import { useTooltip } from './tileHooks';

const CLICK_TOOLTIP_MS = 2000;

/**
 * Portal tooltip for skill tiles: position tracks the tile (scroll/resize while hovering),
 * combines hover + timed click tooltip from {@link useTooltip}.
 */
export function useSkillTilePortalTooltip() {
  const { showTooltip: showClickTooltip, handleClick } =
    useTooltip(CLICK_TOOLTIP_MS);
  const tileRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const updateTooltipPosition = useCallback(() => {
    setTooltipPos(getSkillTileTooltipAnchor(tileRef.current));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isHovering && !showClickTooltip) return;
    updateTooltipPosition();
  }, [isHovering, showClickTooltip, updateTooltipPosition]);

  useEffect(() => {
    if (!isHovering) return;
    const onScrollOrResize = () => updateTooltipPosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isHovering, updateTooltipPosition]);

  const tooltipVisible = isHovering || showClickTooltip;

  const onTileClick = () => {
    updateTooltipPosition();
    handleClick();
  };

  const onTileMouseEnter = () => {
    updateTooltipPosition();
    setIsHovering(true);
  };

  const onTileMouseLeave = () => setIsHovering(false);

  return {
    tileRef,
    mounted,
    tooltipVisible,
    tooltipPos,
    onTileClick,
    onTileMouseEnter,
    onTileMouseLeave,
  };
}
