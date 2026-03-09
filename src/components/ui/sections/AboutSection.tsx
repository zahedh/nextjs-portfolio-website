'use client';

import { Section } from '@/components';
import { AboutGraphic } from '@/components/media';
import { AboutMeCard, StatCard } from '@/components/ui/cards';
import { aboutStatCards } from '@/data';
import { en } from '@/language';
import { motion } from 'motion/react';

/** Section describing background and story. */
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
              scale: 1.25,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
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
              <StatCard value={card.value} label={card.label} />
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <AboutMeCard />
        </motion.div>

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
