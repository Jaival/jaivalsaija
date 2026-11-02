// Blog types. The zod schema in utils/blog/index.ts validates PostMetadata at
// build time; keep the two in step. No server-only here: components import
// these types too.
export type PostType = 'post' | 'update';

export interface PostMetadata {
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Optional HH:mm, only to order posts that share a date. Not shown. */
  time?: string;
  /**
   * ISO date this version was written, when it replaced an earlier one. The
   * earlier versions live in content/history/<slug>/v<n>.mdx.
   */
  updated?: string;
  /** What this version changed, one line, shown in the version history. */
  changes?: string;
  summary: string;
  type: PostType;
  /** Shown in `next dev` only; left out of production builds. */
  draft?: boolean;
  /** Id of a series in content/series.ts. Parts are numbered by date. */
  series?: string;
  /**
   * A series part that gets its own card in the feed and the home list, for a
   * milestone. It stays a numbered part on the series page.
   */
  ownCard?: boolean;
  /**
   * The software release this version describes, like git tag `v0.3.0`
   * without the `v`. On a series' guide it tags a version; on a release post
   * in that series it names the release and links to the matching version.
   */
  release?: string;
  /** Optional cover; src is a path in public/, e.g. /blog/<slug>/cover.webp. */
  cover?: PostCover;
}

export interface PostCover {
  src: string;
  /** Describes the image for screen readers; required, never decorative. */
  alt: string;
}

export interface PostSummary extends PostMetadata {
  slug: string;
  /** 1-based position in its series, oldest first. */
  seriesPart?: number;
  /** Estimated minutes to read the body, rounded, at least 1. */
  readingMinutes: number;
}

/** One version of a post, for its version history. */
export interface PostVersionSummary {
  /** 1-based; the highest number is the current post. */
  version: number;
  /** The live post at /blog/<slug>; every other version is frozen. */
  isCurrent: boolean;
  /** ISO date the version was written: its `updated`, else its `date`. */
  date: string;
  changes?: string;
  /** /blog/<slug> for the current version, /blog/<slug>/v<n> for older ones. */
  href: string;
  release?: string;
  /** The release post for `release`, when the post is a series' guide. */
  notesHref?: string;
}

export interface Series {
  title: string;
  description: string;
  /** Where the work behind the series lives, e.g. its GitHub repo. */
  url?: string;
  /**
   * Slug of a standalone post that is the series' living guide. Its versions
   * carry `release` tags, and each release post links to its version.
   */
  guide?: string;
}
