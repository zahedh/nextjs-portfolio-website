'use client';

import {
  CalloutWrapper,
  PrimaryButton,
  ProjectCard,
  ProjectDetailPanel,
  Section,
} from '@/components';
import { projects } from '@/data/projects';
import { skillsData } from '@/data';
import { en } from '@/language';
import { getFilteredProjectsForSection } from '@/lib/project';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/providers/global-store-provider';
import { Project, ProjectFilter } from '@/types/project';
import { useMemo, useState } from 'react';

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
    <>
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
    </>
  );
}

/** Filterable projects section with an in-place detail panel. */
export default function ProjectsSection() {
  const [selectedType, setSelectedType] = useState<ProjectFilter>('All');
  const [panelProject, setPanelProject] = useState<Project | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const selectedSkillId = useGlobalStore((state) => state.selectedSkillId);
  const setSelectedSkillId = useGlobalStore(
    (state) => state.setSelectedSkillId
  );

  const filteredProjects = useMemo(
    () =>
      getFilteredProjectsForSection(projects, selectedType, selectedSkillId),
    [selectedType, selectedSkillId]
  );

  const selectedSkillLabel = selectedSkillId
    ? (skillsData.find((skill) => skill.id === selectedSkillId)?.label ??
      selectedSkillId)
    : null;

  const filterButtons = selectedSkillId ? (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <span
        className="text-brand-600 dark:text-brand-300 font-heading text-meta font-semibold tracking-tight"
        aria-live="polite"
      >
        {selectedSkillLabel}
      </span>
      <CalloutWrapper>
        <PrimaryButton
          onClick={() => setSelectedSkillId(null)}
          aria-label={en.projectFilters.clearSkillFilterAriaLabel}
          className="btn-callout"
        >
          {en.projectFilters.clearSkillFilter}
        </PrimaryButton>
      </CalloutWrapper>
    </div>
  ) : (
    <>
      <PrimaryButton
        onClick={() => setSelectedType('All')}
        className={selectedType !== 'All' ? 'btn-toggle-idle' : ''}
      >
        {en.projectFilters.all}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Web')}
        className={selectedType !== 'Web' ? 'btn-toggle-idle' : ''}
      >
        {en.projectFilters.web}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Mobile')}
        className={selectedType !== 'Mobile' ? 'btn-toggle-idle' : ''}
      >
        {en.projectFilters.mobile}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('AI')}
        className={selectedType !== 'AI' ? 'btn-toggle-idle' : ''}
      >
        {en.projectFilters.ai}
      </PrimaryButton>
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
        key={`${selectedType}-${selectedSkillId ?? 'all'}`}
        projects={filteredProjects}
        onOpenFullDetails={handleOpenFullDetails}
      />
    </Section>
  );
}
