'use client';

import { ActivityCalendar } from 'react-activity-calendar';
import type { ActivityCalendarData } from '@/types/github';
import { useEffect, useState } from 'react';

type ContributionsCalendarProps = {
  activities: ActivityCalendarData[];
};

export default function ContributionsCalendar({
  activities,
}: ContributionsCalendarProps) {
  const [size, setSize] = useState({
    blockSize: 18,
    blockMargin: 5,
    blockRadius: 3,
    fontSize: 14,
  });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // sm
        setSize({
          blockSize: 10,
          blockMargin: 3,
          blockRadius: 2,
          fontSize: 13,
        });
      } else if (width < 768) {
        // md
        setSize({
          blockSize: 12,
          blockMargin: 4,
          blockRadius: 2,
          fontSize: 14,
        });
      } else if (width < 1024) {
        // lg
        setSize({
          blockSize: 14,
          blockMargin: 4,
          blockRadius: 3,
          fontSize: 15,
        });
      } else if (width < 1280) {
        // xl
        setSize({
          blockSize: 16,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 16,
        });
      } else {
        // 2xl+
        setSize({
          blockSize: 18,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 16,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="flex w-full justify-center [&_footer]:mt-6 [&_footer]:font-semibold">
      <ActivityCalendar
        data={activities}
        theme={{
          light: ['#f2f2f2', '#ecc693', '#e4af67', '#dd993c', '#c37f22'],
          dark: ['#262626', '#bb7a21', '#a96e1e', '#98631b', '#825517'],
        }}
        colorScheme="light"
        blockSize={size.blockSize}
        blockMargin={size.blockMargin}
        blockRadius={size.blockRadius}
        fontSize={size.fontSize}
        labels={{
          totalCount: '{{count}} contributions in the last year',
        }}
      />
    </div>
  );
}
