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
      <div
        className="contributions-calendar card-surface p-8"
        onMouseLeave={handleMouseLeave}
      >
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
            padding: 0,
            border: 'none',
            background: 'transparent',
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
          <div className="contributions-tooltip-box">
            <div className="text-sm font-semibold whitespace-nowrap">
              {getContributionText(tooltip.count)}
            </div>
            <div className="text-xs whitespace-nowrap opacity-75">
              {formatTooltipDate(tooltip.date)}
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="contributions-tooltip-arrow" />
        </div>
      )}
    </>
  );
}
