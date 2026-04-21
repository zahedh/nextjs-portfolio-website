'use client';

import { FeatureList } from '@/components/ui/cards/FeatureList';
import { ProjectHeroMedia } from '@/components/ui/cards/ProjectHeroMedia';
import { ProjectLinks } from '@/components/ui/cards/ProjectLinks';
import { ProjectMetaSummary } from '@/components/ui/cards/ProjectMetaItems';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { Project } from '@/types/project';
import {
  useBodyScrollLock,
  useEscapeKeydown,
  useFocusCloseButtonOnOpen,
} from '@/hooks/overlayHooks';
import { useBreakpoint, useClientMounted } from '@/hooks/utilityHooks';
import {
  getProjectDetailFeatureLines,
  getProjectDetailBackdropMotion,
  getProjectDetailDialogMotion,
  getProjectExcerptLine,
} from '@/lib/ui-logic';
import { ProjectLinkItem } from '@/types/project';
import { getSkillsByIds } from '@/lib/utils';
import { DismissButton } from '@/components/ui/buttons';
import { en } from '@/language';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { type ReactNode, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ProjectDetailPanelProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

/** Full-screen project detail modal with responsive mobile sheet / desktop dialog layout. */
export default function ProjectDetailPanel({
  project,
  open,
  onClose,
  onExitComplete,
}: ProjectDetailPanelProps) {
  const mounted = useClientMounted();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useBreakpoint('md');
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(open);
  useEscapeKeydown(open, onClose);
  useFocusCloseButtonOnOpen(open && !!project, closeRef, project);

  if (!mounted || !project) return null;

  const projectSkills = getSkillsByIds(project.skills, skillsData);
  const projectUrl = project.url?.trim();
  const projectRepoUrl = project.repoUrl?.trim();
  const projectLinks: ProjectLinkItem[] = [
    ...(projectUrl
      ? [
          {
            url: projectUrl,
            label: project.urlLabel?.trim() || en.projectDisplay.visitLive,
          },
        ]
      : []),
    ...(projectRepoUrl
      ? [
          {
            url: projectRepoUrl,
            label: project.repoLabel?.trim() || en.projectDisplay.viewRepo,
          },
        ]
      : []),
  ];
  const overview = getProjectExcerptLine(project);
  const featureLinesForList = getProjectDetailFeatureLines(project);

  const noMotion = Boolean(prefersReducedMotion);
  const backdropMotion = getProjectDetailBackdropMotion(noMotion);
  const {
    initial: dialogInitial,
    animate: dialogAnimate,
    transition: dialogTransition,
  } = getProjectDetailDialogMotion(noMotion, isDesktop);

  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && project && (
        <div
          key={project.id}
          className="fixed inset-0 z-[100] flex min-h-0 flex-col"
          role="presentation"
        >
          <motion.div
            className="dialog-backdrop"
            onClick={onClose}
            aria-hidden
            initial={backdropMotion.initial}
            animate={backdropMotion.animate}
            exit={backdropMotion.exit}
            transition={backdropMotion.transition}
          />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col px-0 pt-0 md:items-center md:justify-center md:px-8 md:py-10">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="surface-card flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-t-3xl border-0 shadow-lg md:h-auto md:max-h-[min(92dvh,900px)] md:max-w-5xl md:flex-none md:rounded-3xl md:border-2 md:pt-0 dark:bg-neutral-900/95"
              initial={dialogInitial}
              animate={dialogAnimate}
              transition={dialogTransition}
              onClick={(mouseEvent) => mouseEvent.stopPropagation()}
            >
              <div
                className="flex shrink-0 justify-center pt-[max(0.35rem,env(safe-area-inset-top))] pb-1 md:hidden"
                aria-hidden
              >
                <div className="h-1 w-10 rounded-full bg-neutral-400/45 dark:bg-neutral-500/50" />
              </div>

              <header className="dialog-header">
                <h2
                  id={titleId}
                  className="card-title min-w-0 flex-1 text-left text-xl leading-tight font-bold text-neutral-900 sm:text-2xl md:text-3xl dark:text-neutral-100"
                >
                  <span className="line-clamp-3">{project.title}</span>
                </h2>
                <DismissButton
                  ref={closeRef}
                  variant="brand"
                  onClick={onClose}
                  aria-label={en.projectDetailPanel.closeLabel}
                />
              </header>

              <div className="flex min-h-0 flex-1 flex-col md:flex-row md:overflow-hidden">
                <div className="project-card-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto md:hidden">
                  <div className="flex flex-col gap-8 px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                    <ProjectHeroMedia project={project} density="compact" />
                    <section>
                      <SectionLabel>
                        {en.projectDisplay.sectionMetaItems}
                      </SectionLabel>
                      <ProjectMetaSummary project={project} variant="ribbon" />
                    </section>
                    {projectLinks.length > 0 ? (
                      <section>
                        <SectionLabel>
                          {en.projectDisplay.sectionLinks}
                        </SectionLabel>
                        <ProjectLinks links={projectLinks} fullWidth />
                      </section>
                    ) : null}
                    <section className="border-b border-neutral-200/60 pb-8 dark:border-neutral-700/50">
                      <SectionLabel>
                        {en.projectDisplay.sectionOverview}
                      </SectionLabel>
                      {overview ? (
                        <p className="body-text-muted text-base">{overview}</p>
                      ) : null}
                    </section>
                    {featureLinesForList.length > 0 ? (
                      <details className="detail-accordion group">
                        <summary className="detail-accordion-trigger">
                          {en.projectDisplay.sectionFeatures}
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="detail-accordion-body">
                          <FeatureList lines={featureLinesForList} />
                        </div>
                      </details>
                    ) : null}
                    <details className="detail-accordion group">
                      <summary className="detail-accordion-trigger">
                        {en.projectDisplay.sectionTechStack}
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="detail-accordion-body">
                        <TechStack skills={projectSkills} />
                      </div>
                    </details>
                  </div>
                </div>

                <div className="project-card-scroll hidden min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto md:flex">
                  <div className="flex min-w-0 flex-col gap-10 px-8 pt-6 pb-10">
                    <section className="border-b border-neutral-200/60 pb-10 dark:border-neutral-700/50">
                      <SectionLabel>
                        {en.projectDisplay.sectionOverview}
                      </SectionLabel>
                      {overview ? (
                        <p className="body-text-muted max-w-prose text-base">
                          {overview}
                        </p>
                      ) : null}
                    </section>
                    {featureLinesForList.length > 0 ? (
                      <section className="border-b border-neutral-200/60 pb-10 dark:border-neutral-700/50">
                        <SectionLabel>
                          {en.projectDisplay.sectionFeatures}
                        </SectionLabel>
                        <FeatureList lines={featureLinesForList} />
                      </section>
                    ) : null}
                    <section>
                      <SectionLabel>
                        {en.projectDisplay.sectionTechStack}
                      </SectionLabel>
                      <TechStack skills={projectSkills} />
                    </section>
                  </div>
                </div>

                <aside className="project-card-scroll hidden min-h-0 w-full flex-col gap-8 overflow-y-auto border-neutral-200/60 md:flex md:w-[34%] md:max-w-sm md:min-w-[260px] md:flex-shrink-0 md:border-t-0 md:border-l md:px-8 md:pt-6 md:pb-10 dark:border-neutral-700/50">
                  <ProjectHeroMedia project={project} density="compact" />
                  <div>
                    <SectionLabel>
                      {en.projectDisplay.sectionMetaItems}
                    </SectionLabel>
                    <ProjectMetaSummary project={project} variant="panel" />
                  </div>
                  {projectLinks.length > 0 ? (
                    <section>
                      <SectionLabel>
                        {en.projectDisplay.sectionLinks}
                      </SectionLabel>
                      <ProjectLinks links={projectLinks} fullWidth />
                    </section>
                  ) : null}
                </aside>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
