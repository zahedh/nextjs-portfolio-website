'use client';

import { MapPin, Building2 } from 'lucide-react';
import { SkillTile } from '@/components/ui/tiles';
import { skillsData } from '@/data/skills';
import type { JobExperience } from '@/data/experience';

interface JobCardProps {
  job: JobExperience;
  isLeft?: boolean;
}

export default function JobCard({ job, isLeft = false }: JobCardProps) {
  // Get skill objects from skill IDs
  const jobSkills = job.skills
    .map((skillId) => skillsData.find((s) => s.id === skillId))
    .filter((skill): skill is NonNullable<typeof skill> => skill !== undefined);

  return (
    <div className="group relative rounded-2xl border-2 border-neutral-200 bg-neutral-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg md:p-8 dark:border-neutral-700 dark:bg-neutral-800">
      {/* Date badge */}
      <div
        className={`absolute -top-4 rounded-full bg-neutral-200 px-4 py-1.5 text-xs font-semibold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 ${
          isLeft ? 'md:right-6' : 'md:left-6'
        } left-6`}
      >
        {job.startDate} - {job.endDate}
      </div>

      {/* Job header */}
      <div className="mt-2 mb-4">
        <h3 className="t-lg mb-2 text-neutral-900 dark:text-neutral-100">
          {job.title}
        </h3>
        <div className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <Building2 size={16} />
            <span className="font-medium">{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      {/* Job description */}
      <div className="mb-6 space-y-3">
        {job.description.map((paragraph, index) => (
          <p
            key={index}
            className="t-sm text-neutral-700 dark:text-neutral-300"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {jobSkills.map((skill) => (
          <SkillTile key={skill.id} icon={skill.icon} label={skill.label} />
        ))}
      </div>
    </div>
  );
}
