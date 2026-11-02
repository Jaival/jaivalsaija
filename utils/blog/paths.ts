// Every blog URL is built here, so a route move is a one-file change. No
// server-only: client and server components both link to posts.

export const blogPath = '/blog';
export const feedPath = '/blog/rss.xml';

export const postPath = (slug: string) => `${blogPath}/${slug}`;

export const seriesPath = (id: string) => `${blogPath}/series/${id}`;

/** The [version] route segment for an older version: 3 -> 'v3'. */
export const versionSegment = (version: number) => `v${version}`;

/** 'v3' -> 3. Undefined for anything versionSegment wouldn't produce. */
export function parseVersion(segment: string): number | undefined {
  const match = /^v([1-9]\d*)$/.exec(segment);
  return match ? Number(match[1]) : undefined;
}

export const versionPath = (slug: string, version: number) =>
  `${postPath(slug)}/${versionSegment(version)}`;
