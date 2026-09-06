'use client';

import { PrimaryButton, ProjectCard, Section } from '@/components';
import { CategoryMark } from '@/components/ui/cards/ProjectCategoryMarks';
import { ChevronDown } from 'lucide-react';
import { projects } from '@/data/projects';
import { en } from '@/language';
import { getFilteredProjectsForSection } from '@/lib/project';
import { cn } from '@/lib/utils';
import { Project, ProjectFilter } from '@/types/project';
import { useLayoutEffect, useMemo, useState } from 'react';

/**
 * The filter controls, each carrying its category's glyph. Ordered by depth of
 * experience — mobile, then web, then AI — rather than alphabetically or by
 * project count. The section's own order is chronological and independent of
 * this; see getFilteredProjectsForSection.
 */
const PROJECT_FILTERS: { value: ProjectFilter; label: string }[] = [
  { value: 'All', label: en.projectFilters.all },
  { value: 'Mobile', label: en.projectFilters.mobile },
  { value: 'Web', label: en.projectFilters.web },
  { value: 'AI', label: en.projectFilters.ai },
];

/** Compact cards drawn before the overflow control. Four fills exactly two rows
    beside the feature card at both md and xl, so the initial block is a clean
    rectangle at every width without counting columns at runtime. */
const INITIAL_COMPACT_COUNT = 4;

interface ProjectGridProps {
  projects: Project[];
  showAll: boolean;
  onToggleShowAll: () => void;
}

/** Presents the filtered projects as one feature card followed by compact cards. */
function ProjectGrid({ projects, showAll, onToggleShowAll }: ProjectGridProps) {
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
          className={cn(
            compactProjects.length > 0 && 'project-card-feature-spanning'
          )}
        />
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="compact" />
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
            onClick={onToggleShowAll}
          >
            {showAll
              ? en.projectCard.showFewerProjects
              : en.projectCard.seeAllProjects.replace(
                  '{{count}}',
                  String(projects.length)
                )}
            {/* Same disclosure affordance as the experience rail's expander:
                trailing chevron, flipped while open. */}
            <ChevronDown
              size={15}
              aria-hidden="true"
              className={cn(
                'transition-transform duration-300 motion-reduce:transition-none',
                showAll && 'rotate-180'
              )}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}

const FILTER_PARAM = 'filter';
const EXPANDED_PARAM = 'all';

function isProjectFilter(value: string | null): value is ProjectFilter {
  return PROJECT_FILTERS.some((filter) => filter.value === value);
}

/** Filterable projects section. Each card links to the project's own page. */
export default function ProjectsSection() {
  const [selectedType, setSelectedType] = useState<ProjectFilter>('All');
  const [showAll, setShowAll] = useState(false);

  // Both the filter and the expansion live in the URL, so returning from a
  // project page lands the reader on the set of cards they left. The expansion
  // matters as much as the filter: without it the section comes back two rows
  // shorter than it was, and the position the browser restores on back lands
  // past the card they came from.
  //
  // Read in a layout effect rather than during render, which would make the
  // page dynamic, and rather than in an effect, which runs a frame too late:
  // the browser restores scroll against whatever is already laid out, so a
  // section that grows afterwards has already missed it. Written with
  // replaceState rather than the router, which would add a history entry per
  // click and bury the page the reader actually came from.
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get(FILTER_PARAM);
    if (isProjectFilter(filter)) setSelectedType(filter);
    setShowAll(params.get(EXPANDED_PARAM) === '1');
  }, []);

  const writeUrl = (filter: ProjectFilter, expanded: boolean) => {
    const url = new URL(window.location.href);
    if (filter === 'All') url.searchParams.delete(FILTER_PARAM);
    else url.searchParams.set(FILTER_PARAM, filter);
    if (expanded) url.searchParams.set(EXPANDED_PARAM, '1');
    else url.searchParams.delete(EXPANDED_PARAM);
    window.history.replaceState(null, '', url);
  };

  // A new filter shows a different set, so the old set's expansion does not
  // carry across to it.
  const chooseFilter = (value: ProjectFilter) => {
    setSelectedType(value);
    setShowAll(false);
    writeUrl(value, false);
  };

  const toggleShowAll = () => {
    const expanded = !showAll;
    setShowAll(expanded);
    writeUrl(selectedType, expanded);
  };
  const filteredProjects = useMemo(
    () => getFilteredProjectsForSection(projects, selectedType),
    [selectedType]
  );

  const filterButtons = (
    <>
      {PROJECT_FILTERS.map(({ value, label }) => (
        <PrimaryButton
          key={value}
          onClick={() => chooseFilter(value)}
          className={cn(
            'filter-pill',
            selectedType === value && 'filter-pill-selected'
          )}
          aria-pressed={selectedType === value}
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

  return (
    <Section
      anchor="projects"
      title={en.sectionHeaders.projects}
      rightChildren={filterButtons}
    >
      <ProjectGrid
        projects={filteredProjects}
        showAll={showAll}
        onToggleShowAll={toggleShowAll}
      />
    </Section>
  );
}
