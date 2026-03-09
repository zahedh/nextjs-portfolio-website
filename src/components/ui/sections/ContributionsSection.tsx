'use client';

import { Section, PrimaryButton, SubHeading } from '@/components';
import { en } from '@/language';
import ContributionsCalendar from './ContributionsCalendar';
import { useState, useEffect } from 'react';
import type { ActivityCalendarData } from '@/types/github';
import { motion } from 'motion/react';

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
      showBottomDivider
    >
      <motion.div
        key={selectedYear} // This triggers re-animation when year changes
        className="relative min-h-[400px] w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {loading ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SubHeading className="text-center text-neutral-600 dark:text-neutral-400">
              {en.contributionsSection.loading}
            </SubHeading>
          </motion.div>
        ) : activities.length > 0 ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <ContributionsCalendar
              activities={activities}
              year={selectedYear}
            />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SubHeading className="text-center text-neutral-600 dark:text-neutral-400">
              {en.contributionsSection.error}
            </SubHeading>
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
}
