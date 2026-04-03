'use client';

import { FeatureList } from '@/components/ui/cards/FeatureList';
import { ProjectHeroMedia } from '@/components/ui/cards/ProjectHeroMedia';
import { ProjectLinks } from '@/components/ui/cards/ProjectLinks';
import { ProjectMeta } from '@/components/ui/cards/ProjectMeta';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import type { Project } from '@/data/projects';
import { useBreakpoint } from '@/hooks/utilityHooks';
import { getProjectExcerptLine } from '@/lib/projectDisplay';
import { getSkillsByIds } from '@/lib/utils';
import { en } from '@/language';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useBreakpoint('md');
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !project) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const frameId = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(frameId);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, project]);

  if (!mounted || !project) return null;

  const projectSkills = getSkillsByIds(project.skills, skillsData);
  const projectUrl = project.url?.trim();
  const overview = getProjectExcerptLine(project);

  const noMotion = Boolean(prefersReducedMotion);

  const overlayTransition = noMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: 'easeOut' as const };

  const dialogInitial = noMotion
    ? { opacity: 0 }
    : isDesktop
      ? { opacity: 0, y: 20, scale: 0.94 }
      : { y: '100%', opacity: 1 };

  const dialogAnimate = noMotion
    ? { opacity: 1 }
    : isDesktop
      ? { opacity: 1, y: 0, scale: 1 }
      : { y: 0, opacity: 1 };

  const dialogTransition = noMotion
    ? { duration: 0 }
    : isDesktop
      ? {
          type: 'spring' as const,
          damping: 30,
          stiffness: 320,
        }
      : {
          y: { type: 'spring' as const, damping: 34, stiffness: 380 },
          opacity: { duration: 0.2 },
        };

  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[100] flex min-h-0 flex-col"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
        >
          <div className="dialog-backdrop" onClick={onClose} aria-hidden />
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
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="brand-icon-btn h-12 w-12 md:h-11 md:w-11"
                  aria-label={en.projectDetailPanel.closeLabel}
                >
                  <X className="h-6 w-6" aria-hidden />
                </button>
              </header>

              <div className="flex min-h-0 flex-1 flex-col md:flex-row md:overflow-hidden">
                <div className="project-card-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto md:hidden">
                  <div className="flex flex-col gap-8 px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                    <ProjectHeroMedia project={project} density="compact" />
                    <section>
                      <SectionLabel>
                        {en.projectDisplay.sectionMetadata}
                      </SectionLabel>
                      <ProjectMeta project={project} variant="ribbon" />
                    </section>
                    {projectUrl ? (
                      <ProjectLinks url={projectUrl} fullWidth />
                    ) : null}
                    <section className="border-b border-neutral-200/60 pb-8 dark:border-neutral-700/50">
                      <SectionLabel>
                        {en.projectDisplay.sectionOverview}
                      </SectionLabel>
                      {overview ? (
                        <p className="body-text-muted text-base">{overview}</p>
                      ) : null}
                    </section>
                    <details className="detail-accordion group">
                      <summary className="detail-accordion-trigger">
                        {en.projectDisplay.sectionFeatures}
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="detail-accordion-body">
                        <FeatureList lines={project.description} />
                      </div>
                    </details>
                    <details className="detail-accordion group" open>
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
                    <section className="border-b border-neutral-200/60 pb-10 dark:border-neutral-700/50">
                      <SectionLabel>
                        {en.projectDisplay.sectionFeatures}
                      </SectionLabel>
                      <FeatureList lines={project.description} />
                    </section>
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
                      {en.projectDisplay.sectionMetadata}
                    </SectionLabel>
                    <ProjectMeta project={project} variant="panel" />
                  </div>
                  {projectUrl ? (
                    <ProjectLinks url={projectUrl} fullWidth />
                  ) : null}
                </aside>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
