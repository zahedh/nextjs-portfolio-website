import { cn, createEscapeHandler, getSkillsByIds } from './utils';

describe('utils', () => {
  describe('cn (className merger)', () => {
    it('GIVEN multiple class names WHEN merging THEN combines them correctly', () => {
      // Given
      const classes = ['bg-red-500', 'text-white', 'p-4'];

      // When
      const result = cn(...classes);

      // Then
      expect(result).toBe('bg-red-500 text-white p-4');
    });

    it('GIVEN conflicting Tailwind classes WHEN merging THEN keeps last value', () => {
      // Given - bg-red-500 should be overridden by bg-blue-500
      const classes = ['bg-red-500', 'bg-blue-500'];

      // When
      const result = cn(...classes);

      // Then
      expect(result).toBe('bg-blue-500');
    });

    it('GIVEN conditional classes with undefined WHEN merging THEN filters out falsy values', () => {
      // Given
      const isActive = false;
      const classes = ['base-class', isActive && 'active-class', 'final-class'];

      // When
      const result = cn(...classes);

      // Then
      expect(result).toBe('base-class final-class');
    });

    it('GIVEN empty input WHEN merging THEN returns empty string', () => {
      // Given - no classes

      // When
      const result = cn();

      // Then
      expect(result).toBe('');
    });

    it('GIVEN custom Tailwind classes WHEN merging THEN preserves custom classes', () => {
      // Given - custom text size classes defined in Tailwind config
      const classes = ['t-lg', 't-xl'];

      // When
      const result = cn(...classes);

      // Then
      expect(result).toBe('t-xl'); // Later class wins
    });
  });

  describe('createEscapeHandler', () => {
    it('GIVEN callback function WHEN Escape key pressed THEN executes callback', () => {
      // Given
      const mockCallback = jest.fn();
      const handler = createEscapeHandler(mockCallback);
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });

      // When
      handler(escapeEvent);

      // Then
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('GIVEN callback function WHEN non-Escape key pressed THEN does not execute callback', () => {
      // Given
      const mockCallback = jest.fn();
      const handler = createEscapeHandler(mockCallback);
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

      // When
      handler(enterEvent);

      // Then
      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('GIVEN callback function WHEN multiple different keys pressed THEN only executes on Escape', () => {
      // Given
      const mockCallback = jest.fn();
      const handler = createEscapeHandler(mockCallback);

      // When
      handler(new KeyboardEvent('keydown', { key: 'Tab' }));
      handler(new KeyboardEvent('keydown', { key: 'Enter' }));
      handler(new KeyboardEvent('keydown', { key: 'Escape' }));
      handler(new KeyboardEvent('keydown', { key: 'Space' }));

      // Then
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSkillsByIds', () => {
    // Test data
    const mockSkills = [
      { id: 'react', name: 'React', category: 'framework' },
      { id: 'typescript', name: 'TypeScript', category: 'language' },
      { id: 'nextjs', name: 'Next.js', category: 'framework' },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'styling' },
    ];

    it('GIVEN valid skill IDs WHEN filtering THEN returns matching skills', () => {
      // Given
      const skillIds = ['react', 'typescript'];

      // When
      const result = getSkillsByIds(skillIds, mockSkills);

      // Then
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(mockSkills[0]);
      expect(result[1]).toEqual(mockSkills[1]);
    });

    it('GIVEN all skill IDs WHEN filtering THEN returns all skills in order', () => {
      // Given
      const skillIds = ['react', 'typescript', 'nextjs', 'tailwind'];

      // When
      const result = getSkillsByIds(skillIds, mockSkills);

      // Then
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockSkills);
    });

    it('GIVEN non-existent skill ID WHEN filtering THEN excludes undefined values', () => {
      // Given
      const skillIds = ['react', 'nonexistent', 'typescript'];

      // When
      const result = getSkillsByIds(skillIds, mockSkills);

      // Then
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('react');
      expect(result[1].id).toBe('typescript');
    });

    it('GIVEN empty skill IDs array WHEN filtering THEN returns empty array', () => {
      // Given
      const skillIds: string[] = [];

      // When
      const result = getSkillsByIds(skillIds, mockSkills);

      // Then
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('GIVEN all non-existent IDs WHEN filtering THEN returns empty array', () => {
      // Given
      const skillIds = ['invalid1', 'invalid2', 'invalid3'];

      // When
      const result = getSkillsByIds(skillIds, mockSkills);

      // Then
      expect(result).toHaveLength(0);
    });

    it('GIVEN duplicate skill IDs WHEN filtering THEN returns duplicates', () => {
      // Given
      const skillIds = ['react', 'react', 'typescript'];

      // When
      const result = getSkillsByIds(skillIds, mockSkills);

      // Then
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(mockSkills[0]);
      expect(result[1]).toEqual(mockSkills[0]); // Same skill twice
      expect(result[2]).toEqual(mockSkills[1]);
    });

    it('GIVEN different order of IDs WHEN filtering THEN preserves input order', () => {
      // Given - reverse order from original array
      const skillIds = ['tailwind', 'nextjs', 'typescript', 'react'];

      // When
      const result = getSkillsByIds(skillIds, mockSkills);

      // Then
      expect(result).toHaveLength(4);
      expect(result[0].id).toBe('tailwind');
      expect(result[1].id).toBe('nextjs');
      expect(result[2].id).toBe('typescript');
      expect(result[3].id).toBe('react');
    });
  });
});
