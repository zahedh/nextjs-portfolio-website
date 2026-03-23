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

const dismissCallbacks = new Set<() => void>();
function dispatchDismiss() {
  dismissCallbacks.forEach((cb) => cb());
}

let scrollListenerAdded = false;
function ensureScrollListener() {
  if (scrollListenerAdded || typeof document === 'undefined') return;
  scrollListenerAdded = true;
  const onScroll = () => dispatchDismiss();
  document.addEventListener('scroll', onScroll, true);
  window.addEventListener('scroll', onScroll, true);
}

export function useSkillTilePortalTooltip() {
  const [isHovering, setIsHovering] = useState(false);
  const clearHoverOnExpire = useCallback(() => setIsHovering(false), []);
  const {
    showTooltip: showClickTooltip,
    handleClick,
    dismiss,
  } = useTooltip(CLICK_TOOLTIP_MS, clearHoverOnExpire);
  const tileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const updateTooltipPosition = useCallback(() => {
    setTooltipPos(getSkillTileTooltipAnchor(tileRef.current));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    ensureScrollListener();
    const dismissAll = () => {
      setIsHovering(false);
      dismiss();
    };
    dismissCallbacks.add(dismissAll);
    return () => {
      dismissCallbacks.delete(dismissAll);
    };
  }, [dismiss]);

  useLayoutEffect(() => {
    if (!isHovering && !showClickTooltip) return;
    updateTooltipPosition();
  }, [isHovering, showClickTooltip, updateTooltipPosition]);

  useEffect(() => {
    if (!isHovering && !showClickTooltip) return;
    const onScrollOrResize = () => updateTooltipPosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isHovering, showClickTooltip, updateTooltipPosition]);

  const tooltipVisible = isHovering || showClickTooltip;

  const onTileClick = () => {
    dispatchDismiss();
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
