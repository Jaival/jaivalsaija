import 'server-only';

import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { MDXContent } from 'mdx/types';
import { z } from 'zod';
import series, { type SeriesId } from '@/content/series';
import type { PostMetadata, PostSummary } from '@/utils/interface';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

// A typo in a post's `metadata` export fails the build here, with the file
// name, instead of shipping a page with a missing title or an invalid date.
const metadataSchema = z.object({
  title: z.string().min(1),
  date: z.iso.date(),
  summary: z.string().min(1),
  type: z.enum(['post', 'update']),
  draft: z.boolean().optional(),
  // Only ids defined in content/series.ts, so a typo can't start a new series.
  series: z.enum(Object.keys(series) as [SeriesId, ...SeriesId[]]).optional(),
  // A missing cover file fails the build instead of shipping a broken image.
  cover: z
    .object({
      src: z.string().startsWith('/'),
      alt: z.string().min(1),
    })
    .refine(
      cover => existsSync(path.join(process.cwd(), 'public', cover.src)),
      { message: 'cover.src must point to a file in public/' },
    )
    .optional(),
}) satisfies z.ZodType<PostMetadata>;

export interface Post extends PostSummary {
  series?: SeriesId;
  Content: MDXContent;
}

// Drafts render in `next dev` so they can be previewed, and nowhere else.
const showDrafts = process.env.NODE_ENV !== 'production';

// Below the ~240 wpm average for prose: these posts are technical, and code
// blocks aren't counted at all, so readers spend longer per counted word.
const WORDS_PER_MINUTE = 200;

/**
 * Reading time from the MDX source. The metadata export and fenced code are
 * left out: code gets skimmed, not read word by word. Rounded up, so the
 * estimate never promises less time than the post takes.
 */
function readingMinutes(source: string) {
  const prose = source
    .replace(/^export const metadata = \{[\s\S]*?^\};?$/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, ' ');
  const words = prose.match(/[\p{L}\p{N}'’-]+/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

async function loadPost(slug: string): Promise<Post> {
  const mod = await import(`@/content/posts/${slug}.mdx`);
  const result = metadataSchema.safeParse(mod.metadata);
  if (!result.success) {
    throw new Error(
      `content/posts/${slug}.mdx has invalid metadata:\n${z.prettifyError(result.error)}`,
    );
  }
  const source = await readFile(path.join(POSTS_DIR, `${slug}.mdx`), 'utf8');
  return {
    slug,
    ...result.data,
    readingMinutes: readingMinutes(source),
    Content: mod.default,
  };
}

/** Every visible post, newest first. */
export async function getPosts(): Promise<Post[]> {
  const files = await readdir(POSTS_DIR);
  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(file => loadPost(file.slice(0, -'.mdx'.length))),
  );

  const visible = posts
    .filter(post => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Number each series oldest first. Done after the draft filter, so a hidden
  // draft never leaves a gap in the published parts.
  const counts = new Map<SeriesId, number>();
  for (const post of visible.toReversed()) {
    if (post.series) {
      post.seriesPart = (counts.get(post.series) ?? 0) + 1;
      counts.set(post.series, post.seriesPart);
    }
  }

  return visible;
}

/** The visible parts of one series, oldest first. */
export async function getSeriesPosts(id: SeriesId): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter(post => post.series === id).reverse();
}

/**
 * One visible post, or undefined if it doesn't exist or is a hidden draft.
 * Imports the file directly rather than listing the directory, so it works in
 * routes that render at request time, where content/ isn't on disk.
 */
export async function getPost(slug: string): Promise<Post | undefined> {
  let post: Post;
  try {
    post = await loadPost(slug);
  } catch (error) {
    if (error instanceof Error && error.message.includes('invalid metadata')) {
      throw error;
    }
    return undefined;
  }
  return showDrafts || !post.draft ? post : undefined;
}

/** One row of the feed: a standalone post, or a whole series as one card. */
export type FeedItem =
  | { kind: 'post'; post: Post }
  | { kind: 'series'; id: SeriesId; latest: Post; parts: number };

/**
 * The feed, newest first, with each series collapsed into one item placed at
 * its newest part. A series shows up once, however many parts it has.
 */
export async function getFeed(): Promise<FeedItem[]> {
  const posts = await getPosts();
  const seen = new Set<SeriesId>();
  const items: FeedItem[] = [];

  for (const post of posts) {
    if (!post.series) {
      items.push({ kind: 'post', post });
    } else if (!seen.has(post.series)) {
      seen.add(post.series);
      const parts = posts.filter(p => p.series === post.series).length;
      items.push({ kind: 'series', id: post.series, latest: post, parts });
    }
  }

  return items;
}
