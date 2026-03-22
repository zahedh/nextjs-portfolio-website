'use client';
import { SkillTile } from '@/components/ui/tiles';
import Image from 'next/image';

import { skillsData } from '@/data/skills';
import type { Skill } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { en } from '@/language';
import {
  Building2,
  ChevronDown,
  ExternalLink,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const MAX_EXPAND_VH = 80;
const GRID_ROW_COLLAPSE_MS = 450;
const GRID_ROW_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const CONTENT_OPACITY_MS = 420;

interface ProjectCardProps {
  project: Project;
  imagePriority?: boolean;
}

const externalRel = 'noopener noreferrer';

function ProjectCardDetails({
  project,
  projectSkills,
}: {
  project: Project;
  projectSkills: Skill[];
}) {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-4">
        {project.description.map((paragraph, index) => (
          <p
            key={index}
            className="card-description text-sm leading-normal tracking-tight sm:text-base md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
      <div className="card-skills">
        {projectSkills.map((skill) => (
          <SkillTile
            key={skill.id}
            icon={skill.icon}
            label={skill.label}
            compact
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  imagePriority = false,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandReady, setExpandReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imageError, setImageError] = useState(false);
  const projectSkills = getSkillsByIds(project.skills, skillsData);
  const projectUrl = project.url?.trim();

  useEffect(() => {
    setExpandReady(false);
    let cancelled = false;

    const markReady = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setExpandReady(true);
        });
      });
    };

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) markReady();
      });
    } else {
      markReady();
    }

    return () => {
      cancelled = true;
    };
  }, [project.id]);

  useEffect(() => {
    setImageError(false);
  }, [project.id]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const gridRowTransitionMs = prefersReducedMotion
    ? 0
    : isExpanded
      ? 0
      : GRID_ROW_COLLAPSE_MS;

  const handleToggle = () => {
    if (!expandReady) return;
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card-container mx-auto mt-6 w-full max-w-3xl">
      <div className="card-date-badge -top-3">
        {project.startDate} - {project.endDate}
      </div>

      <div className="card-image-wrapper">
        <div className="flex h-64 w-full min-w-0 items-center justify-center overflow-hidden px-1 py-2">
          {project.image && !imageError ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, min(768px, 100vw)"
              className="max-h-full max-w-full rounded-xl bg-neutral-100 object-contain p-1 shadow-md dark:bg-neutral-800"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              priority={imagePriority}
              fetchPriority={imagePriority ? 'high' : 'low'}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {project.projectType === 'Web' ? (
                <Monitor
                  className="h-28 w-28 text-neutral-400 sm:h-32 sm:w-32 dark:text-neutral-600"
                  strokeWidth={1.5}
                />
              ) : (
                <Smartphone
                  className="h-28 w-28 text-neutral-400 sm:h-32 sm:w-32 dark:text-neutral-600"
                  strokeWidth={1.5}
                />
              )}
            </div>
          )}
        </div>
        </div>

      <div className="p-6 md:p-8">
        <h3 className="card-title">
          {projectUrl ? (
            <a
              href={projectUrl}
              target="_blank"
              rel={externalRel}
              className="card-title-link"
              aria-label={`${project.title} — ${en.projectCard.titleLinkAria}`}
            >
              <span>{project.title}</span>
              <ExternalLink
                className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
                aria-hidden
              />
            </a>
          ) : (
            project.title
          )}
        </h3>
        <div className="card-meta-row mb-6">
          <Building2 className="" size={16} />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {project.company}
          </span>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none invisible absolute top-0 right-0 left-0 -z-10 w-full overflow-visible select-none"
            aria-hidden
          >
            <ProjectCardDetails
              project={project}
              projectSkills={projectSkills}
            />
          </div>

          <div
            aria-hidden={!isExpanded}
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              transition: `grid-template-rows ${gridRowTransitionMs}ms ${GRID_ROW_EASING}`,
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className={
                  isExpanded ? 'overflow-x-hidden overflow-y-auto' : undefined
                }
                style={
                  isExpanded ? { maxHeight: `${MAX_EXPAND_VH}vh` } : undefined
                }
              >
                <div
                  className={`ease-out ${
                    isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
                  } ${prefersReducedMotion ? '' : 'transition-opacity'}`}
                  style={{
                    transitionDuration: prefersReducedMotion
                      ? '0ms'
                      : `${CONTENT_OPACITY_MS}ms`,
                  }}
                >
                  <ProjectCardDetails
                    project={project}
                    projectSkills={projectSkills}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            disabled={!expandReady}
            aria-busy={!expandReady}
            aria-expanded={isExpanded}
            title={!expandReady ? en.projectCard.expandPreparing : undefined}
            className="card-expand-btn disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isExpanded ? 'Show less' : 'View details'}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
