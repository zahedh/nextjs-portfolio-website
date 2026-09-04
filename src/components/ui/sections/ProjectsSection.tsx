'use client';

import {
  PrimaryButton,
  ProjectCard,
  ProjectDetailPanel,
  Section,
} from '@/components';
import { projects } from '@/data/projects';
import { en } from '@/language';
import { getFilteredProjectsForSection } from '@/lib/project';
import { cn } from '@/lib/utils';
import { Project, ProjectFilter } from '@/types/project';
import { useMemo, useState } from 'react';

/** The filter controls, each carrying its own category's colour. */
const PROJECT_FILTERS: {
  value: ProjectFilter;
  label: string;
  pill: string;
}[] = [
  { value: 'All', label: en.projectFilters.all, pill: 'filter-pill-all' },
  { value: 'Web', label: en.projectFilters.web, pill: 'filter-pill-web' },
  {
    value: 'Mobile',
    label: en.projectFilters.mobile,
    pill: 'filter-pill-mobile',
  },
  { value: 'AI', label: en.projectFilters.ai, pill: 'filter-pill-ai' },
];

/** Cards drawn before the overflow control, and the larger count the 2xl grid fits. */
const INITIAL_PROJECT_COUNT = 4;
const WIDE_PROJECT_COUNT = 7;

interface ProjectGridProps {
  projects: Project[];
  onOpenFullDetails: (project: Project) => void;
}

/** Presents the filtered projects as one feature card followed by compact cards. */
function ProjectGrid({ projects, onOpenFullDetails }: ProjectGridProps) {
  const [showAll, setShowAll] = useState(false);
  const [featureProject, ...compactProjects] = projects.slice(
    0,
    WIDE_PROJECT_COUNT
  );
  const overflowProjects = showAll ? projects.slice(WIDE_PROJECT_COUNT) : [];
  const hasOverflow = projects.length > INITIAL_PROJECT_COUNT;

  if (!featureProject) {
    return (
      <p className="projects-empty">{en.projectCard.noProjectsInCategory}</p>
    );
  }

  return (
    <div className="projects-stack">
      <div
        className={cn(
          'projects-grid',
          compactProjects.length === 0 && 'projects-grid-single'
        )}
      >
        <ProjectCard
          project={featureProject}
          variant="feature"
          onOpenFullDetails={onOpenFullDetails}
        />
        {compactProjects.length > 0 ? (
          <div className="projects-compact-list">
            {compactProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="compact"
                onOpenFullDetails={onOpenFullDetails}
                className={cn(
                  !showAll &&
                    index >= INITIAL_PROJECT_COUNT - 1 &&
                    'project-card-compact-wide-only'
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
      {overflowProjects.length > 0 ? (
        <div className="projects-overflow-grid">
          {overflowProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="compact"
              onOpenFullDetails={onOpenFullDetails}
            />
          ))}
        </div>
      ) : null}
      {hasOverflow ? (
        <button
          type="button"
          className={cn(
            'projects-see-all',
            projects.length <= WIDE_PROJECT_COUNT && !showAll && 'xl:hidden'
          )}
          aria-expanded={showAll}
          onClick={() => setShowAll((expanded) => !expanded)}
        >
          {showAll
            ? en.projectCard.showFewerProjects
            : en.projectCard.seeAllProjects.replace(
                '{{count}}',
                String(projects.length)
              )}
        </button>
      ) : null}
    </div>
  );
}

/** Filterable projects section with an in-place detail panel. */
export default function ProjectsSection() {
  const [selectedType, setSelectedType] = useState<ProjectFilter>('All');
  const [panelProject, setPanelProject] = useState<Project | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const filteredProjects = useMemo(
    () => getFilteredProjectsForSection(projects, selectedType),
    [selectedType]
  );

  const filterButtons = (
    <>
      {PROJECT_FILTERS.map(({ value, label, pill }) => (
        <PrimaryButton
          key={value}
          onClick={() => setSelectedType(value)}
          className={cn(
            'filter-pill',
            pill,
            selectedType !== value && 'btn-toggle-idle'
          )}
        >
          {label}
        </PrimaryButton>
      ))}
    </>
  );

  const handleOpenFullDetails = (project: Project) => {
    setPanelProject(project);
    setPanelOpen(true);
  };

  return (
    <Section
      anchor="projects"
      title={en.sectionHeaders.projects}
      rightChildren={filterButtons}
    >
      <ProjectDetailPanel
        project={panelProject}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onExitComplete={() => setPanelProject(null)}
      />
      <ProjectGrid
        key={selectedType}
        projects={filteredProjects}
        onOpenFullDetails={handleOpenFullDetails}
      />
    </Section>
  );
}
