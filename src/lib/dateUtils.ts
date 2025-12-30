/**
 * Calculate years of experience since a start date
 * @param startDate - The start date as a Date object or date string
 * @returns The number of complete years since the start date
 */
export function getYearsOfExperience(
  startDate: Date | string = '2020-05-01'
): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const today = new Date();
  const years = today.getFullYear() - start.getFullYear();
  const monthDiff = today.getMonth() - start.getMonth();

  // If we haven't reached the anniversary month yet, subtract a year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < start.getDate())) {
    return years - 1;
  }

  return years;
}
