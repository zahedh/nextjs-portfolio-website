import { render, screen } from '@testing-library/react';
import { en } from '@/language';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';

describe('TechStack', () => {
  it('GIVEN skills WHEN rendered THEN each reads as its label', () => {
    render(<TechStack skills={skillsData.slice(0, 1)} />);

    expect(screen.getByText(skillsData[0].label)).toBeVisible();
  });

  it('GIVEN more skills than the cap WHEN rendered THEN the rest are counted', () => {
    render(<TechStack skills={skillsData.slice(0, 3)} maxItems={1} />);

    expect(
      screen.getByText(en.projectDisplay.moreSkills.replace('{{count}}', '2'))
    ).toBeVisible();
  });
});
