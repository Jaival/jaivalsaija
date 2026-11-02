import { describe, expect, test } from 'bun:test';
import { loadBlog } from './index';
import type { BlogReader, PostFile } from './reader';
import type { PostMetadata } from './types';

// Series ids come from content/series.ts: 'kubernetes-lab' has no guide,
// 'jobhunt-agent' has the guide 'jobhunt-agent-setup'.

type Meta = Partial<PostMetadata>;

const file = (slug: string, meta: Meta, words = 10): PostFile => ({
  slug,
  file: `posts/${slug}.mdx`,
  metadata: {
    title: slug,
    date: '2026-01-01',
    summary: `About ${slug}`,
    type: 'post',
    ...meta,
  },
  source: 'word '.repeat(words),
  Content: () => null,
});

/** Posts from memory: `history` maps a slug to its older versions by n. */
function memoryReader(
  posts: PostFile[],
  history: Record<string, Record<number, Meta>> = {},
): BlogReader {
  return {
    posts: async () => posts,
    history: async slug =>
      new Map(
        Object.entries(history[slug] ?? {}).map(([n, meta]) => [
          Number(n),
          { ...file(slug, meta), file: `history/${slug}/v${n}.mdx` },
        ]),
      ),
  };
}

const load = (
  posts: PostFile[],
  history?: Record<string, Record<number, Meta>>,
  showDrafts = false,
) => loadBlog(memoryReader(posts, history), { showDrafts });

const slugs = (posts: { slug: string }[]) => posts.map(post => post.slug);

describe('posts', () => {
  test('newest first; a time orders posts on the same day', async () => {
    const blog = await load([
      file('old', { date: '2026-01-01' }),
      file('morning', { date: '2026-02-01', time: '09:00' }),
      file('no-time', { date: '2026-02-01' }),
      file('evening', { date: '2026-02-01', time: '18:30' }),
    ]);
    expect(slugs(blog.posts)).toEqual(['evening', 'morning', 'no-time', 'old']);
  });

  test('drafts are hidden unless asked for', async () => {
    const posts = [file('live', {}), file('wip', { draft: true })];
    const hidden = await load(posts);
    expect(slugs(hidden.posts)).toEqual(['live']);
    expect(hidden.post('wip')).toBeUndefined();

    const shown = await load(posts, {}, true);
    expect(shown.post('wip')?.draft).toBe(true);
  });

  test('invalid metadata fails with the file name', async () => {
    await expect(load([file('bad', { date: 'yesterday' })])).rejects.toThrow(
      'content/posts/bad.mdx has invalid metadata',
    );
  });

  test('reading time is words / 200, rounded up, at least 1', async () => {
    const blog = await load([file('short', {}, 5), file('long', {}, 401)]);
    expect(blog.post('short')?.readingMinutes).toBe(1);
    expect(blog.post('long')?.readingMinutes).toBe(3);
  });
});

describe('series', () => {
  const lab = (slug: string, date: string, meta: Meta = {}) =>
    file(slug, { series: 'kubernetes-lab', date, ...meta });

  test('parts are numbered oldest first, skipping hidden drafts', async () => {
    const blog = await load([
      lab('three', '2026-03-01'),
      lab('one', '2026-01-01'),
      lab('draft', '2026-01-15', { draft: true }),
      lab('two', '2026-02-01'),
    ]);
    expect(slugs(blog.series('kubernetes-lab'))).toEqual([
      'one',
      'two',
      'three',
    ]);
    expect(blog.post('three')?.seriesPart).toBe(3);
  });

  test('the feed folds a series into one card at its newest part', async () => {
    const blog = await load([
      file('solo', { date: '2026-02-15' }),
      lab('one', '2026-01-01'),
      lab('two', '2026-03-01'),
      lab('big', '2026-04-01', { ownCard: true }),
    ]);
    expect(
      blog.feed.map(item =>
        item.kind === 'post'
          ? item.post.slug
          : `${item.id}: ${item.latest.slug} of ${item.parts}`,
      ),
    ).toEqual(['big', 'kubernetes-lab: big of 3', 'solo']);
  });
});

describe('versions', () => {
  test('older versions come first; only the last is current', async () => {
    const blog = await load([file('guide', { updated: '2026-03-01' })], {
      guide: {
        1: { date: '2026-01-01', changes: 'First' },
        2: { date: '2026-01-01', updated: '2026-02-01', changes: 'Second' },
      },
    });
    const versions = blog.versions(blog.post('guide')!);
    expect(versions.map(v => [v.version, v.isCurrent, v.date, v.href])).toEqual(
      [
        [1, false, '2026-01-01', '/blog/guide/v1'],
        [2, false, '2026-02-01', '/blog/guide/v2'],
        [3, true, '2026-03-01', '/blog/guide'],
      ],
    );
    expect(blog.version('guide', 2)?.changes).toBe('Second');
    expect(blog.version('guide', 3)).toBeUndefined();
  });

  test('a post without history has one current version', async () => {
    const blog = await load([file('plain', {})]);
    const versions = blog.versions(blog.post('plain')!);
    expect(versions.map(v => v.isCurrent)).toEqual([true]);
  });

  test('a gap in the history fails', async () => {
    const posts = [file('guide', { updated: '2026-03-01' })];
    await expect(load(posts, { guide: { 1: {}, 3: {} } })).rejects.toThrow(
      'must hold v1.mdx to v2.mdx with no gaps',
    );
  });

  test('a post with history needs `updated`', async () => {
    await expect(
      load([file('guide', {})], { guide: { 1: {} } }),
    ).rejects.toThrow('its metadata needs `updated`');
  });
});

describe('guide and release posts', () => {
  const guide = file('jobhunt-agent-setup', {
    updated: '2026-03-01',
    release: '0.2.0',
  });
  const history = { 'jobhunt-agent-setup': { 1: { release: '0.1.0' } } };
  const release = (slug: string, version: string) =>
    file(slug, {
      series: 'jobhunt-agent',
      type: 'update',
      release: version,
      date: '2026-02-01',
    });

  test('each tagged guide version links to its release post', async () => {
    const blog = await load(
      [guide, release('r1', '0.1.0'), release('r2', '0.2.0')],
      history,
    );
    const versions = blog.versions(blog.post('jobhunt-agent-setup')!);
    expect(versions.map(v => [v.release, v.notesHref])).toEqual([
      ['0.1.0', '/blog/r1'],
      ['0.2.0', '/blog/r2'],
    ]);
    expect(blog.guideFor(blog.post('r1')!)).toEqual({
      title: 'jobhunt-agent-setup',
      version: versions[0],
    });
  });

  test('a release the guide never tagged fails', async () => {
    await expect(
      load([guide, release('r9', '0.9.0')], history),
    ).rejects.toThrow('is release 0.9.0, but no version');
  });

  test('a series guide that is not a post fails', async () => {
    await expect(load([release('r1', '0.1.0')])).rejects.toThrow(
      "names guide jobhunt-agent-setup, which isn't a post",
    );
  });
});
