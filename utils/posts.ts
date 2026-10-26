import 'server-only';

import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { MDXContent } from 'mdx/types';
import { z } from 'zod';
import series, { type SeriesId } from '@/content/series';
import type {
  PostMetadata,
  PostSummary,
  PostVersionSummary,
} from '@/utils/interface';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const HISTORY_DIR = path.join(CONTENT_DIR, 'history');

// A typo in a post's `metadata` export fails the build here, with the file
// name, instead of shipping a page with a missing title or an invalid date.
const metadataSchema = z.object({
  title: z.string().min(1),
  date: z.iso.date(),
  time: z.iso.time({ precision: -1 }).optional(),
  updated: z.iso.date().optional(),
  changes: z.string().min(1).optional(),
  summary: z.string().min(1),
  type: z.enum(['post', 'update']),
  draft: z.boolean().optional(),
  // Only ids defined in content/series.ts, so a typo can't start a new series.
  series: z.enum(Object.keys(series) as [SeriesId, ...SeriesId[]]).optional(),
  release: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'release is a version like 0.3.0, without a v')
    .optional(),
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

/** A post from an imported MDX module; `file` is relative to content/. */
async function toPost(
  slug: string,
  file: string,
  mod: { metadata: unknown; default: MDXContent },
): Promise<Post> {
  const result = metadataSchema.safeParse(mod.metadata);
  if (!result.success) {
    throw new Error(
      `content/${file} has invalid metadata:\n${z.prettifyError(result.error)}`,
    );
  }
  const source = await readFile(path.join(CONTENT_DIR, file), 'utf8');
  return {
    slug,
    ...result.data,
    readingMinutes: readingMinutes(source),
    Content: mod.default,
  };
}

async function loadPost(slug: string): Promise<Post> {
  const mod = await import(`@/content/posts/${slug}.mdx`);
  return toPost(slug, `posts/${slug}.mdx`, mod);
}

// A post without a time sorts before a later one with a time on the same day.
const sortKey = (post: Post) => `${post.date}T${post.time ?? '00:00'}`;

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
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

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

async function loadPostVersion(slug: string, version: number): Promise<Post> {
  const mod = await import(`@/content/history/${slug}/v${version}.mdx`);
  return toPost(slug, `history/${slug}/v${version}.mdx`, mod);
}

/**
 * Every version of a post, oldest first, ending with the current one. An
 * older version is a frozen copy of the post as it was published, kept at
 * content/history/<slug>/v<n>.mdx; a post without that folder has one version.
 */
export async function getPostVersions(
  post: Post,
): Promise<PostVersionSummary[]> {
  const dir = path.join(HISTORY_DIR, post.slug);
  const files = existsSync(dir) ? await readdir(dir) : [];
  const numbers = files
    .map(file => /^v(\d+)\.mdx$/.exec(file)?.[1])
    .filter(number => number !== undefined)
    .map(Number)
    .sort((a, b) => a - b);

  // Like the metadata schema: a misnamed file or a missing date fails the
  // build instead of shipping a history with a hole in it.
  if (numbers.some((number, index) => number !== index + 1)) {
    throw new Error(
      `content/history/${post.slug} must hold v1.mdx to v${numbers.length}.mdx with no gaps`,
    );
  }
  if (numbers.length > 0 && !post.updated) {
    throw new Error(
      `content/posts/${post.slug}.mdx has older versions, so its metadata needs \`updated\``,
    );
  }

  // A series' guide links each tagged version to that release's post.
  const guideOf = (Object.keys(series) as SeriesId[]).find(
    id => series[id].guide === post.slug,
  );
  const notes = new Map<string, string>();
  if (guideOf) {
    for (const part of await getSeriesPosts(guideOf)) {
      if (part.release) {
        notes.set(part.release, `/blog/${part.slug}`);
      }
    }
  }
  const tagged = (release: string | undefined) => ({
    release,
    notesHref: release ? notes.get(release) : undefined,
  });

  const older = await Promise.all(
    numbers.map(async version => {
      const old = await loadPostVersion(post.slug, version);
      return {
        version,
        date: old.updated ?? old.date,
        changes: old.changes,
        href: `/blog/${post.slug}/v${version}`,
        ...tagged(old.release),
      };
    }),
  );

  return [
    ...older,
    {
      version: numbers.length + 1,
      date: post.updated ?? post.date,
      changes: post.changes,
      href: `/blog/${post.slug}`,
      ...tagged(post.release),
    },
  ];
}

/**
 * For a release post in a series with a guide: the guide's version tagged
 * with the same release. A release the guide never tagged fails the build,
 * so every release post can link to the setup it describes.
 */
export async function getGuideVersion(
  post: Post,
): Promise<{ title: string; version: PostVersionSummary } | undefined> {
  const slug = post.series && series[post.series].guide;
  if (!slug || !post.release) {
    return undefined;
  }
  const guide = await getPost(slug);
  if (!guide) {
    throw new Error(
      `content/series.ts names guide ${slug}, which isn't a post`,
    );
  }
  const version = (await getPostVersions(guide)).find(
    entry => entry.release === post.release,
  );
  if (!version) {
    throw new Error(
      `content/posts/${post.slug}.mdx is release ${post.release}, but no version of content/posts/${slug}.mdx has \`release: '${post.release}'\``,
    );
  }
  return { title: guide.title, version };
}

/** An older version of a visible post, or undefined if there isn't one. */
export async function getPostVersion(
  slug: string,
  version: number,
): Promise<Post | undefined> {
  if (!(await getPost(slug))) {
    return undefined;
  }
  try {
    return await loadPostVersion(slug, version);
  } catch (error) {
    if (error instanceof Error && error.message.includes('invalid metadata')) {
      throw error;
    }
    return undefined;
  }
}
