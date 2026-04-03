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
        <div className="timeline-position" />

        <div className="relative space-y-16 py-32 lg:space-y-24 lg:py-48">
          {jobExperiences.map((job, index) => {
            const isLeft = index % 2 === 0;
            const year = job.startDate.split(' ').pop();

            return (
              <div key={job.id} className="relative">
                <motion.div
                  className={`hidden lg:block lg:w-[calc(50%-2rem)] ${
                    isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <JobCard job={job} />
                </motion.div>

                <motion.div
                  className={`hidden lg:absolute lg:top-1/2 lg:block lg:w-[calc(50%-2rem)] lg:-translate-y-1/2 ${
                    isLeft
                      ? 'lg:right-0 lg:ml-auto lg:pl-8'
                      : 'lg:left-0 lg:mr-auto lg:pr-8'
                  }`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                >
                  <div
                    className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                  >
                    <span className="text-8xl font-bold text-neutral-400 dark:text-neutral-600">
                      {year}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="timeline-dot-position"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />

                <motion.div
                  className="mr-4 ml-16 lg:hidden"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <JobCard job={job} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
