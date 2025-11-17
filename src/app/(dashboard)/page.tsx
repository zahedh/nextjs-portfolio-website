import { Section, Heading, SubHeading } from '@/components';
import { en } from '@/language';

export default function Home() {
  return (
    <div className="screen-parent">
      {/* Hero Section */}
      <section className="screen-section">
        <SubHeading className="t-md">{en.heroSection.header}</SubHeading>
        <div className="flex flex-row items-end">
          <SubHeading>{en.heroSection.subHeaderPartOne}</SubHeading>
          <Heading>{en.heroSection.subHeaderPartTwo}</Heading>
        </div>
      </section>

      {/* Skills Collage Section */}
      <section className="screen-section">
        <Section title={en.sectionHeaders.skillsCollage} />
      </section>

      {/* Projects Section */}
      <section className="screen-section">
        <Section title={en.sectionHeaders.projects} />
      </section>

      {/* About Section */}
      <section className="screen-section">
        <Section
          supportingText={en.projectsSection.designedToLabel}
          title={en.sectionHeaders.about}
        />
      </section>

      {/* Timeline Section */}
      <section className="screen-section">
        <Section title={en.sectionHeaders.experience} />
      </section>

      {/* GitHub Contributions Section */}
      <section className="screen-section">
        <Section title={en.sectionHeaders.contributionsSection} />
      </section>

      {/* Footer */}
      <section className="screen-section">
        <Section />
      </section>
    </div>
  );
}
