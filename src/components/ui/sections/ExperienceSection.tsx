import { Section } from '@/components';
import { JobCard } from '@/components/ui/cards';
import { isJobActive, jobExperiences } from '@/data';
import { en } from '@/language';

/** Section summarising professional work experience. */
export default function ExperienceSection() {
  return (
    <Section anchor="experience" title={en.sectionHeaders.experience}>
      <div className="experience-rail">
        {jobExperiences.map((job) => (
          <div key={job.id} className="experience-rail-row">
            <div
              className={
                isJobActive(job)
                  ? 'experience-year experience-year-active'
                  : 'experience-year'
              }
            >
              {job.startDate.split(' ').pop()}
            </div>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </Section>
  );
}
