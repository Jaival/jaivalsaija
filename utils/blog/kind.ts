// How a post is labelled and dated, wherever it shows: the meta line, the
// timeline, the OG image and the RSS feed. No server-only: client and server
// components both use it.
import type { PostType } from './types';

const labels: Record<PostType, string> = { post: 'Post', update: 'Update' };

/** 'update' -> 'Update'. The name readers see for a post's type. */
export const kindLabel = (type: PostType) => labels[type];

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
