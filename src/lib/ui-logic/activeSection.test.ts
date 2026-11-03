import { pickActiveSection } from './activeSection';

const sections = [
  { id: 'home', top: -900 },
  { id: 'skills', top: -100 },
  { id: 'about', top: 300 },
  { id: 'projects', top: 120 },
];

describe('pickActiveSection', () => {
  it('picks the section whose top most recently crossed the line, in any order', () => {
    expect(pickActiveSection(sections, 200, false)).toBe('projects');
    expect(pickActiveSection(sections, 0, false)).toBe('skills');
  });

  it('returns null when no section has reached the line', () => {
    expect(pickActiveSection([{ id: 'skills', top: 500 }], 200, false)).toBe(
      null
    );
  });

  it('picks the last section on the page once the page bottoms out', () => {
    expect(pickActiveSection(sections, 200, true)).toBe('about');
  });

  it('lets a pinned section win, even at the bottom of the page', () => {
    expect(pickActiveSection(sections, 200, true, 'projects')).toBe('projects');
    expect(pickActiveSection(sections, 200, false, 'home')).toBe('home');
  });

  it('ignores a pinned id that is not on the page', () => {
    expect(pickActiveSection(sections, 200, true, 'contact')).toBe('about');
  });
});
