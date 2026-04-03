import { useEffect, useState } from 'react';
import { en } from '@/language';
import type { ActivityCalendarData } from '@/types/github';

export type CalendarSize = {
  blockSize: number;
  blockMargin: number;
  blockRadius: number;
  fontSize: number;
};

export type TooltipData = {
  count: number;
  date: string;
  x: number;
  y: number;
};

/** Single source of truth for breakpoint-to-size mapping. */
function calendarSizeForWidth(width: number): CalendarSize {
  if (width < 640)
    return { blockSize: 14, blockMargin: 4, blockRadius: 2, fontSize: 13 };
  if (width < 768)
    return { blockSize: 15, blockMargin: 4, blockRadius: 3, fontSize: 14 };
  if (width < 1024)
    return { blockSize: 16, blockMargin: 5, blockRadius: 3, fontSize: 15 };
  if (width < 1280)
    return { blockSize: 18, blockMargin: 5, blockRadius: 3, fontSize: 16 };
  return { blockSize: 20, blockMargin: 6, blockRadius: 4, fontSize: 16 };
}

export function getInitialSize(): CalendarSize {
  if (typeof window === 'undefined') {
    return calendarSizeForWidth(1280);
  }
  return calendarSizeForWidth(window.innerWidth);
}

export function useResponsiveCalendarSize(
  setSize: (size: CalendarSize) => void
) {
  useEffect(() => {
    const updateSize = () => setSize(calendarSizeForWidth(window.innerWidth));
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [setSize]);
}

/** Format date for tooltip display */
export function formatTooltipDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
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

/** Custom hook to manage contribution tooltip state and handlers */
export function useContributionTooltip(activities: ActivityCalendarData[]) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  useEffect(() => {
    const dismiss = () => setTooltip(null);
    document.addEventListener('touchstart', dismiss, { passive: true });
    return () => document.removeEventListener('touchstart', dismiss);
  }, []);

  const handleMouseEnter = (event: React.MouseEvent<SVGRectElement>) => {
    const target = event.currentTarget;
    const date = target.getAttribute('data-date');

    if (!date) return;

    const activity = activities.find((entry) => entry.date === date);
    if (!activity) return;

    const rect = target.getBoundingClientRect();
    setTooltip({
      count: activity.count,
      date: activity.date,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return {
    tooltip,
    handleMouseEnter,
    handleMouseLeave,
  };
}
