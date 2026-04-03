'use client';

import { Section } from '@/components';
import AboutHighlightsPanel from '@/components/ui/cards/AboutHighlightsPanel';
import {
  AboutBeyondCodingCard,
  AboutLevellingUpCard,
  AboutWhatDrivesCard,
} from '@/components/ui/cards/AboutBentoCards';
import { AboutGraphic } from '@/components/media';
import { en } from '@/language';
import { motion } from 'motion/react';

/** Bento-style About: graphic, tagline, intro line, then flex rows (stats + 2 cols + full). */
export default function AboutSection() {
  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="section-content mx-auto max-w-6xl">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex w-full justify-center"
            >
              <div className="w-full max-w-[280px] opacity-95 sm:max-w-[320px] md:max-w-[380px]">
                <AboutGraphic className="h-auto w-full" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.04 }}
              className="font-heading text-brand-600 dark:text-brand-400 mx-auto max-w-2xl px-2 text-center text-xl font-bold italic sm:text-2xl md:text-3xl"
            >
              {en.aboutSection.tagline}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 }}
            className="font-heading mx-auto mt-8 max-w-3xl px-8 text-center text-lg leading-snug font-semibold text-neutral-900 sm:mt-10 sm:text-xl md:text-2xl dark:text-neutral-100"
          >
            {en.aboutSection.introParagraph}
          </motion.p>

          <motion.section
            aria-label={en.sectionHeaders.about}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
            className="mt-16 flex w-full flex-col gap-6 lg:mt-20 lg:gap-8"
          >
            <AboutHighlightsPanel className="w-full" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
              <AboutWhatDrivesCard className="min-h-0 w-full" />
              <AboutBeyondCodingCard className="min-h-0 w-full" />
            </div>
            <AboutLevellingUpCard className="w-full" />
          </motion.section>
        </div>
      </div>
    </Section>
  );
}
