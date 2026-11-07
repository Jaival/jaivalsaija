// How a post is labelled and dated, wherever it shows: the meta line, the
// blog rows, the OG image and the RSS feed. No server-only: client and server
// components both use it.
import type { PostSummary } from './types';

/** What a reader sees a post as: its `type`, or a release. */
export type PostKind = 'post' | 'update' | 'release';

const labels: Record<PostKind, string> = {
  post: 'Post',
  update: 'Update',
  release: 'Release',
};

/**
 * A release post is a series part that names a software release. A series'
 * guide tags its versions with `release` too, but it is in no series, so it
 * stays a post.
 */
export const postKind = ({
  type,
  release,
  series,
}: Pick<PostSummary, 'type' | 'release' | 'series'>): PostKind =>
  release && series ? 'release' : type;

/** 'update' -> 'Update'. The name readers see for a post's kind. */
export const kindLabel = (kind: PostKind) => labels[kind];

/**
 * A post date is a calendar day with no time zone, so it is read as UTC
 * midnight and must be formatted in UTC, or it shifts a day west of Greenwich.
 */
export const calendarDay = (date: string) => new Date(`${date}T00:00:00Z`);

/** '2026-10-22' -> '22 Oct 2026'. */
export const formatPostDate = (date: string) =>
  calendarDay(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
