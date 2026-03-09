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

export function getInitialSize(): CalendarSize {
  if (typeof window === 'undefined') {
    return { blockSize: 18, blockMargin: 5, blockRadius: 3, fontSize: 14 };
  }
  const width = window.innerWidth;
  if (width < 640) {
    return { blockSize: 14, blockMargin: 4, blockRadius: 2, fontSize: 13 };
  } else if (width < 768) {
    return { blockSize: 15, blockMargin: 4, blockRadius: 3, fontSize: 14 };
  } else if (width < 1024) {
    return { blockSize: 16, blockMargin: 5, blockRadius: 3, fontSize: 15 };
  } else if (width < 1280) {
    return { blockSize: 18, blockMargin: 5, blockRadius: 3, fontSize: 16 };
  } else {
    return { blockSize: 20, blockMargin: 6, blockRadius: 4, fontSize: 16 };
  }
}

export function useResponsiveCalendarSize(
  setSize: (size: CalendarSize) => void
) {
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSize({
          blockSize: 14,
          blockMargin: 4,
          blockRadius: 2,
          fontSize: 13,
        });
      } else if (width < 768) {
        setSize({
          blockSize: 15,
          blockMargin: 4,
          blockRadius: 3,
          fontSize: 14,
        });
      } else if (width < 1024) {
        setSize({
          blockSize: 16,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 15,
        });
      } else if (width < 1280) {
        setSize({
          blockSize: 18,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 16,
        });
      } else {
        setSize({
          blockSize: 20,
          blockMargin: 6,
          blockRadius: 4,
          fontSize: 16,
        });
      }
    };
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

  const handleMouseEnter = (event: React.MouseEvent<SVGRectElement>) => {
    const target = event.currentTarget;
    const date = target.getAttribute('data-date');
    const level = target.getAttribute('data-level');

    if (!date || level === null) return;

    const activity = activities.find((a) => a.date === date);
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
