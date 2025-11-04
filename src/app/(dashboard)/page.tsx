import {
  PrimaryButton,
  SectionHeader,
  ProjectCard,
  SkillTile,
  AboutMeCard,
  JobCard,
  FooterCard,
  SectionDivider,
} from '@/components'; // All components already structured

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <h1 className="font-inter text-4xl">This is Inter</h1>
      <p className="font-plex text-lg">This is IBM Plex Sans</p>

      <section className="bg-brand-500 dark:bg-brand-700 px-4 py-16 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Hi, I&apos;m Zahed!</h1>
        <p className="mt-4 text-lg">Web & Mobile Developer</p>
        <PrimaryButton className="mt-6">Contact Me</PrimaryButton>
      </section>

      {/* Skills Collage Section */}
      <section className="px-4 py-16">
        <SectionHeader>What I Work Best With</SectionHeader>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <SkillTile />
          <SkillTile />
          <SkillTile />
          <SkillTile />
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-neutral-100 px-4 py-16 dark:bg-neutral-800">
        <SectionHeader>What I’ve Built</SectionHeader>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-16">
        <SectionHeader>A Bit About Me</SectionHeader>
        <div className="mt-6">
          <AboutMeCard />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-neutral-100 px-4 py-16 dark:bg-neutral-800">
        <SectionHeader>Where I’ve Worked</SectionHeader>
        <div className="mt-6">
          <JobCard />
          <JobCard />
        </div>
      </section>

      {/* GitHub Contributions Section */}
      <section className="px-4 py-16">
        <SectionHeader>My Dev Footprint</SectionHeader>
        <div className="mt-6">
          <SectionDivider />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 px-4 py-6 text-neutral-100">
        <FooterCard />
      </footer>
    </div>
  );
}
