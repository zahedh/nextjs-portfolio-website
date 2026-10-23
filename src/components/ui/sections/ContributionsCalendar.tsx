'use client';

import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildContributionGrid } from '@/lib/ui-logic';
import { ActivityCalendarData } from '@/types/github';
import { en } from '@/language';
import {
  formatTooltipDate,
  getContributionText,
  useContributionTooltip,
  useScrollEdges,
} from '@/hooks/contributionsCalendarHooks';

/** GitHub grades a day 0–4; each step has its own cell colour, per theme. */
const LEVELS = [0, 1, 2, 3, 4];

type ContributionsCalendarProps = {
  activities: ActivityCalendarData[];
  /** The sentence the figure and its label already say, for assistive tech. */
  summary: string;
  /**
   * These are stand-in days for a year still in flight. They hold the finished
   * layout, so they must not answer a hover with `No contributions` as though
   * that were the answer.
   */
  pending?: boolean;
};

export default function ContributionsCalendar({
  activities,
  summary,
  pending = false,
}: ContributionsCalendarProps) {
  const { weeks, months } = buildContributionGrid(activities);
  const { tooltip, handleMouseOver, handleMouseLeave } =
    useContributionTooltip();
  const { ref: scrollRef, edges } = useScrollEdges<HTMLDivElement>();

  // Most of a view per click, so the weeks just passed stay in sight as an
  // anchor. The scroller's own scroll-behavior decides smooth or instant.
  const scrollByView = (direction: -1 | 1) => {
    const element = scrollRef.current;
    element?.scrollBy({ left: direction * element.clientWidth * 0.8 });
  };

  return (
    <div
      className={cn('contrib-chart', pending && 'is-pending')}
      style={{ '--contrib-weeks': weeks.length } as React.CSSProperties}
    >
      {/* A mouse has no sideways gesture, so where a side still has weeks
          behind its fade, a button over that edge scrolls to them. Touch
          swipes, and the buttons stay hidden there. */}
      <div className="contrib-scroll-frame">
        <button
          type="button"
          className="contrib-scroll-button contrib-scroll-button-start"
          aria-label={en.contributionsCalendar.scrollEarlier}
          hidden={edges === 'none' || edges === 'start'}
          onClick={() => scrollByView(-1)}
        >
          <ChevronLeft aria-hidden className="size-4" />
        </button>
        <button
          type="button"
          className="contrib-scroll-button contrib-scroll-button-end"
          aria-label={en.contributionsCalendar.scrollLater}
          hidden={edges === 'none' || edges === 'end'}
          onClick={() => scrollByView(1)}
        >
          <ChevronRight aria-hidden className="size-4" />
        </button>

        {/* Both rows sit on identical fixed tracks, so a month label cannot drift
          from the weeks beneath it, and both scroll together as one. */}
        <div
          ref={scrollRef}
          data-edges={edges}
          className="contrib-scroll"
          role="img"
          aria-label={summary}
          tabIndex={0}
          onMouseOver={pending ? undefined : handleMouseOver}
          onMouseLeave={pending ? undefined : handleMouseLeave}
        >
          <div className="contrib-months">
            {months.map((month) => (
              <div key={month.key} style={{ gridColumn: `span ${month.span}` }}>
                {month.label}
              </div>
            ))}
          </div>

          <div className="contrib-grid">
            {weeks.map((week, weekIndex) =>
              week.map((day, weekday) =>
                day ? (
                  <i
                    key={day.date}
                    className={cn('contrib-cell', `contrib-cell-${day.level}`)}
                    data-date={day.date}
                    data-count={day.count}
                  />
                ) : (
                  <i
                    key={`pad-${weekIndex}-${weekday}`}
                    className="contrib-cell invisible"
                  />
                )
              )
            )}
          </div>
        </div>
      </div>

      <div className="contrib-legend" aria-hidden="true">
        <span>{en.contributionsCalendar.less}</span>
        {LEVELS.map((level) => (
          <i
            key={level}
            className={cn('contrib-legend-dot', `contrib-cell-${level}`)}
          />
        ))}
        <span>{en.contributionsCalendar.more}</span>
      </div>

      {tooltip &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="animate-in fade-in zoom-in-95 pointer-events-none fixed z-50 duration-150"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="contributions-tooltip-box">
              <div className="text-body-sm font-semibold whitespace-nowrap">
                {getContributionText(tooltip.count)}
              </div>
              <div className="text-caption whitespace-nowrap opacity-75">
                {formatTooltipDate(tooltip.date)}
              </div>
            </div>
            <div className="contributions-tooltip-arrow" />
          </div>,
          document.body
        )}
    </div>
  );
}
