'use client';

import { Section } from '@/components';
import { SkillTile } from '@/components/ui/tiles';
import { useGlobalStore } from '@/providers/global-store-provider';
import { hasAnyProjectForSkill, scrollToProjectsSection } from '@/lib/project';
import { en } from '@/language';
import { skillsData } from '@/data';
import { motion, useReducedMotion } from 'motion/react';
import { MousePointerClick } from 'lucide-react';
import { SubHeading } from '@/components/text';
import {
  getSkillsCollageContainerVariants,
  getSkillsCollageGridViewport,
  getSkillsCollageItemVariants,
} from '@/lib/ui-logic';

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

  const containerVariants =
    getSkillsCollageContainerVariants(prefersReducedMotion);
  const itemVariants = getSkillsCollageItemVariants(prefersReducedMotion);
  const gridViewport = getSkillsCollageGridViewport();

  const doubleClickHint = () => {
    return (
      <motion.div
        className="flex items-center gap-2"
        animate={
          prefersReducedMotion ? undefined : { opacity: [0.88, 1, 0.88] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
        }
      >
        <motion.span
          aria-hidden
          className="text-brand-600 dark:text-brand-400 inline-flex shrink-0"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { repeat: Infinity, duration: 2.6, ease: 'easeInOut' }
          }
        >
          <MousePointerClick
            className="size-7 sm:size-8 md:size-9"
            strokeWidth={2.25}
          />
        </motion.span>
        <SubHeading
          className="text-brand-600 dark:text-brand-400 hidden italic lg:block"
          as="h2"
        >
          {en.skillsSection.doubleClickHint}
        </SubHeading>
      </motion.div>
    );
  };

  return (
    <Section
      anchor="skills"
      title={en.sectionHeaders.skillsCollage}
      rightChildren={doubleClickHint()}
    >
      <motion.div
        className="section-content mx-auto flex w-3/4 min-w-0 flex-wrap items-center justify-center gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={gridViewport}
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
