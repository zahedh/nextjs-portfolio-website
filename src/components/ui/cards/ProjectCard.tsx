'use client';
import { SkillTile } from '@/components/ui/tiles';
import Image from 'next/image';

import { skillsData } from '@/data/skills';
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
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';

/** Extra px so max-height isn’t 1–2px short after rounding / scrollbars */
const CONTENT_HEIGHT_BUFFER_PX = 8;
/** Cap expanded panel height so very long cards stay usable */
const MAX_EXPAND_VH = 80;

interface ProjectCardProps {
  project: Project;
}

const externalRel = 'noopener noreferrer';

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const projectSkills = getSkillsByIds(project.skills, skillsData);
  const projectUrl = project.url?.trim();

  const measureContentHeight = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    setContentHeight(Math.ceil(el.scrollHeight) + CONTENT_HEIGHT_BUFFER_PX);
  }, []);

  useLayoutEffect(() => {
    measureContentHeight();
  }, [project, measureContentHeight]);

  useLayoutEffect(() => {
    if (!isExpanded) return;
    measureContentHeight();
    const id = requestAnimationFrame(measureContentHeight);
    return () => cancelAnimationFrame(id);
  }, [isExpanded, measureContentHeight]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      measureContentHeight();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureContentHeight, project]);

  useEffect(() => {
    const onResize = () => measureContentHeight();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measureContentHeight]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card-container mx-auto mt-6 w-full max-w-3xl">
      {/* Date badge */}
      <div className="card-date-badge -top-3">
        {project.startDate} - {project.endDate}
      </div>

      {/* Project image */}
      <div className="card-image-wrapper">
        <div className="flex h-64 w-full items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title + ' preview'}
              width={320}
              height={192}
              style={{
                maxHeight: '12rem',
                width: 'auto',
                objectFit: 'contain',
              }}
              className="rounded-xl bg-neutral-100 shadow-md dark:bg-neutral-800"
              priority
            />
          ) : project.projectType === 'Web' ? (
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
      </div>

      {/* Compact header - always visible */}
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

        {/* Expandable details – scroll when constrained so content is never cut off */}
        <div
          className={
            isExpanded ? 'overflow-x-hidden overflow-y-auto' : 'overflow-hidden'
          }
          style={{
            maxHeight: isExpanded
              ? `min(${contentHeight}px, ${MAX_EXPAND_VH}vh)`
              : '0px',
            transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: isExpanded ? 'max-height' : 'auto',
          }}
        >
          <div ref={contentRef} className="space-y-6 pb-8">
            {/* Description */}
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

            {/* Skills */}
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
        </div>

        {/* Expand/Collapse button */}
        <button onClick={handleToggle} className="card-expand-btn">
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
  );
}
