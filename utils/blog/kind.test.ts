import { describe, expect, test } from 'bun:test';
import { calendarDay, formatPostDate, kindLabel } from './kind';

describe('post kind', () => {
  test('each type has its label', () => {
    expect(kindLabel('post')).toBe('Post');
    expect(kindLabel('update')).toBe('Update');
  });

  test('a date is the calendar day it names, in any time zone', () => {
    expect(formatPostDate('2026-10-22')).toBe('22 Oct 2026');
    expect(formatPostDate('2026-01-01')).toBe('1 Jan 2026');
    expect(calendarDay('2026-10-22').toUTCString()).toBe(
      'Thu, 22 Oct 2026 00:00:00 GMT',
    );
  });
});
