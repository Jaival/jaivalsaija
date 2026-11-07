import { describe, expect, test } from 'bun:test';
import { cv } from './cv';
import userData from './data';

// Dates read as a range: "MM/YYYY – MM/YYYY", or one that ends in
// "– present" or "(expected)". A typo here would reach /cv, the experience,
// projects and about pages, so it fails the build instead.
const month = '(0[1-9]|1[0-2])/\\d{4}';
const range = new RegExp(`^${month} – (${month}( \\(expected\\))?|present)$`);

const dated = [
  ...cv.experience.map(entry => ({ name: entry.title, dates: entry.dates })),
  ...cv.education.map(entry => ({ name: entry.title, dates: entry.dates })),
  ...userData.earlierWork.map(entry => ({
    name: entry.title,
    dates: entry.dates,
  })),
  ...cv.projects.map(project => ({ name: project.name, dates: project.dates })),
  ...userData.projects.map(project => ({
    name: project.title,
    dates: project.dates,
  })),
];

const stacked = [
  ...cv.projects.map(project => ({ name: project.name, stack: project.stack })),
  ...userData.projects.map(project => ({
    name: project.title,
    stack: project.stack,
  })),
];

describe('cv and site data', () => {
  test.each(dated)('$name has a MM/YYYY date range', ({ dates }) => {
    expect(dates).toMatch(range);
  });

  test.each(stacked)('$name lists its stack', ({ stack }) => {
    expect(stack.length).toBeGreaterThan(0);
    expect(stack.every(item => item.trim() !== '')).toBe(true);
  });

  test('the range accepts only the allowed endings', () => {
    expect('10/2023 – 09/2027 (expected)').toMatch(range);
    expect('10/2026 – present').toMatch(range);
    expect('06/2021 – 03/2022').toMatch(range);
    expect('6/2021 – 03/2022').not.toMatch(range);
    expect('06/2021 - 03/2022').not.toMatch(range);
    expect('13/2021 – 03/2022').not.toMatch(range);
    expect('06/2021 – now').not.toMatch(range);
    expect('06/2021').not.toMatch(range);
  });
});
