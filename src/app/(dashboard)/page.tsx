import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  AboutSection,
  ExperienceSection,
  ContributionsSection,
} from '@/components/ui/sections';

export default function Home() {
  return (
    <div className="screen-parent">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <ContributionsSection />
    </div>
  );
}
