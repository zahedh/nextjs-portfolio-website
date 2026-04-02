import { en } from '@/language';
import { getYearsOfExperience } from '@/lib';

const { statCards } = en.aboutSection;

/** Proof points for the About “Highlights” panel (no layout positions). */
export const aboutHighlightStats = [
  {
    label: statCards.yearsExperienceLabel,
    value: `${getYearsOfExperience()}+`,
  },
  {
    label: statCards.enterpriseClientsLabel,
    value: statCards.enterpriseClientsValue,
  },
  {
    label: statCards.usersReachedLabel,
    value: statCards.usersReachedValue,
  },
  {
    label: statCards.appsPublishedLabel,
    value: statCards.appsPublishedValue,
  },
  {
    label: statCards.aiWorkflowsLabel,
    value: statCards.aiWorkflowsValue,
  },
  {
    label: statCards.degreeLabel,
    value: statCards.degreeValue,
  },
];
