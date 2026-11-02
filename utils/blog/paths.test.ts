import { describe, expect, test } from 'bun:test';
import {
  parseVersion,
  postPath,
  seriesPath,
  versionPath,
  versionSegment,
} from './paths';

describe('blog paths', () => {
  test('build the routes under /blog', () => {
    expect(postPath('hello')).toBe('/blog/hello');
    expect(seriesPath('kubernetes-lab')).toBe('/blog/series/kubernetes-lab');
    expect(versionPath('hello', 3)).toBe('/blog/hello/v3');
  });

  test('a version segment parses back to its number', () => {
    for (const version of [1, 2, 10, 123]) {
      expect(parseVersion(versionSegment(version))).toBe(version);
    }
  });

  test('anything else is not a version', () => {
    for (const segment of ['3', 'v', 'v0', 'v01', 'v1.0', 'V1', 'v1x']) {
      expect(parseVersion(segment)).toBeUndefined();
    }
  });
});
