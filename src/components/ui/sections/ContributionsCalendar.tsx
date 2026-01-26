'use client';

import { ActivityCalendar } from 'react-activity-calendar';
import type { ActivityCalendarData } from '@/types/github';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/utilityHooks';
import { en } from '@/language';

type ContributionsCalendarProps = {
  activities: ActivityCalendarData[];
  year?: number;
};

export default function ContributionsCalendar({
  activities,
  year,
}: ContributionsCalendarProps) {
  const { isDark } = useTheme();
  const [size, setSize] = useState(getInitialSize);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // sm
        setSize({
          blockSize: 14,
          blockMargin: 4,
          blockRadius: 2,
          fontSize: 13,
        });
      } else if (width < 768) {
        // md
        setSize({
          blockSize: 15,
          blockMargin: 4,
          blockRadius: 3,
          fontSize: 14,
        });
      } else if (width < 1024) {
        // lg
        setSize({
          blockSize: 16,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 15,
        });
      } else if (width < 1280) {
        // xl
        setSize({
          blockSize: 18,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 16,
        });
      } else {
        // 2xl+
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
  }, []);

  return (
    <div className="contributions-calendar">
      <ActivityCalendar
        data={activities}
        theme={{
          light: ['#f2f2f2', '#ecc693', '#e4af67', '#dd993c', '#c37f22'],
          dark: ['#262626', '#bb7a21', '#a96e1e', '#98631b', '#825517'],
        }}
        colorScheme={isDark ? 'dark' : 'light'}
        blockSize={size.blockSize}
        blockMargin={size.blockMargin}
        blockRadius={size.blockRadius}
        fontSize={size.fontSize}
        labels={{
          totalCount: year
            ? en.contributionsCalendar.totalCountYear
                .replace('{{count}}', '{{count}}')
                .replace('{{year}}', String(year))
            : en.contributionsCalendar.totalCount,
        }}
      />
    </div>
  );
}

function getInitialSize() {
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
