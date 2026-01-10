'use client';

import { Section } from '@/components';
import { JobCard } from '@/components/ui/cards';
import { jobExperiences } from '@/data';
import { en } from '@/language';
import { motion } from 'motion/react';

/** Section summarising professional work experience. */
export default function ExperienceSection() {
  return (
    <Section anchor="experience" title={en.sectionHeaders.experience}>
      <div className="section-content relative mx-auto max-w-6xl xl:max-w-7xl">
        {/* Timeline - Desktop: center, Mobile: left */}
        <div className="bg-brand-400 absolute top-0 left-8 h-full w-0.5 lg:left-1/2 lg:-translate-x-1/2" />

        {/* Job cards */}
        <div className="relative space-y-16 py-32 lg:space-y-24 lg:py-48">
          {jobExperiences.map((job, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={job.id} className="relative">
                {/* Desktop layout - alternating */}
                <motion.div
                  className={`hidden lg:block lg:w-[calc(50%-2rem)] ${
                    isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <JobCard job={job} isLeft={isLeft} />
                </motion.div>

                {/* Timeline dot */}
                <motion.div
                  className="bg-brand-400 absolute top-1/2 left-8 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-neutral-100 lg:left-1/2 dark:border-neutral-900"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />

                {/* Mobile layout - all on right */}
                <motion.div
                  className="mr-4 ml-16 lg:hidden"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <JobCard job={job} isLeft={false} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
