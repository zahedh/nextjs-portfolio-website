'use client';

import { Section } from '@/components';
import { aboutCredentialLines } from '@/data/about';
import { en } from '@/language';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { aboutPhoto } from '@/images';
import { getSettleVariants, IN_VIEW_ONCE, SETTLE } from '@/lib/ui-logic';

/** About: photograph with its stickers, narrative and credential rail, arranged per breakpoint by `.about-grid`. */
export default function AboutSection() {
  const [narrativeFirst, narrativeSecond] = en.aboutSection.narrativeParagraphs;
  const noMotion = Boolean(useReducedMotion());
  // The photograph, then the narrative, then the highlights.
  const settleAt = (step: number) =>
    getSettleVariants(noMotion, step * SETTLE.stagger);

  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="about-grid">
        <motion.div
          variants={settleAt(0)}
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          className="about-visual"
        >
          {/* sizes asks for twice each frame width: a source at the frame's own
              width rendered visibly soft, while one twice as wide, scaled down
              by the browser, renders sharp. */}
          <Image
            src={aboutPhoto}
            alt={en.aboutSection.photoAlt}
            placeholder="blur"
            fill
            sizes="(min-width: 48rem) 640px, 704px"
          />
          <ul className="about-stickers">
            {en.aboutSection.stickers.map((sticker) => (
              <li key={sticker} className="about-sticker">
                {sticker}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={settleAt(1)}
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          className="about-narrative"
        >
          <p>{narrativeFirst}</p>
          <p>{narrativeSecond}</p>
        </motion.div>

        <motion.aside
          aria-labelledby="about-credentials-heading"
          variants={settleAt(2)}
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          className="about-credentials"
        >
          <h3
            id="about-credentials-heading"
            className="about-credentials-heading"
          >
            {en.aboutSection.credentialsHeading}
          </h3>
          <ul className="about-credential-list">
            {aboutCredentialLines.map((line) => (
              <li key={line} className="about-credential">
                {line}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </Section>
  );
}
