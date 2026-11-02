import 'server-only';

import { existsSync } from 'node:fs';
import path from 'node:path';
import type { MDXContent } from 'mdx/types';
import { cache } from 'react';
import { z } from 'zod';
import seriesConfig, { type SeriesId } from '@/content/series';
import { postPath, versionPath } from './paths';
import { fsReader, type BlogReader, type PostFile } from './reader';
import type { PostMetadata, PostSummary, PostVersionSummary } from './types';

export type * from './types';

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
  series: z
    .enum(Object.keys(seriesConfig) as [SeriesId, ...SeriesId[]])
    .optional(),
  ownCard: z.boolean().optional(),
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

/** One row of the feed: a standalone post, or a whole series as one card. */
export type FeedItem =
  | { kind: 'post'; post: Post }
  | { kind: 'series'; id: SeriesId; latest: Post; parts: number };

export interface Blog {
  /** Every visible post, newest first. */
  posts: Post[];
  /** One visible post, or undefined if it doesn't exist or is a hidden draft. */
  post(slug: string): Post | undefined;
  /** The visible parts of one series, oldest first. */
  series(id: SeriesId): Post[];
  /**
   * The feed, newest first, with each series collapsed into one item placed
   * at its newest part. A part with `ownCard: true` also gets a card of its
   * own, and the series card moves down to the newest part without one.
   */
  feed: FeedItem[];
  /** Every version of a post, oldest first, ending with the current one. */
  versions(post: Post): PostVersionSummary[];
  /** An older, frozen version of a visible post, or undefined. */
  version(slug: string, version: number): Post | undefined;
  /**
   * For a release post in a series with a guide: the guide's version tagged
   * with the same release.
   */
  guideFor(
    post: Post,
  ): { title: string; version: PostVersionSummary } | undefined;
}

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

function toPost(file: PostFile): Post {
  const result = metadataSchema.safeParse(file.metadata);
  if (!result.success) {
    throw new Error(
      `content/${file.file} has invalid metadata:\n${z.prettifyError(result.error)}`,
    );
  }
  return {
    slug: file.slug,
    ...result.data,
    readingMinutes: readingMinutes(file.source),
    Content: file.Content,
  };
}

// A post without a time sorts before a later one with a time on the same day.
const sortKey = (post: Post) => `${post.date}T${post.time ?? '00:00'}`;

/**
 * Reads and checks every post once. Anything wrong in content/ (bad
 * metadata, a gap in a history, a release the guide never tagged) throws
 * here, so the build fails instead of shipping a broken page.
 */
export async function loadBlog(
  reader: BlogReader,
  { showDrafts }: { showDrafts: boolean },
): Promise<Blog> {
  const posts = (await reader.posts())
    .map(toPost)
    .filter(post => showDrafts || !post.draft)
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  const bySlug = new Map(posts.map(post => [post.slug, post]));

  // Number each series oldest first. Done after the draft filter, so a hidden
  // draft never leaves a gap in the published parts.
  const parts = new Map<SeriesId, Post[]>();
  for (const post of posts.toReversed()) {
    if (post.series) {
      const list = parts.get(post.series) ?? [];
      list.push(post);
      post.seriesPart = list.length;
      parts.set(post.series, list);
    }
  }

  const feed: FeedItem[] = [];
  const seen = new Set<SeriesId>();
  for (const post of posts) {
    if (!post.series || post.ownCard) {
      feed.push({ kind: 'post', post });
    } else if (!seen.has(post.series)) {
      seen.add(post.series);
      const all = parts.get(post.series)!;
      // The card sits at its newest folded part, but "Latest" names the
      // newest part overall, even one that has its own card above it.
      feed.push({
        kind: 'series',
        id: post.series,
        latest: all.at(-1)!,
        parts: all.length,
      });
    }
  }

  // A series' guide links each tagged version to that release's post.
  const notes = new Map<string, Map<string, string>>();
  for (const [id, list] of parts) {
    const guide = seriesConfig[id].guide;
    if (!guide) {
      continue;
    }
    if (!bySlug.has(guide)) {
      throw new Error(
        `content/series.ts names guide ${guide}, which isn't a post`,
      );
    }
    notes.set(
      guide,
      new Map(
        list.flatMap(part =>
          part.release ? [[part.release, postPath(part.slug)] as const] : [],
        ),
      ),
    );
  }

  // Older versions are frozen copies of a post as it was published.
  const versions = new Map<string, PostVersionSummary[]>();
  const oldPosts = new Map<string, Map<number, Post>>();
  for (const post of posts) {
    const history = await reader.history(post.slug);
    const numbers = [...history.keys()].sort((a, b) => a - b);
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

    const old = new Map(
      numbers.map(number => {
        // Same post, same place in its series; only the text is older.
        const oldPost = toPost(history.get(number)!);
        oldPost.seriesPart = post.seriesPart;
        return [number, oldPost] as const;
      }),
    );
    oldPosts.set(post.slug, old);

    const releaseNotes = notes.get(post.slug);
    const entry = (version: number, from: Post, isCurrent: boolean) => ({
      version,
      isCurrent,
      date: from.updated ?? from.date,
      changes: from.changes,
      href: isCurrent ? postPath(post.slug) : versionPath(post.slug, version),
      release: from.release,
      notesHref: from.release ? releaseNotes?.get(from.release) : undefined,
    });
    versions.set(post.slug, [
      ...numbers.map(number => entry(number, old.get(number)!, false)),
      entry(numbers.length + 1, post, true),
    ]);
  }

  // Every release post must link to the setup it describes, so a release the
  // guide never tagged fails the build.
  const guides = new Map<
    string,
    { title: string; version: PostVersionSummary }
  >();
  for (const post of posts) {
    const guide = post.series && seriesConfig[post.series].guide;
    if (!guide || !post.release) {
      continue;
    }
    const version = versions
      .get(guide)!
      .find(entry => entry.release === post.release);
    if (!version) {
      throw new Error(
        `content/posts/${post.slug}.mdx is release ${post.release}, but no version of content/posts/${guide}.mdx has \`release: '${post.release}'\``,
      );
    }
    guides.set(post.slug, { title: bySlug.get(guide)!.title, version });
  }

  return {
    posts,
    feed,
    post: slug => bySlug.get(slug),
    series: id => parts.get(id) ?? [],
    versions: post => versions.get(post.slug) ?? [],
    version: (slug, version) => oldPosts.get(slug)?.get(version),
    guideFor: post => guides.get(post.slug),
  };
}

/**
 * The blog, read from content/ once per render pass. Drafts show in
 * `next dev` so they can be previewed, and nowhere else.
 */
export const getBlog = cache(() =>
  loadBlog(fsReader, { showDrafts: process.env.NODE_ENV !== 'production' }),
);
