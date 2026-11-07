import Link from 'next/link';
import { KindTag, SectionLabel } from '@/components/pipeline';
import { getBlog } from '@/utils/blog';
import { formatPostDate, kindLabel, postKind } from '@/utils/blog/kind';
import { blogPath, postPath } from '@/utils/blog/paths';
import Reveal from './Reveal';

const SHOWN = 4;

/**
 * Home "git log": the newest feed entries as log lines, the date first, then
 * a kind tag and the title. A series counts once, as its newest part,
 * so one busy series can't fill the list.
 */
export default async function RecentPosts() {
  const { feed } = await getBlog();
  // A part with its own card can also be its series' newest part; show it once.
  const posts = [
    ...new Map(
      feed
        .map(item => (item.kind === 'post' ? item.post : item.latest))
        .map(post => [post.slug, post]),
    ).values(),
  ].slice(0, SHOWN);
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className='mt-12'>
      <SectionLabel>git log</SectionLabel>
      <ul>
        {posts.map(post => (
          <Reveal
            as='li'
            key={post.slug}
            className='border-b border-dashed border-border last:border-0'
          >
            <Link
              href={postPath(post.slug)}
              className='flex flex-col gap-x-4 py-3 sm:flex-row sm:items-baseline [&_h3]:transition-colors [&_h3]:duration-200 [&_h3]:ease-out hover:[&_h3]:text-primary'
            >
              <time
                dateTime={post.date}
                className='shrink-0 font-mono text-sm text-muted-foreground sm:w-28'
              >
                {formatPostDate(post.date)}
              </time>
              <h3 className='text-foreground'>
                <KindTag>{kindLabel(postKind(post))}</KindTag>
                {post.title}
              </h3>
            </Link>
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <Link
          href={blogPath}
          className='mt-3 inline-block font-mono text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary'
        >
          all posts <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
