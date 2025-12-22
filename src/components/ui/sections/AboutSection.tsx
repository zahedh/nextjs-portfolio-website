'use client';

import { Section } from '@/components';
import { AboutGraphic } from '@/components/media';
import { AboutMeCard } from '@/components/ui/cards';
import { aboutStatCards } from '@/data';
import { en } from '@/language';
import { motion } from 'motion/react';

/** Section describing Zahed's background and story. */
export default function AboutSection() {
  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="section-content relative mx-auto flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-center lg:gap-14">
        {/* Floating stat cards - only visible on xl screens */}
        {aboutStatCards.map((card, index) => (
          <motion.div
            key={card.label}
            className={`absolute hidden ${card.position} xl:block`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="border-brand-400/30 dark:border-brand-500/30 relative rounded-2xl border bg-neutral-100/80 px-6 py-4 shadow-lg backdrop-blur-sm dark:bg-neutral-800/80"
              animate={{
                rotate: [0, -2, 2, -2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.5,
              }}
            >
              <div className="text-center">
                <p className="font-heading text-brand-500 dark:text-brand-400 text-3xl font-bold">
                  {card.value}
                </p>
                <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {card.label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* About Me Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <AboutMeCard />
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="flex w-full max-w-sm items-center justify-center lg:max-w-md"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <AboutGraphic className="h-auto w-full" />
        </motion.div>
      </div>
    </Section>
  );
}
