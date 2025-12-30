import { en } from '@/language';

/** Calculate years of experience since start date */
function getYearsOfExperience() {
  const startDate = new Date('2020-05-01');
  const today = new Date();
  const years = today.getFullYear() - startDate.getFullYear();
  const monthDiff = today.getMonth() - startDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < startDate.getDate())
  ) {
    return years - 1;
  }

  return years;
}

const { statCards } = en.aboutSection;

export const aboutStatCards = [
  {
    label: statCards.yearsExperienceLabel,
    value: `${getYearsOfExperience()}+`,
    position: 'top-4 -left-52 xl:-left-28 2xl:-left-52',
  },
  {
    label: statCards.enterpriseClientsLabel,
    value: statCards.enterpriseClientsValue,
    position: 'top-1/2 -translate-y-1/2 -left-68 xl:-left-40 2xl:-left-68',
  },
  {
    label: statCards.usersReachedLabel,
    value: statCards.usersReachedValue,
    position: 'bottom-4 -left-56 xl:-left-32 2xl:-left-56',
  },
  {
    label: statCards.appsPublishedLabel,
    value: statCards.appsPublishedValue,
    position: 'top-8 -right-56 xl:-right-32 2xl:-right-56',
  },
  {
    label: statCards.aiWorkflowsLabel,
    value: statCards.aiWorkflowsValue,
    position: 'top-1/2 -translate-y-1/2 -right-72 xl:-right-44 2xl:-right-72',
  },
  {
    label: statCards.degreeLabel,
    value: statCards.degreeValue,
    position: 'bottom-8 -right-52 xl:-right-28 2xl:-right-52',
  },
];
