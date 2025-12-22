/** Calculate years of experience since start date */
function getYearsOfExperience() {
  const startDate = new Date('2020-05-01');
  const today = new Date();
  const years = today.getFullYear() - startDate.getFullYear();
  const monthDiff = today.getMonth() - startDate.getMonth();

  // If we haven't reached the anniversary month yet, subtract a year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < startDate.getDate())
  ) {
    return years - 1;
  }

  return years;
}

export const aboutStatCards = [
  {
    label: 'Years Experience',
    value: `${getYearsOfExperience()}+`,
    position: 'top-4 -left-52',
  },
  {
    label: 'Enterprise Clients',
    value: '2+',
    position: 'top-1/2 -translate-y-1/2 -left-68',
  },
  {
    label: 'Users Reached',
    value: '500K+',
    position: 'bottom-4 -left-56',
  },
  {
    label: 'Apps Published',
    value: 'iOS & Android',
    position: 'top-8 -right-56',
  },
  {
    label: 'AI-Powered Workflows',
    value: 'AI-Enhanced',
    position: 'top-1/2 -translate-y-1/2 -right-72',
  },
  {
    label: 'Degree',
    value: '1st Class',
    position: 'bottom-8 -right-52',
  },
];
