'use client';

import { Section } from '@/components';
import { SkillTile } from '@/components/ui/tiles';
import { useGlobalStore } from '@/providers/global-store-provider';
import { hasAnyProjectForSkill, scrollToProjectsSection } from '@/lib/utils';
import { en } from '@/language';
import { skillsData } from '@/data';
import { motion, useReducedMotion } from 'motion/react';

/** Animated collage of skills and tools. */
export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const setSelectedSkillId = useGlobalStore(
    (state) => state.setSelectedSkillId
  );

  const handleSkillClick = (skillId: string) => {
    if (!hasAnyProjectForSkill(skillId)) {
      return;
    }
    setSelectedSkillId(skillId);
    scrollToProjectsSection();
  };

  return (
    <Section anchor="skills" title={en.sectionHeaders.skillsCollage}>
      <div className="section-content mx-auto flex w-3/4 min-w-0 flex-wrap items-center justify-center gap-6">
        {skillsData.map((skill, index) => {
          const row = Math.floor(index / 8);
          const direction = row % 2 === 0 ? 1 : -1;
          const offset = (index % 8) * 0.5;
          const stagger = Math.min(index * 0.02, 0.45);

          return (
            <motion.div
              key={skill.id}
              className="relative hover:z-[100]"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: '25% 0px',
                amount: 0.15,
              }}
              animate={
                prefersReducedMotion ? undefined : { x: [0, direction * 5, 0] }
              }
              transition={{
                opacity: { duration: 0.45, delay: stagger },
                y: { duration: 0.45, delay: stagger },
                ...(prefersReducedMotion
                  ? {}
                  : {
                      x: {
                        duration: 4 + offset,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: offset,
                        repeatType: 'loop',
                      },
                    }),
              }}
            >
              <SkillTile
                icon={skill.icon}
                label={skill.label}
                onClick={() => handleSkillClick(skill.id)}
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
