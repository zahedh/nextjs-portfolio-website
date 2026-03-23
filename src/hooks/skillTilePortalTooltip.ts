import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { getSkillTileTooltipAnchor } from '@/lib/skillTileTooltip';

export function useSkillTilePortalTooltip() {
  const [isHovering, setIsHovering] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const updateTooltipPosition = useCallback(() => {
    requestAnimationFrame(() => {
      setTooltipPos(getSkillTileTooltipAnchor(tileRef.current));
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isHovering) return;
    updateTooltipPosition();
  }, [isHovering, updateTooltipPosition]);

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

  return {
    tileRef,
    mounted,
    tooltipVisible: isHovering,
    tooltipPos,
    onTileMouseEnter: useCallback(() => {
      updateTooltipPosition();
      setIsHovering(true);
    }, [updateTooltipPosition]),
    onTileMouseLeave: useCallback(() => setIsHovering(false), []),
  };
}
