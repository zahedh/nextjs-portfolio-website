'use client';

import { Section } from '@/components';
import { SkillTile } from '@/components/ui/tiles';
import { useGlobalStore } from '@/providers/global-store-provider';
import { hasAnyProjectForSkill, scrollToProjectsSection } from '@/lib/project';
import { en } from '@/language';
import { skillsData } from '@/data';
import { motion, useReducedMotion } from 'motion/react';
import { MousePointerClick } from 'lucide-react';
import { Heading } from '@/components/text';

const hintViewport = { once: true, margin: '-60px 0px' as const };

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
        className="mb-12 flex flex-col items-center justify-center gap-2 self-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={hintViewport}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.88, 1, 0.88] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  repeat: Infinity,
                  duration: 3.2,
                  ease: 'easeInOut',
                }
          }
        >
          <motion.span
            aria-hidden
            className="text-brand-600 dark:text-brand-400 inline-flex shrink-0"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    repeat: Infinity,
                    duration: 2.6,
                    ease: 'easeInOut',
                  }
            }
          >
            <MousePointerClick
              className="size-7 sm:size-8 md:size-9"
              strokeWidth={2.25}
            />
          </motion.span>
          <Heading
            className="text-brand-600 dark:text-brand-400 text-center italic"
            as="h2"
          >
            Double Click To View Projects!
          </Heading>
        </motion.div>
      </motion.div>
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
