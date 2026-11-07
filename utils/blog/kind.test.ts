import { describe, expect, test } from 'bun:test';
import { calendarDay, formatPostDate, kindLabel, postKind } from './kind';

describe('post kind', () => {
  test('each kind has its label', () => {
    expect(kindLabel('post')).toBe('Post');
    expect(kindLabel('update')).toBe('Update');
    expect(kindLabel('release')).toBe('Release');
  });

  test('a series part that names a release is a release', () => {
    expect(
      postKind({ type: 'post', release: '1.0.0', series: 'jobhunt-agent' }),
    ).toBe('release');
  });

  test('a guide with a release tag but no series stays a post', () => {
    expect(postKind({ type: 'post', release: '1.0.0' })).toBe('post');
  });

  test('anything else is its type', () => {
    expect(postKind({ type: 'update', series: 'kubernetes-lab' })).toBe(
      'update',
    );
    expect(postKind({ type: 'post' })).toBe('post');
  });

  test('a date is the calendar day it names, in any time zone', () => {
    expect(formatPostDate('2026-10-22')).toBe('22 Oct 2026');
    expect(formatPostDate('2026-01-01')).toBe('1 Jan 2026');
    expect(calendarDay('2026-10-22').toUTCString()).toBe(
      'Thu, 22 Oct 2026 00:00:00 GMT',
    );
  });
});
