import 'server-only';

import { readdir } from 'node:fs/promises';
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
}) satisfies z.ZodType<PostMetadata>;

export interface Post extends PostSummary {
  series?: SeriesId;
  Content: MDXContent;
}

// Drafts render in `next dev` so they can be previewed, and nowhere else.
const showDrafts = process.env.NODE_ENV !== 'production';

async function loadPost(slug: string): Promise<Post> {
  const mod = await import(`@/content/posts/${slug}.mdx`);
  const result = metadataSchema.safeParse(mod.metadata);
  if (!result.success) {
    throw new Error(
      `content/posts/${slug}.mdx has invalid metadata:\n${z.prettifyError(result.error)}`,
    );
  }
  return { slug, ...result.data, Content: mod.default };
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
