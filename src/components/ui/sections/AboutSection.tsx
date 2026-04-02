'use client';

import { Section } from '@/components';
import AboutHighlightsPanel from '@/components/ui/cards/AboutHighlightsPanel';
import AboutMeCard from '@/components/ui/cards/AboutMeCard';
import { AboutGraphic } from '@/components/media';
import { en } from '@/language';
import { motion } from 'motion/react';

/** Illustration above snapshot, then narrative — stacked. */
export default function AboutSection() {
  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="section-content mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:gap-8">
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
            className="mx-auto w-full max-w-3xl lg:max-w-4xl"
          >
            <AboutHighlightsPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
          >
            <AboutMeCard />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
