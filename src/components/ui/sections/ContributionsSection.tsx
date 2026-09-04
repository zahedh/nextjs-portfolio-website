'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Section, PrimaryButton, BodyText } from '@/components';
import { en } from '@/language';
import { cn, sumContributions } from '@/lib/utils';
import { getContributionsBandVariants } from '@/lib/ui-logic';
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
  const prefersReducedMotion = useReducedMotion();

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

    const request = fetch(`/api/contributions?year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        // The route answers 200 with `success: false` when GitHub refuses it.
        if (data.success === false)
          throw new Error('Contributions unavailable');
        const loaded: ActivityCalendarData[] = data.activities || [];
        cache.current[year] = loaded;
        return loaded;
      })
      .finally(() => {
        delete inFlight.current[year];
      });

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

    setLoading(true);
    fetchYear(selectedYear)
      .then((loaded) => {
        if (!live) return;
        // Deliberately no `setActivities([])` on the way in: the year already on
        // screen stays until the next one is ready, so the band never collapses.
        setActivities(loaded);
        setFailed(false);
      })
      .catch((error) => {
        console.error('Failed to load contributions:', error);
        if (live) setFailed(true);
      })
      .finally(() => {
        if (live) setLoading(false);
      });

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

  return (
    <Section anchor="contributions" banded>
      <motion.div
        className={cn('contrib-band', updating && 'contrib-band--updating')}
        variants={getContributionsBandVariants(Boolean(prefersReducedMotion))}
        initial="hidden"
        animate="visible"
        aria-busy={loading}
      >
        <div className="contrib-figure-group">
          <div className="contrib-figure-row">
            <span className="contrib-figure">{total}</span>
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
                className={selectedYear !== year ? 'btn-toggle-idle' : ''}
              >
                {year}
              </PrimaryButton>
            ))}
          </div>
        </div>

        {activities.length > 0 ? (
          <ContributionsCalendar activities={activities} summary={summary} />
        ) : failed || loading ? (
          <BodyText className="text-neutral-600 dark:text-neutral-400">
            {failed
              ? en.contributionsSection.error
              : en.contributionsSection.loading}
          </BodyText>
        ) : null}
      </motion.div>
    </Section>
  );
}
