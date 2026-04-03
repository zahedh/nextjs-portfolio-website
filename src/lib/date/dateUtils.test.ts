import { getYearsOfExperience } from './dateUtils';

describe('dateUtils', () => {
  describe('getYearsOfExperience', () => {
    beforeEach(() => {
      // Mock current date to March 10, 2026 for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-03-10'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('GIVEN a start date 5 years ago WHEN calculating years THEN returns 5', () => {
      // Given
      const startDate = new Date('2021-03-10');

      // When
      const result = getYearsOfExperience(startDate);

      // Then
      expect(result).toBe(5);
    });

    it('GIVEN anniversary has not passed yet WHEN calculating years THEN subtracts a year', () => {
      // Given - start date is May 1st, current is March 10th (before anniversary)
      const startDate = new Date('2020-05-01');

      // When
      const result = getYearsOfExperience(startDate);

      // Then
      expect(result).toBe(5); // Not 6, because May hasn't arrived yet
    });

    it('GIVEN anniversary has passed WHEN calculating years THEN includes current year', () => {
      // Given - start date is January 1st, current is March 10th (after anniversary)
      const startDate = new Date('2020-01-01');

      // When
      const result = getYearsOfExperience(startDate);

      // Then
      expect(result).toBe(6); // Includes current year since January already passed
    });

    it('GIVEN same month but day has not passed WHEN calculating years THEN subtracts a year', () => {
      // Given - start date is March 15th, current is March 10th
      const startDate = new Date('2020-03-15');

      // When
      const result = getYearsOfExperience(startDate);

      // Then
      expect(result).toBe(5); // Not 6, because March 15th hasn't arrived yet
    });

    it('GIVEN same month and day has passed WHEN calculating years THEN includes current year', () => {
      // Given - start date is March 1st, current is March 10th
      const startDate = new Date('2020-03-01');

      // When
      const result = getYearsOfExperience(startDate);

      // Then
      expect(result).toBe(6); // Includes current year since March 1st passed
    });

    it('GIVEN exact anniversary date WHEN calculating years THEN includes current year', () => {
      // Given - exact same date
      const startDate = new Date('2020-03-10');

      // When
      const result = getYearsOfExperience(startDate);

      // Then
      expect(result).toBe(6); // Includes the anniversary year
    });

    it('GIVEN string date WHEN calculating years THEN handles correctly', () => {
      // Given
      const startDate = '2020-01-01';

      // When
      const result = getYearsOfExperience(startDate);

      // Then
      expect(result).toBe(6);
    });

    it('GIVEN no arguments WHEN calculating years THEN uses default start date', () => {
      // Given - no arguments, uses default '2020-05-01'

      // When
      const result = getYearsOfExperience();

      // Then
      expect(result).toBe(5); // May 2020 to March 2026 is 5 complete years
    });
  });
});
