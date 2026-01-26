'use client';

import { Section, PrimaryButton, SubHeading } from '@/components';
import { en } from '@/language';
import ContributionsCalendar from './ContributionsCalendar';
import { useState, useEffect } from 'react';
import type { ActivityCalendarData } from '@/types/github';

/** Section for open-source and community contributions. */
export default function ContributionsSection() {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [activities, setActivities] = useState<ActivityCalendarData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContributions() {
      setLoading(true);
      try {
        const response = await fetch(`/api/contributions?year=${selectedYear}`);
        const data = await response.json();
        setActivities(data.activities || []);
      } catch (error) {
        console.error('Failed to load contributions:', error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
  }, [selectedYear]);

  const filterButtons = (
    <>
      <PrimaryButton
        onClick={() => setSelectedYear(currentYear)}
        className={selectedYear !== currentYear ? 'opacity-50' : ''}
      >
        {currentYear}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedYear(previousYear)}
        className={selectedYear !== previousYear ? 'opacity-50' : ''}
      >
        {previousYear}
      </PrimaryButton>
    </>
  );

  return (
    <Section
      anchor="contributions"
      title={en.sectionHeaders.contributionsSection}
      filterButtons={filterButtons}
    >
      <div className="section-content flex w-full justify-center">
        <div className="relative min-h-[350px] w-full">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <SubHeading className="text-center text-neutral-600 dark:text-neutral-400">
                {en.contributionsSection.loading}
              </SubHeading>
            </div>
          ) : activities.length > 0 ? (
            <ContributionsCalendar
              activities={activities}
              year={selectedYear}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <SubHeading className="text-center text-neutral-600 dark:text-neutral-400">
                {en.contributionsSection.error}
              </SubHeading>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
