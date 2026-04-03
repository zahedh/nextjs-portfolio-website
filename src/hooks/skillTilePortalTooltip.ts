import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { getSkillTileTooltipAnchor } from '@/lib/ui-logic';

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
    const onScroll = () => setIsHovering(false);
    const onResize = () => updateTooltipPosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
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
