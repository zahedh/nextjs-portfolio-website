'use client';

import React, { useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import type { ActivityCalendarData } from '@/types/github';
import { useTheme } from '@/hooks/utilityHooks';
import { en } from '@/language';
import {
  getInitialSize,
  useResponsiveCalendarSize,
  useContributionTooltip,
  formatTooltipDate,
  getContributionText,
} from '@/hooks/contributionsCalendarHooks';

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
  const { tooltip, handleMouseEnter, handleMouseLeave } =
    useContributionTooltip(activities);
  useResponsiveCalendarSize(setSize);

  return (
    <>
      <div className="contributions-calendar" onMouseLeave={handleMouseLeave}>
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
          renderBlock={(block, _activity) =>
            React.cloneElement(block, {
              onMouseEnter: handleMouseEnter,
              style: {
                ...block.props.style,
                cursor: 'pointer',
              },
            })
          }
        />
      </div>

      {/* Custom Tooltip */}
      {tooltip && (
        <div
          className="animate-in fade-in zoom-in-95 pointer-events-none fixed z-50 duration-150"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="rounded-lg bg-neutral-900 px-3 py-2 text-white shadow-xl backdrop-blur-sm dark:bg-neutral-100 dark:text-neutral-900">
            <div className="text-sm font-semibold whitespace-nowrap">
              {getContributionText(tooltip.count)}
            </div>
            <div className="text-xs whitespace-nowrap opacity-75">
              {formatTooltipDate(tooltip.date)}
            </div>
          </div>
          {/* Tooltip arrow */}
          <div
            className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900 dark:bg-neutral-100"
            style={{ zIndex: -1 }}
          />
        </div>
      )}
    </>
  );
}
