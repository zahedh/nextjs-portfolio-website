'use client';

import { Section } from '@/components';
import { AboutGraphic } from '@/components/media';
import { aboutCredentialLines } from '@/data/about';
import { en } from '@/language';
import { motion, useReducedMotion } from 'motion/react';
import { useBreakpoint } from '@/hooks/utilityHooks';

const viewMotion = { once: true, margin: '-80px' as const };

/** Editorial About: vertical stack (graphic above copy) below lg; text left + sticky graphic right from lg up. */
export default function AboutSection() {
  const [narrativeFirst, narrativeSecond] = en.aboutSection.narrativeParagraphs;
  const isDesktop = useBreakpoint('lg');
  const prefersReducedMotion = useReducedMotion();
  const graphicFloat =
    !isDesktop && prefersReducedMotion !== true ? { y: [0, -6, 0] } : undefined;

  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="section-content mx-auto w-3/4 min-w-0">
        <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:items-start lg:gap-12">
          <div className="order-2 flex min-w-0 flex-1 flex-col gap-10 sm:gap-12 lg:order-1 lg:gap-14">
            <div className="flex flex-col gap-7 text-center sm:gap-8 lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewMotion}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="font-heading text-brand-600 dark:text-brand-400 mx-auto max-w-3xl text-3xl font-bold italic sm:text-4xl md:text-4xl lg:mx-0 lg:max-w-none"
              >
                {en.aboutSection.tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewMotion}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
              className="mx-auto max-w-3xl space-y-6 text-center text-xl leading-relaxed text-neutral-800 sm:text-2xl lg:mx-0 lg:max-w-none lg:text-left dark:text-neutral-300"
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
              <ul className="font-heading mx-auto flex w-full max-w-2xl flex-col items-center gap-y-4 text-base font-semibold tracking-tight sm:gap-y-4 sm:text-lg lg:mx-0 lg:items-start">
                {aboutCredentialLines.map((line) => (
                  <li
                    key={line}
                    className="flex w-full justify-center lg:justify-start"
                  >
                    <span className="text-brand-700 dark:text-brand-300 border-brand-500/25 inline-block border-l-[3px] pl-4 text-center lg:text-left">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.aside>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewMotion}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
              className="text-brand-700 dark:text-brand-400 border-t border-neutral-300/70 pt-10 text-center text-lg leading-relaxed font-normal italic sm:text-xl lg:text-left dark:border-neutral-700"
            >
              {en.aboutSection.closingNote}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewMotion}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
            className="order-1 mx-auto flex w-full max-w-[min(100%,360px)] shrink-0 justify-center sm:max-w-[400px] lg:sticky lg:top-24 lg:z-0 lg:order-2 lg:mx-0 lg:w-[460px] lg:max-w-[460px] lg:shrink-0 lg:justify-end lg:self-start"
          >
            <motion.div
              className="flex w-full justify-center lg:max-w-[460px]"
              animate={graphicFloat}
              transition={{
                duration: 5,
                repeat: graphicFloat ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <AboutGraphic className="mx-auto block h-auto max-w-full opacity-95" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
