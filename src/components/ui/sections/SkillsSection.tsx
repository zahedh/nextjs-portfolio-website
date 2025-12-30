'use client';

import { Section } from '@/components';
import { SkillTile } from '@/components/ui/tiles';
import { en } from '@/language';
import { skillsData } from '@/data';
import { motion } from 'motion/react';

/** Animated collage of skills and tools. */
export default function SkillsSection() {
  return (
    <Section anchor="skills" title={en.sectionHeaders.skillsCollage}>
      <div className="section-content mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6">
        {skillsData.map((skill, index) => {
          const row = Math.floor(index / 8);
          const direction = row % 2 === 0 ? 1 : -1;
          const offset = (index % 8) * 0.5;

          return (
            <motion.div
              key={index}
              className="relative hover:z-[100]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              animate={{
                x: [0, direction * 5, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.03 },
                y: { duration: 0.5, delay: index * 0.03 },
                x: {
                  duration: 4 + offset,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: offset,
                  repeatType: 'loop',
                },
              }}
            >
              <SkillTile icon={skill.icon} label={skill.label} />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
