import { render, screen } from '@testing-library/react';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';

describe('TechStack', () => {
  it('keeps tiles by default and supports readable labels for experience', () => {
    const skills = skillsData.slice(0, 1);
    const { rerender } = render(<TechStack skills={skills} />);

    expect(screen.getByRole('img', { name: skills[0].label })).toBeVisible();

    rerender(<TechStack skills={skills} variant="labels" />);

    expect(screen.getByText(skills[0].label)).toBeVisible();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
