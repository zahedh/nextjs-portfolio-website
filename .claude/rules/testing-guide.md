# Testing Guide

## Stack

Jest + React Testing Library, colocated with source files (`*.test.ts` / `*.test.tsx`).

## What to Test

Test pure functions, hooks, and utility logic. Do not test:
- Component rendering for its own sake (avoid snapshot tests)
- Implementation details (internal state, private methods)
- Third-party library behaviour

For components, test behaviour: what the user sees or what happens when they interact.

## Format: Given / When / Then

Test names follow this pattern:

```
GIVEN <initial state> WHEN <action> THEN <expected result>
```

```ts
it('GIVEN an empty skills list WHEN filtering by id THEN returns empty array', () => {
```

## Structure: Arrange / Act / Assert

Every test body has three labelled sections:

```ts
it('GIVEN valid skill IDs WHEN filtering THEN returns matching skills', () => {
  // Arrange
  const skills = [
    { id: 'react', name: 'React' },
    { id: 'ts', name: 'TypeScript' },
  ];
  const ids = ['react'];

  // Act
  const result = getSkillsByIds(ids, skills);

  // Assert
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('react');
});
```

## Grouping

Use `describe` to group by unit, then by scenario:

```ts
describe('getSkillsByIds', () => {
  describe('when IDs match', () => {
    it('GIVEN valid IDs WHEN filtering THEN returns matching skills', () => { ... });
  });

  describe('when IDs are empty or invalid', () => {
    it('GIVEN empty array WHEN filtering THEN returns empty array', () => { ... });
  });
});
```

## Rules

- ES module `import` only — never `require()`
- One assertion concept per test (multiple `expect` calls are fine if they verify the same concept)
- Use `jest.fn()` for callbacks, `jest.useFakeTimers()` for time-dependent logic
- Mock only at system boundaries (external APIs, `Date`, `Math.random`) — do not mock your own module internals
- Keep test data inline unless it's reused across 3+ tests, in which case extract to a `const` above the `describe` block
