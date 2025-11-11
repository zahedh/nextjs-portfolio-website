import { SectionHeader, Heading, SectionDivider } from '@/components';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="screen-section">
        <Heading>Hi, I&apos;m Zahed!</Heading>
        <Heading className="mt-4 text-lg">Web & Mobile Developer</Heading>
      </section>

      {/* Skills Collage Section */}
      <section className="screen-section">
        <SectionHeader title="What I Work Best With" />
        <div className="flex flex-wrap justify-center gap-6">
          {/* Skill Tiles go here */}
        </div>
      </section>

      {/* Projects Section */}
      <section className="screen-section">
        <SectionHeader title="What I've Built" />
      </section>

      {/* About Section */}
      <section className="screen-section">
        <SectionHeader title="A Bit About Me" />
      </section>

      {/* Timeline Section */}
      <section className="screen-section">
        <SectionHeader title="Where I’ve Worked" />
      </section>

      {/* GitHub Contributions Section */}
      <section className="screen-section">
        <SectionHeader title="My Dev Footprint" />
      </section>

      {/* Footer */}
      <section className="screen-section">
        <SectionDivider />
      </section>
    </div>
  );
}
