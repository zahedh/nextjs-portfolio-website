import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Section } from '@/components';
import { SubHeading } from '@/components/text';
import { FeatureList } from '@/components/ui/cards/FeatureList';
import { ProjectHeroMedia } from '@/components/ui/cards/ProjectHeroMedia';
import { ProjectLinks } from '@/components/ui/cards/ProjectLinks';
import { ProjectMetaSummary } from '@/components/ui/cards/ProjectMetaItems';
import { ProjectTechStack } from '@/components/ui/cards/ProjectTechStack';
import { projects } from '@/data/projects';
import { en } from '@/language';
import { socialShareImageMeta } from '@/lib/meta';
import {
  getProjectBySlug,
  getProjectDetailFeatureLines,
  getProjectExcerptLine,
  getProjectLinkItems,
} from '@/lib/ui-logic';

type ProjectPageProps = { params: Promise<{ slug: string }> };

/** Every project is known at build time, so every page is static. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, projects);
  if (!project) return {};

  const title = `${project.title} | Zahed Heidari`;
  const description = project.summary ?? getProjectExcerptLine(project);
  const url = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [socialShareImageMeta],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialShareImageMeta],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, projects);
  if (!project) notFound();

  const overview = getProjectExcerptLine(project);
  const featureLines = getProjectDetailFeatureLines(project);
  const projectLinks = getProjectLinkItems(project);

  return (
    <div className="screen-parent">
      <Section title={project.title} titleAs="h1" showDivider>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <Link href="/#projects" className="project-back-link">
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            {en.projectDisplay.backToProjects}
          </Link>

          <ProjectHeroMedia project={project} />

          <ProjectMetaSummary project={project} variant="panel" />

          {overview ? (
            <section>
              <p className="section-label">
                {en.projectDisplay.sectionOverview}
              </p>
              <p className="body-text-muted text-body max-w-prose">
                {overview}
              </p>
            </section>
          ) : null}

          {featureLines.length > 0 ? (
            <section>
              <SubHeading className="card-section-heading">
                {en.projectDisplay.sectionFeatures}
              </SubHeading>
              <FeatureList lines={featureLines} />
            </section>
          ) : null}

          <section>
            <SubHeading className="card-section-heading">
              {en.projectDisplay.sectionTechStack}
            </SubHeading>
            <ProjectTechStack skillIds={project.skills} />
          </section>

          {projectLinks.length > 0 ? (
            <section>
              <SubHeading className="card-section-heading">
                {en.projectDisplay.sectionLinks}
              </SubHeading>
              <ProjectLinks links={projectLinks} />
            </section>
          ) : null}
        </div>
      </Section>
    </div>
  );
}
