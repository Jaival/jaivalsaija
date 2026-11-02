import 'server-only';

import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { MDXContent } from 'mdx/types';

/** One MDX file, before its metadata is validated. */
export interface PostFile {
  slug: string;
  /** Relative to content/, for error messages. */
  file: string;
  metadata: unknown;
  /** The raw MDX, for the reading time. */
  source: string;
  Content: MDXContent;
}

/**
 * Where posts come from. The blog module only sees this interface, so tests
 * can hand it posts from memory instead of content/.
 */
export interface BlogReader {
  /** Every content/posts/*.mdx. */
  posts(): Promise<PostFile[]>;
  /**
   * The frozen older versions of a post, content/history/<slug>/v<n>.mdx,
   * keyed by n. Empty when the post has no history folder.
   */
  history(slug: string): Promise<Map<number, PostFile>>;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

async function readPost(
  slug: string,
  file: string,
  mod: { metadata: unknown; default: MDXContent },
): Promise<PostFile> {
  const source = await readFile(path.join(CONTENT_DIR, file), 'utf8');
  return { slug, file, metadata: mod.metadata, source, Content: mod.default };
}

/** Reads content/ from disk and imports each file as an MDX module. */
export const fsReader: BlogReader = {
  async posts() {
    const files = await readdir(path.join(CONTENT_DIR, 'posts'));
    return Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const slug = file.slice(0, -'.mdx'.length);
          const mod = await import(`@/content/posts/${slug}.mdx`);
          return readPost(slug, `posts/${file}`, mod);
        }),
    );
  },

  async history(slug) {
    const dir = path.join(CONTENT_DIR, 'history', slug);
    const files = existsSync(dir) ? await readdir(dir) : [];
    const entries = await Promise.all(
      files.flatMap(file => {
        const match = /^v(\d+)\.mdx$/.exec(file);
        if (!match) {
          return [];
        }
        const version = Number(match[1]);
        return [
          import(`@/content/history/${slug}/v${version}.mdx`).then(
            async mod =>
              [
                version,
                await readPost(slug, `history/${slug}/${file}`, mod),
              ] as const,
          ),
        ];
      }),
    );
    return new Map(entries);
  },
};
