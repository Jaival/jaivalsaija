import { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { CommandLine, Rows, SectionLabel } from '@/components/pipeline';
import PostRows, { mutedLink } from '@/components/postRows';
import series from '@/content/series';
import { getBlog, type Post } from '@/utils/blog';
import { postKind } from '@/utils/blog/kind';
import { blogPath, feedPath, seriesPath } from '@/utils/blog/paths';

export const metadata: Metadata = {
  alternates: { canonical: blogPath },
  title: 'Blog - Jaival Saija',
  description:
    "What I'm building and learning: longer posts on DevOps and cloud work, and short updates in between.",
};

const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? '' : 's'}`;

/**
 * What a series holds, e.g. "setup guide + 4 releases · v0.3.0 → v1.0.0".
 * Parts are oldest first.
 */
function seriesContents(parts: Post[], hasGuide: boolean) {
  const releases = parts.flatMap(part =>
    postKind(part) === 'release' && part.release ? [part.release] : [],
  );
  const allReleases = releases.length === parts.length;
  const count = plural(parts.length, allReleases ? 'release' : 'post');
  const range =
    releases.length > 1
      ? ` · v${releases[0]} → v${releases.at(-1)}`
      : releases.length === 1
        ? ` · v${releases[0]}`
        : '';
  return `${hasGuide ? 'setup guide + ' : ''}${count}${range}`;
}

// /blog: every series as a row, then every post, newest first, as rows with
// a kind tag and the date at the right.
export default async function BlogPage() {
  const blog = await getBlog();
  const { posts } = blog;
  // Series in the order of their newest part, newest first.
  const seriesIds = [...new Set(posts.flatMap(post => post.series ?? []))];

  return (
    <section className='min-h-svh pt-10 md:pt-16 pb-20'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        {/* Above the fold: CSS entrance, visible before hydration. */}
        <div className='animate-enter' style={step(1)}>
          <CommandLine className='mb-1'>$ tail -f ~/blog</CommandLine>
          <SectionLabel as='h1'>blog</SectionLabel>
        </div>

        <div className='animate-enter' style={step(2)}>
          <p className='text-lg md:text-xl text-foreground leading-relaxed'>
            What I&apos;m building and learning. Longer write-ups, and short
            updates in between.
          </p>
          {/* A plain link, not a Next <Link>: the feed is XML, not a page. */}
          <a href={feedPath} className={`${mutedLink} mt-2 inline-block`}>
            follow with rss
          </a>
        </div>

        {seriesIds.length > 0 && (
          <section className='animate-enter mt-12' style={step(3)}>
            <SectionLabel count={seriesIds.length}>series</SectionLabel>
            <Rows
              labelWidth='10rem'
              rows={seriesIds.map(id => ({
                label: id,
                value: (
                  <>
                    <Link
                      href={seriesPath(id)}
                      className='font-medium underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary'
                    >
                      {series[id].title}
                    </Link>
                    <span className='text-muted-foreground'>
                      {' · '}
                      {seriesContents(
                        blog.series(id),
                        Boolean(series[id].guide),
                      )}
                    </span>
                  </>
                ),
              }))}
            />
          </section>
        )}

        <section className='mt-12'>
          <div className='animate-enter' style={step(4)}>
            <SectionLabel count={posts.length} className='mb-1'>
              all posts
            </SectionLabel>
          </div>
          <PostRows posts={posts} firstStep={5} />
        </section>
      </div>
    </section>
  );
}
