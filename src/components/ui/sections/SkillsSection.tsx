'use client';

import { Section } from '@/components';
import { SkillTile } from '@/components/ui/tiles';
import { en } from '@/language';
import { skillsData } from '@/data';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
  getSkillsCollageContainerVariants,
  getSkillsCollageGridViewport,
  getSkillsCollageItemVariants,
  groupSkills,
  skillGroupOrder,
} from '@/lib/ui-logic';

/** Animated collage of skills and tools. */
export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants =
    getSkillsCollageContainerVariants(prefersReducedMotion);
  const itemVariants = getSkillsCollageItemVariants(prefersReducedMotion);
  const gridViewport = getSkillsCollageGridViewport();
  const skillGroups = groupSkills(skillsData);

  return (
    <Section anchor="skills" title={en.sectionHeaders.skillsCollage}>
      <div className="skills-groups">
        {skillGroupOrder.map((group) => (
          <div className="skills-group" key={group}>
            <h3
              className={cn(
                'skills-group-label',
                group === 'aiTooling' && 'skills-group-label--accent'
              )}
            >
              {en.skillsSection.groups[group]}
            </h3>
            <span className="skills-group-count">
              {String(skillGroups[group].length).padStart(2, '0')}
            </span>
            <motion.div
              className="skills-group-tiles"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={gridViewport}
            >
              {skillGroups[group].map((skill) => (
                <motion.div
                  key={skill.id}
                  className="relative hover:z-[100]"
                  variants={itemVariants}
                >
                  <SkillTile icon={skill.icon} label={skill.label} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}
