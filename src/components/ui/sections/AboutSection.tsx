'use client';

import { Section } from '@/components';
import { aboutCredentialLines } from '@/data/about';
import { en } from '@/language';
import { motion } from 'motion/react';
import Image from 'next/image';
import { aboutPhoto } from '@/images';

const viewMotion = { once: true, margin: '-80px' as const };

/** About: photograph, tagline, narrative, credential rail and closing note, arranged per breakpoint by `.about-grid`. */
export default function AboutSection() {
  const [narrativeFirst, narrativeSecond] = en.aboutSection.narrativeParagraphs;

  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="about-grid">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewMotion}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
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
            sizes="(min-width: 77rem) 760px, (min-width: 64rem) 640px, (min-width: 48rem) 528px, (min-width: 40rem) 400px, 704px"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewMotion}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="about-tagline"
        >
          {en.aboutSection.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewMotion}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
          className="about-narrative"
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
          className="about-credentials"
        >
          <ul className="about-credential-list">
            {aboutCredentialLines.map((line) => (
              <li key={line} className="about-credential">
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
          className="about-note"
        >
          {en.aboutSection.closingNote}
        </motion.p>
      </div>
    </Section>
  );
}
