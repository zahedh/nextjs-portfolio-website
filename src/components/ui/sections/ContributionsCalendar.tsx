'use client';

import { ActivityCalendar } from 'react-activity-calendar';
import type { ActivityCalendarData } from '@/types/github';
import { useTheme } from '@/hooks/utilityHooks';
import { en } from '@/language';
import {
  getInitialSize,
  useResponsiveCalendarSize,
} from '@/hooks/contributionsCalendarHooks';
import { useState } from 'react';

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
  useResponsiveCalendarSize(setSize);

  return (
    <div className="contributions-calendar">
      <ActivityCalendar
        data={activities}
        theme={{
          light: [
            'var(--color-neutral-100)',
            'var(--color-brand-300)',
            'var(--color-brand-400)',
            'var(--color-brand-500)',
            'var(--color-brand-600)',
          ],
          dark: [
            'var(--color-neutral-900)',
            'var(--color-brand-300)',
            'var(--color-brand-400)',
            'var(--color-brand-500)',
            'var(--color-brand-600)',
          ],
        }}
        colorScheme={isDark ? 'dark' : 'light'}
        blockSize={size.blockSize}
        blockMargin={size.blockMargin}
        blockRadius={size.blockRadius}
        style={{
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: isDark
            ? 'var(--color-brand-300)'
            : 'var(--color-brand-300)',
          borderRadius: '1rem',
          padding: '2rem',
          transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
        }}
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
