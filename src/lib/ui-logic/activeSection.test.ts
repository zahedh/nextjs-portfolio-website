import { pickActiveSection } from './activeSection';

const sections = [
  { id: 'home', top: -900 },
  { id: 'skills', top: -100 },
  { id: 'about', top: 300 },
  { id: 'projects', top: 120 },
];

describe('pickActiveSection', () => {
  it('GIVEN sections out of page order WHEN the line is below several tops THEN the nearest one above it wins', () => {
    expect(pickActiveSection(sections, 200, false)).toBe('projects');
  });

  it('GIVEN the line moves up WHEN picking THEN the section above the new line wins', () => {
    expect(pickActiveSection(sections, 0, false)).toBe('skills');
  });

  it('GIVEN no section has reached the line WHEN picking THEN there is no active section', () => {
    expect(pickActiveSection([{ id: 'skills', top: 500 }], 200, false)).toBe(
      null
    );
  });

  it('GIVEN the page has bottomed out WHEN picking THEN the last section wins', () => {
    expect(pickActiveSection(sections, 200, true)).toBe('about');
  });

  it('GIVEN a pinned section at the bottom of the page WHEN picking THEN the pin wins', () => {
    expect(pickActiveSection(sections, 200, true, 'projects')).toBe('projects');
  });

  it('GIVEN a pinned section mid-page WHEN picking THEN the pin wins', () => {
    expect(pickActiveSection(sections, 200, false, 'home')).toBe('home');
  });

  it('GIVEN a pinned id not on the page WHEN picking THEN it is ignored', () => {
    expect(pickActiveSection(sections, 200, true, 'contact')).toBe('about');
  });
});
