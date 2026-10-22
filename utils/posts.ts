import 'server-only';

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import type { MDXContent } from 'mdx/types';
import { z } from 'zod';
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
}) satisfies z.ZodType<PostMetadata>;

export interface Post extends PostSummary {
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

  return posts
    .filter(post => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
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
