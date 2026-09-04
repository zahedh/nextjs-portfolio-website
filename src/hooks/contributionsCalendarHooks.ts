import { useEffect, useRef, useState } from 'react';
import { en } from '@/language';

export type TooltipData = {
  count: number;
  date: string;
  x: number;
  y: number;
};

/** Format date for tooltip display */
export function formatTooltipDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Get contribution text with proper singular/plural handling */
export function getContributionText(count: number): string {
  if (count === 0) return en.contributionsCalendar.noContributions;
  if (count === 1) return `1 ${en.contributionsCalendar.contributionsSingular}`;
  return `${count} ${en.contributionsCalendar.contributions}`;
}

/**
 * Manages the contribution tooltip. One delegated handler on the grid rather
 * than a listener per cell — the day is read off the cell's own dataset.
 */
export function useContributionTooltip() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  useEffect(() => {
    const dismiss = () => setTooltip(null);
    document.addEventListener('touchstart', dismiss, { passive: true });
    return () => document.removeEventListener('touchstart', dismiss);
  }, []);

  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-date]'
    );
    if (!cell) return;

    const rect = cell.getBoundingClientRect();
    setTooltip({
      count: Number(cell.dataset.count),
      date: cell.dataset.date as string,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return {
    tooltip,
    handleMouseOver,
    handleMouseLeave,
  };
}

/** Which edges of a horizontal scroller still have content beyond them. */
export type ScrollEdges = 'none' | 'start' | 'middle' | 'end';

/**
 * Reports scroll position as an edge state so CSS can fade the side that has
 * more behind it. This replaces the native scrollbar as the affordance: the
 * browser flashes an overlay scrollbar on load and fades it on interaction,
 * which is unstyleable and differs per platform.
 */
export function useScrollEdges<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState<ScrollEdges>('none');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const overflow = element.scrollWidth - element.clientWidth;
      // A sub-pixel container width leaves a fractional overflow that is not
      // really scrollable, so tolerate a pixel at each end.
      if (overflow <= 1) return setEdges('none');
      if (element.scrollLeft <= 1) return setEdges('start');
      if (element.scrollLeft >= overflow - 1) return setEdges('end');
      setEdges('middle');
    };

    update();
    element.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      element.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  return { ref, edges };
}
