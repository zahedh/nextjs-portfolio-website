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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.03,
        delayChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 0, scale: 0.72, y: 6 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 520,
        damping: 26,
      },
    },
  };

  return (
    <Section anchor="skills" title={en.sectionHeaders.skillsCollage}>
      <motion.div
        className="section-content mx-auto flex w-3/4 min-w-0 flex-wrap items-center justify-center gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px', amount: 0.15 }}
      >
        {skillsData.map((skill) => (
          <motion.div
            key={skill.id}
            className="relative hover:z-[100]"
            variants={itemVariants}
          >
            <SkillTile
              icon={skill.icon}
              label={skill.label}
              onClick={() => handleSkillClick(skill.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
