'use client';

import { Section } from '@/components';
import { SkillTile } from '@/components/ui/tiles';
import { en } from '@/language';
import { skillsData } from '@/data';
import { groupSkills, skillGroupOrder } from '@/lib/ui-logic';

/** Skills and tools as a ruled list, one row per practice area. */
export default function SkillsSection() {
  const skillGroups = groupSkills(skillsData);

  return (
    <Section anchor="skills" title={en.sectionHeaders.skills}>
      <div className="skills-groups">
        {skillGroupOrder.map((group) => (
          <div className="skills-group" key={group}>
            <h3 className="skills-group-label">
              {en.skillsSection.groups[group]}
            </h3>
            <div className="skills-group-tiles">
              {skillGroups[group].map((skill) => (
                <div key={skill.id} className="relative hover:z-[100]">
                  <SkillTile icon={skill.icon} label={skill.label} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
