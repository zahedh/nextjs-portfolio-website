'use client';

import { MapPin, Building2, ChevronDown } from 'lucide-react';
import { SkillTile } from '@/components/ui/tiles';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import { useExpandableContent } from '@/hooks/utilityHooks';
import { SecondaryButton } from '@/components';
import { cn } from '@/lib/utils';
import { en } from '@/language';
import { isJobActive, type JobExperience } from '@/data/experience';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const JOB_SKILLS_PREVIEW = 5;

interface JobCardProps {
  job: JobExperience;
}

/** Expandable experience card with date pill, role details, and animated tech stack. */
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
  } = useExpandableContent(360);

  const jobSkills = getSkillsByIds(job.skills, skillsData);
  const active = isJobActive(job);

  const showAllSkills =
    jobSkills.length <= JOB_SKILLS_PREVIEW ||
    (showExpandButton && isExpanded) ||
    (!showExpandButton && skillsRevealed);

  const showExpandedSkills =
    showAllSkills && jobSkills.length > JOB_SKILLS_PREVIEW;

  return (
    <div className="surface-card surface-card-interactive surface-card-flat group relative flex min-h-[400px] w-full flex-col overflow-hidden sm:min-h-[440px]">
      <div className="flex flex-1 flex-col space-y-6 p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-2 self-start">
          <p
            className={cn(
              'job-date-pill',
              active ? 'job-date-pill-active' : 'job-date-pill-inactive'
            )}
            aria-label={`${job.startDate} to ${job.endDate}`}
          >
            {`${job.startDate} \u2013 ${job.endDate}`}
          </p>
          <span
            className={cn(
              'brand-pill shrink-0',
              active ? 'brand-pill-active' : 'brand-pill-inactive'
            )}
          >
            {active ? en.jobDisplay.statusCurrent : en.jobDisplay.statusPast}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="mb-2 text-xl leading-tight font-semibold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl dark:text-neutral-100">
            {job.title}
          </h3>
          <div className="flex flex-col gap-1.5 text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="shrink-0 opacity-80" />
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {job.company}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="shrink-0 opacity-80" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <div
            style={{
              maxHeight: isExpanded ? `${contentHeight}px` : '360px',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="space-y-4">
              {job.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400"
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
          <SecondaryButton
            type="button"
            onClick={handleToggle}
            className={cn(
              'btn-primary-sm',
              'mt-3 w-full',
              'hover:bg-brand-500'
            )}
          >
            {isExpanded ? 'Show less' : 'Show more'}
            <ChevronDown
              size={16}
              className={cn(
                'transition-transform duration-300',
                isExpanded && 'rotate-180'
              )}
            />
          </SecondaryButton>
        )}

        {showExpandedSkills ? (
          <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
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
                <SkillTile icon={skill.icon} label={skill.label} compact />
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
