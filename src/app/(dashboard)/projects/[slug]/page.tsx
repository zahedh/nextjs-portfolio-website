import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { FeatureList } from '@/components/ui/cards/FeatureList';
import { ProjectLinks } from '@/components/ui/cards/ProjectLinks';
import {
  ProjectBackLink,
  ProjectPageStack,
  ProjectStepLink,
} from '@/components/ui/cards/ProjectStep';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import { projects } from '@/data/projects';
import { getFilteredProjectsForSection } from '@/lib/project';
import { en } from '@/language';
import { socialShareImageMeta } from '@/lib/meta';
import {
  formatProjectTimeline,
  getProjectBySlug,
  isProjectActive,
  getProjectExcerptLine,
  getProjectLinkItems,
} from '@/lib/ui-logic';
import type { Project } from '@/types/project';

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

  const title = en.siteMetadata.pageTitle.replace('{{page}}', project.title);
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

/**
 * The projects either side of this one, in the order the section presents them
 * rather than the order the data happens to be written in. The ends do not
 * wrap: the first project has nothing before it, and offering the last one
 * there tells a reader they have gone backwards past the beginning.
 */
function getNeighbours(project: Project) {
  const ordered = getFilteredProjectsForSection(projects, 'All');
  const index = ordered.findIndex((entry) => entry.id === project.id);
  if (index < 0) return {};
  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

function MetaDot() {
  return (
    <span className="text-neutral-300 dark:text-neutral-600" aria-hidden>
      ·
    </span>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, projects);
  if (!project) notFound();

  const projectLinks = getProjectLinkItems(project);
  const { previous: previousProject, next: nextProject } =
    getNeighbours(project);

  return (
    <div className="screen-parent">
      {/* Cancels the shell's header offset the way the hero does, so a project
          opens at the same height as the front page rather than 72px lower. */}
      <section className="screen-section -mt-18">
        <div className="section-inner">
          <ProjectPageStack key={project.slug}>
            <div className="page-head">
              <ProjectBackLink className="project-back-link">
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                {en.projectDisplay.backToProjects}
              </ProjectBackLink>

              <h1 className="page-title project-page-title">{project.title}</h1>

              {project.summary ? (
                <p className="page-summary">{project.summary}</p>
              ) : null}

              <p className="page-meta">
                <span>{formatProjectTimeline(project)}</span>
                <MetaDot />
                {project.company ? (
                  <>
                    <span>{project.company}</span>
                    <MetaDot />
                  </>
                ) : null}
                <span>{project.categories.join(' · ')}</span>
                <MetaDot />
                <span
                  className={
                    isProjectActive(project)
                      ? 'project-page-meta-active'
                      : undefined
                  }
                >
                  {isProjectActive(project)
                    ? en.projectDisplay.statusActive
                    : en.projectDisplay.statusCompleted}
                </span>
                <MetaDot />
                <span>{en.projectAccess[project.access]}</span>
              </p>

              <span className="project-page-edge" aria-hidden />
            </div>

            <div className="project-page-body">
              <div className="page-column">
                {project.description.length > 0 ? (
                  <section className="page-block">
                    <h2 className="page-heading">
                      {en.projectDisplay.sectionOverview}
                    </h2>
                    <FeatureList lines={project.description} />
                  </section>
                ) : null}

                {projectLinks.length > 0 ? (
                  <ProjectLinks links={projectLinks} />
                ) : null}
              </div>

              <div className="project-page-rail">
                <p className="project-page-label">
                  {en.projectDisplay.sectionBuiltWith}
                </p>
                <TechStack
                  skills={getSkillsByIds(project.skills, skillsData)}
                />
              </div>
            </div>

            <div className="project-page-onward">
              {previousProject ? (
                <ProjectStepLink
                  href={`/projects/${previousProject.slug}`}
                  className="project-page-onward-link group"
                >
                  <span className="project-page-label">
                    {en.projectDisplay.previousProjectLabel}
                  </span>
                  <span className="project-page-onward-title">
                    {previousProject.title}
                  </span>
                </ProjectStepLink>
              ) : (
                <span />
              )}
              {nextProject ? (
                <ProjectStepLink
                  href={`/projects/${nextProject.slug}`}
                  className="project-page-onward-link group sm:items-end sm:text-right"
                >
                  <span className="project-page-label">
                    {en.projectDisplay.nextProjectLabel}
                  </span>
                  <span className="project-page-onward-title">
                    {nextProject.title}
                  </span>
                </ProjectStepLink>
              ) : (
                <span />
              )}
            </div>
          </ProjectPageStack>
        </div>
      </section>
    </div>
  );
}
