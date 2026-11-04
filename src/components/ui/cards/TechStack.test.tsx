import { render, screen } from '@testing-library/react';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';

const skills = skillsData.slice(0, 1);

describe('TechStack', () => {
  it('GIVEN no variant WHEN rendered THEN each skill is a named tile', () => {
    render(<TechStack skills={skills} />);

    expect(screen.getByRole('img', { name: skills[0].label })).toBeVisible();
  });

  it('GIVEN the labels variant WHEN rendered THEN each skill reads as text', () => {
    render(<TechStack skills={skills} variant="labels" />);

    expect(screen.getByText(skills[0].label)).toBeVisible();
  });

  it('GIVEN the labels variant WHEN rendered THEN no tiles are drawn', () => {
    render(<TechStack skills={skills} variant="labels" />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
