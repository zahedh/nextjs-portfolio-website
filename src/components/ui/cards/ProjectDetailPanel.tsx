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
  getProjectLinkItems,
} from '@/lib/ui-logic';
import { getSkillsByIds } from '@/lib/utils';
import { cn } from '@/lib/utils';
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

function Section({
  label,
  divided,
  className,
  children,
}: {
  label: string;
  divided?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn(divided && 'dialog-section-divider', className)}>
      <p className="section-label">{label}</p>
      {children}
    </section>
  );
}

/** Collapsed section, used on the mobile sheet where the desktop panel shows the body outright. */
function Accordion({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <details className="detail-accordion group">
      <summary className="detail-accordion-trigger">
        {label}
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="detail-accordion-body">{children}</div>
    </details>
  );
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
  const projectLinks = getProjectLinkItems(project);
  const overview = getProjectExcerptLine(project);
  const featureLines = getProjectDetailFeatureLines(project);

  const noMotion = Boolean(prefersReducedMotion);
  const backdropMotion = getProjectDetailBackdropMotion(noMotion);
  const {
    initial: dialogInitial,
    animate: dialogAnimate,
    transition: dialogTransition,
  } = getProjectDetailDialogMotion(noMotion, isDesktop);

  // Written once, placed in both the mobile sheet and the desktop panel.
  const overviewBody = overview ? (
    <p className="body-text-muted text-body max-w-prose">{overview}</p>
  ) : null;
  const featuresBody =
    featureLines.length > 0 ? <FeatureList lines={featureLines} /> : null;
  const techBody = <TechStack skills={projectSkills} />;
  const metaBody = (variant: 'ribbon' | 'panel') => (
    <ProjectMetaSummary project={project} variant={variant} />
  );
  const linksBody =
    projectLinks.length > 0 ? (
      <ProjectLinks links={projectLinks} fullWidth />
    ) : null;

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
          <div className="relative z-10 flex min-h-0 flex-1 flex-col md:items-center md:justify-center md:px-8 md:py-10">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="dialog-surface"
              initial={dialogInitial}
              animate={dialogAnimate}
              transition={dialogTransition}
              onClick={(mouseEvent) => mouseEvent.stopPropagation()}
            >
              <div className="dialog-grab-handle" aria-hidden>
                <div className="h-1 w-10 rounded-full bg-neutral-400/45 dark:bg-neutral-500/50" />
              </div>

              <header className="dialog-header">
                <h2 id={titleId} className="dialog-title">
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
                <div className="project-card-scroll dialog-pane md:hidden">
                  <div className="dialog-pane-mobile-body">
                    <ProjectHeroMedia project={project} density="compact" />
                    <Section label={en.projectDisplay.sectionMetaItems}>
                      {metaBody('ribbon')}
                    </Section>
                    {linksBody ? (
                      <Section label={en.projectDisplay.sectionLinks}>
                        {linksBody}
                      </Section>
                    ) : null}
                    <Section
                      label={en.projectDisplay.sectionOverview}
                      divided
                      className="pb-8"
                    >
                      {overviewBody}
                    </Section>
                    {featuresBody ? (
                      <Accordion label={en.projectDisplay.sectionFeatures}>
                        {featuresBody}
                      </Accordion>
                    ) : null}
                    <Accordion label={en.projectDisplay.sectionTechStack}>
                      {techBody}
                    </Accordion>
                  </div>
                </div>

                <div className="project-card-scroll dialog-pane hidden flex-col md:flex">
                  <div className="dialog-pane-desktop-body">
                    <Section
                      label={en.projectDisplay.sectionOverview}
                      divided
                      className="pb-10"
                    >
                      {overviewBody}
                    </Section>
                    {featuresBody ? (
                      <Section
                        label={en.projectDisplay.sectionFeatures}
                        divided
                        className="pb-10"
                      >
                        {featuresBody}
                      </Section>
                    ) : null}
                    <Section label={en.projectDisplay.sectionTechStack}>
                      {techBody}
                    </Section>
                  </div>
                </div>

                <aside className="project-card-scroll dialog-aside">
                  <ProjectHeroMedia project={project} density="compact" />
                  <Section label={en.projectDisplay.sectionMetaItems}>
                    {metaBody('panel')}
                  </Section>
                  {linksBody ? (
                    <Section label={en.projectDisplay.sectionLinks}>
                      {linksBody}
                    </Section>
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
