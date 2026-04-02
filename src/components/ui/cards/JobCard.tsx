'use client';

import { MapPin, Building2, Code2, ChevronDown } from 'lucide-react';
import { SkillTile } from '@/components/ui/tiles';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import { useExpandableContent } from '@/hooks/utilityHooks';
import { cn } from '@/lib/utils';
import { isJobActive, type JobExperience } from '@/data/experience';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const JOB_SKILLS_PREVIEW = 5;

/** Inactive: neutral chrome. Active: brand-tinted surfaces; text stays neutral (esp. dark: neutral-200). */
const datePillInactive =
  'border-neutral-300/85 bg-neutral-100/90 text-neutral-800 dark:border-neutral-600/80 dark:bg-neutral-800/70 dark:text-neutral-200';

const datePillActive =
  'border-brand-500/55 bg-brand-400/25 text-neutral-900 shadow-sm dark:border-brand-400/45 dark:bg-brand-500/20 dark:text-neutral-200';

const iconFrameInactive =
  'border-neutral-300/85 bg-neutral-100/90 text-neutral-700 dark:border-neutral-600/80 dark:bg-neutral-800/70 dark:text-neutral-200';

const iconFrameActive =
  'border-brand-500/60 bg-brand-300/35 text-neutral-800 dark:border-brand-400/50 dark:bg-brand-500/25 dark:text-neutral-200';

interface JobCardProps {
  job: JobExperience;
}

export default function JobCard({ job }: JobCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [skillsRevealed, setSkillsRevealed] = useState(false);
  useEffect(() => {
    setSkillsRevealed(false);
  }, [job.id]);

  const {
    isExpanded,
    showExpandButton,
    contentHeight,
    contentRef,
    handleToggle,
  } = useExpandableContent(300);

  const jobSkills = getSkillsByIds(job.skills, skillsData);
  const active = isJobActive(job);

  /** Long roles: expand with description. Short roles: expand via "+N more" only. */
  const showAllSkills =
    jobSkills.length <= JOB_SKILLS_PREVIEW ||
    (showExpandButton && isExpanded) ||
    (!showExpandButton && skillsRevealed);

  const showExpandedSkills =
    showAllSkills && jobSkills.length > JOB_SKILLS_PREVIEW;

  return (
    <div
      className={cn(
        'surface-card surface-card-interactive group relative w-full overflow-hidden',
        'shadow-none hover:-translate-y-px hover:shadow-sm dark:shadow-none dark:hover:shadow-neutral-950/15',
        'md:hover:ring-1 md:hover:ring-brand-500/15'
      )}
    >
      <div className="space-y-4 p-6">
        <p
          className={cn(
            'inline-flex max-w-full rounded-full border px-4 py-1.5 text-xs font-semibold',
            active ? datePillActive : datePillInactive
          )}
          aria-label={`${job.startDate} to ${job.endDate}`}
        >
          {job.startDate} – {job.endDate}
        </p>

        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border',
              active ? iconFrameActive : iconFrameInactive
            )}
            aria-hidden
          >
            <Code2 size={22} strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="card-title mb-2">{job.title}</h3>
            <div className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="shrink-0 opacity-80" />
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {job.company}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0 opacity-80" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            style={{
              maxHeight: isExpanded ? `${contentHeight}px` : '300px',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="space-y-3">
              {job.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {!isExpanded && showExpandButton && (
            <div className="card-fade-gradient" />
          )}
        </div>

        {showExpandButton && (
          <button type="button" onClick={handleToggle} className="card-expand-btn">
            {isExpanded ? 'Show less' : 'Show more'}
            <ChevronDown
              size={16}
              className={cn(
                'transition-transform duration-300',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        )}

        {showExpandedSkills ? (
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
            {jobSkills.slice(0, JOB_SKILLS_PREVIEW).map((skill) => (
              <SkillTile
                key={skill.id}
                icon={skill.icon}
                label={skill.label}
                compact
              />
            ))}
            {jobSkills.slice(JOB_SKILLS_PREVIEW).map((skill, index) => (
              <motion.div
                key={`${skill.id}-extra-${index}`}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, scale: 0.72, y: 6 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 520,
                  damping: 26,
                  delay: prefersReducedMotion ? 0 : index * 0.038,
                }}
              >
                <SkillTile
                  icon={skill.icon}
                  label={skill.label}
                  compact
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <TechStack
            skills={jobSkills}
            maxIcons={showAllSkills ? undefined : JOB_SKILLS_PREVIEW}
            onMoreClick={
              !showExpandButton &&
              jobSkills.length > JOB_SKILLS_PREVIEW &&
              !skillsRevealed
                ? () => setSkillsRevealed(true)
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
