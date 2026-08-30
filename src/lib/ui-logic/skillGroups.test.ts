import { skillsData } from '@/data';
import { groupSkills } from './skillGroups';

describe('groupSkills', () => {
  it('GIVEN all portfolio skills WHEN grouping THEN accounts for all 51 skills in the five agreed groups', () => {
    const groups = groupSkills(skillsData);

    expect(
      Object.fromEntries(
        Object.entries(groups).map(([group, skills]) => [group, skills.length])
      )
    ).toEqual({
      languages: 10,
      frameworks: 9,
      design: 3,
      aiTooling: 9,
      toolingAndPractice: 20,
    });
  });
});
