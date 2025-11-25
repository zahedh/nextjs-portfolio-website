import { Section, Heading, SubHeading } from '@/components';
import { AvatarGraphic } from '@/components/media';
import { en } from '@/language';

export default function Home() {
  return (
    <div className="screen-parent">
      {/* Hero Section */}
      <Section anchor="home" showDivider={false}>
        <div className="flex w-full flex-row items-center justify-center gap-10 border-2">
          <AvatarGraphic className="h-32 w-32 border-2 md:block lg:h-48 lg:w-48" />
          <div className="flex flex-col gap-4">
            <SubHeading>{en.heroSection.header}</SubHeading>
            <div className="flex flex-row items-baseline">
              <SubHeading>{en.heroSection.subHeaderPartOne}</SubHeading>
              <Heading className="text-brand-600 dark:text-brand-100">
                {en.heroSection.subHeaderPartTwo}
              </Heading>
            </div>
            <SubHeading className="t-md max-w-prose">
              {en.heroSection.supportingText}
            </SubHeading>
          </div>
        </div>
      </Section>

      {/* Skills Collage Section */}
      <Section
        anchor="skills"
        title={en.sectionHeaders.skillsCollage}
      ></Section>

      {/* Projects Section */}
      <Section anchor="projects" title={en.sectionHeaders.projects}></Section>

      {/* About Section */}
      <Section
        anchor="about"
        supportingText={en.projectsSection.designedToLabel}
        title={en.sectionHeaders.about}
      ></Section>

      {/* Timeline Section */}
      <Section
        anchor="experience"
        title={en.sectionHeaders.experience}
      ></Section>

      {/* GitHub Contributions Section */}
      <Section
        anchor="contributions"
        title={en.sectionHeaders.contributionsSection}
      ></Section>

      {/* Footer */}
      <Section anchor="contact" />
    </div>
  );
}
