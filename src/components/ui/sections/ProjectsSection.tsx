'use client';

import {
  PrimaryButton,
  ProjectCard,
  ProjectDetailPanel,
  Section,
} from '@/components';
import { CategoryMark } from '@/components/ui/cards/ProjectCategoryMarks';
import { projects } from '@/data/projects';
import { en } from '@/language';
import { getFilteredProjectsForSection } from '@/lib/project';
import { cn } from '@/lib/utils';
import { Project, ProjectFilter } from '@/types/project';
import { useMemo, useState } from 'react';

/**
 * The filter controls, each carrying its own category's colour. Ordered by depth
 * of experience — mobile, then web, then AI — rather than alphabetically or by
 * project count. The section's own order is chronological and independent of
 * this; see getFilteredProjectsForSection.
 */
const PROJECT_FILTERS: {
  value: ProjectFilter;
  label: string;
  pill: string;
}[] = [
  { value: 'All', label: en.projectFilters.all, pill: 'filter-pill-all' },
  {
    value: 'Mobile',
    label: en.projectFilters.mobile,
    pill: 'filter-pill-mobile',
  },
  { value: 'Web', label: en.projectFilters.web, pill: 'filter-pill-web' },
  { value: 'AI', label: en.projectFilters.ai, pill: 'filter-pill-ai' },
];

/** Compact cards drawn before the overflow control. Four fills exactly two rows
    beside the feature card at both md and xl, so the initial block is a clean
    rectangle at every width without counting columns at runtime. */
const INITIAL_COMPACT_COUNT = 4;

interface ProjectGridProps {
  projects: Project[];
  onOpenFullDetails: (project: Project) => void;
}

/** Presents the filtered projects as one feature card followed by compact cards. */
function ProjectGrid({ projects, onOpenFullDetails }: ProjectGridProps) {
  const [showAll, setShowAll] = useState(false);
  const [featureProject, ...compactProjects] = projects;
  const visibleProjects = showAll
    ? compactProjects
    : compactProjects.slice(0, INITIAL_COMPACT_COUNT);
  const hasOverflow = compactProjects.length > INITIAL_COMPACT_COUNT;

  if (!featureProject) {
    return (
      <p className="projects-empty">{en.projectCard.noProjectsInCategory}</p>
    );
  }

  return (
    <div className="projects-stack">
      {/* Every card is a cell in this one grid, revealed ones included, so rows
          always align. A lone card has nothing to span and keeps its own height. */}
      <div className="projects-grid">
        <ProjectCard
          project={featureProject}
          variant="feature"
          onOpenFullDetails={onOpenFullDetails}
          className={cn(
            compactProjects.length > 0 && 'project-card-feature-spanning'
          )}
        />
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="compact"
            onOpenFullDetails={onOpenFullDetails}
          />
        ))}
      </div>
      {/* The row is kept whether or not it holds a control, so changing filter
          does not shift everything below the section by the button's height. */}
      <div className="projects-see-all-row">
        {hasOverflow ? (
          <button
            type="button"
            className="projects-see-all"
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
          {/* The row doubles as the legend for the marks on the cards, which
              carry no label of their own. All has no glyph because it is the
              absence of a category rather than one of them. */}
          {value === 'All' ? null : (
            <CategoryMark category={value} className="filter-pill-mark" />
          )}
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
