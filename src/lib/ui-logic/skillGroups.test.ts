import { skillsData } from '@/data';
import { groupSkills, skillGroupOrder } from './skillGroups';

describe('groupSkills', () => {
  it('GIVEN all portfolio skills WHEN grouping THEN every skill lands in exactly one group', () => {
    const groups = groupSkills(skillsData);
    const grouped = skillGroupOrder.flatMap((group) => groups[group]);

    expect(grouped).toHaveLength(skillsData.length);
    expect(new Set(grouped.map((skill) => skill.id)).size).toBe(
      skillsData.length
    );
  });

  it('GIVEN the rendered order WHEN grouping THEN no group is empty', () => {
    const groups = groupSkills(skillsData);

    skillGroupOrder.forEach((group) => {
      expect(groups[group].length).toBeGreaterThan(0);
    });
  });
});
