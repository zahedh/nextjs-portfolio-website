'use client';

import { Section } from '@/components';
import { AboutGraphic } from '@/components/media';
import { aboutCredentialLines } from '@/data/about';
import { en } from '@/language';
import { motion, useReducedMotion } from 'motion/react';

const viewMotion = { once: true, margin: '-80px' as const };

/** Editorial About: taglines + graphic row, narrative, credentials, closing note. */
export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const [narrativeFirst, narrativeSecond] = en.aboutSection.narrativeParagraphs;

  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="section-content mx-auto w-3/4 min-w-0">
        <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
          {/* Desktop: taglines left, graphic right. Mobile: taglines, then graphic. */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(300px,440px)] lg:items-start lg:gap-14 xl:gap-16">
            <div className="flex flex-col gap-7 text-center sm:gap-8 lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewMotion}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="font-heading text-brand-600 dark:text-brand-400 max-w-3xl text-3xl font-bold italic sm:text-4xl md:text-4xl lg:mx-0 lg:max-w-none"
              >
                {en.aboutSection.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewMotion}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.04 }}
                className="font-heading max-w-3xl text-xl leading-snug font-semibold text-neutral-900 sm:text-2xl md:text-3xl lg:mx-0 dark:text-neutral-100"
              >
                {en.aboutSection.introParagraph}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewMotion}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
              className="flex w-full justify-center lg:justify-end"
            >
              <motion.div
                className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[400px]"
                animate={
                  prefersReducedMotion === true ? undefined : { y: [0, -6, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: prefersReducedMotion === true ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                <AboutGraphic className="h-auto w-full opacity-95" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewMotion}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
            className="space-y-6 text-center text-xl leading-relaxed text-neutral-800 sm:text-2xl lg:text-left dark:text-neutral-300"
          >
            <p>{narrativeFirst}</p>
            <p>{narrativeSecond}</p>
          </motion.div>

          <motion.aside
            aria-label={en.aboutSection.credentialsAriaLabel}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewMotion}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          >
            <ul className="font-heading flex max-w-2xl flex-col gap-y-4 text-left text-base font-semibold tracking-tight sm:gap-y-4 sm:text-lg lg:mx-0">
              {aboutCredentialLines.map((line) => (
                <li
                  key={line}
                  className="text-brand-700 dark:text-brand-300 border-brand-500/25 border-l-[3px] pl-4"
                >
                  {line}
                </li>
              ))}
            </ul>
          </motion.aside>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewMotion}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
            className="text-brand-500 dark:text-brand-300 border-t border-neutral-300/70 pt-10 text-center text-lg leading-relaxed font-normal italic sm:text-xl dark:border-neutral-700"
          >
            {en.aboutSection.closingNote}
          </motion.p>
        </div>
      </div>
    </Section>
  );
}
