'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Section, PrimaryButton, BodyText } from '@/components';
import { en } from '@/language';
import { cn, sumContributions } from '@/lib/utils';
import { buildEmptyYear } from '@/lib/ui-logic';
import { ActivityCalendarData } from '@/types/github';
import ContributionsCalendar from './ContributionsCalendar';

/** The activity band under the hero: a year's total, its pills, and the year. */
export default function ContributionsSection() {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [activities, setActivities] = useState<ActivityCalendarData[]>([]);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  const cache = useRef<Record<number, ActivityCalendarData[]>>({});
  const inFlight = useRef<Record<number, Promise<ActivityCalendarData[]>>>({});

  /**
   * One request per year for the life of the page. The in-flight map matters as
   * much as the cache: hovering a pill and then clicking it must not fetch the
   * same year twice, since this endpoint is rate-limited without a token.
   */
  const fetchYear = useCallback((year: number) => {
    const cached = cache.current[year];
    if (cached) return Promise.resolve(cached);

    const existing = inFlight.current[year];
    if (existing) return existing;

    const load = async (): Promise<ActivityCalendarData[]> => {
      try {
        const response = await fetch(`/api/contributions?year=${year}`);
        if (!response.ok) throw new Error(`Contributions ${response.status}`);
        const data: { activities: ActivityCalendarData[] } =
          await response.json();
        cache.current[year] = data.activities;
        return data.activities;
      } finally {
        delete inFlight.current[year];
      }
    };

    const request = load();
    inFlight.current[year] = request;
    return request;
  }, []);

  useEffect(() => {
    let live = true;

    const cached = cache.current[selectedYear];
    if (cached) {
      setActivities(cached);
      setFailed(false);
      setLoading(false);
      return;
    }

    const show = async () => {
      setLoading(true);
      try {
        const loaded = await fetchYear(selectedYear);
        if (!live) return;
        // Deliberately no `setActivities([])` on the way in: the year already on
        // screen stays until the next one is ready, so the band never collapses.
        setActivities(loaded);
        setFailed(false);
      } catch {
        if (live) setFailed(true);
      } finally {
        if (live) setLoading(false);
      }
    };
    void show();

    return () => {
      live = false;
    };
  }, [selectedYear, fetchYear]);

  /** Warm the other year before the press lands. */
  const prefetch = (year: number) => {
    fetchYear(year).catch(() => {});
  };

  const total = sumContributions(activities);
  const summary = en.contributionsCalendar.totalCountYear
    .replace('{{count}}', String(total))
    .replace('{{year}}', String(selectedYear));

  const updating = loading && activities.length > 0;

  /**
   * Nothing has arrived yet. The figure would read a confident `0` and the
   * calendar's slot would hold a line of body copy, so a cold load looked
   * unstyled rather than pending. Both stand in at their finished size instead:
   * an empty year under the calendar, and the figure painted over its own text.
   */
  const pending = !failed && activities.length === 0;

  return (
    <Section anchor="contributions" banded>
      <div
        className={cn('contrib-band', updating && 'contrib-band--updating')}
        aria-busy={loading}
      >
        <div className="contrib-figure-group">
          <div className="contrib-figure-row">
            <span className={cn('contrib-figure', pending && 'is-pending')}>
              {pending ? '000' : total}
            </span>
            <span className="contrib-label">
              {en.contributionsCalendar.label}
            </span>
          </div>
          <div className="contrib-years">
            {[currentYear, previousYear].map((year) => (
              <PrimaryButton
                key={year}
                onClick={() => setSelectedYear(year)}
                onPointerEnter={() => prefetch(year)}
                onFocus={() => prefetch(year)}
                aria-pressed={selectedYear === year}
                className={cn(
                  'contrib-year-pill filter-pill',
                  selectedYear === year && 'filter-pill-selected'
                )}
              >
                {year}
              </PrimaryButton>
            ))}
          </div>
        </div>

        {failed ? (
          <BodyText className="text-fg-secondary">
            {en.contributionsSection.error}
          </BodyText>
        ) : (
          <ContributionsCalendar
            activities={pending ? buildEmptyYear(selectedYear) : activities}
            summary={pending ? en.contributionsSection.loading : summary}
            pending={pending}
          />
        )}
      </div>
    </Section>
  );
}
