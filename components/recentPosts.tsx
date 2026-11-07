import Link from 'next/link';
import { KindTag, SectionLabel, TitleLine } from '@/components/pipeline';
import { getBlog } from '@/utils/blog';
import { kindLabel, formatPostDate } from '@/utils/blog/kind';
import { blogPath, postPath } from '@/utils/blog/paths';
import Reveal from './Reveal';

const SHOWN = 3;

/**
 * Home "recent posts": the newest feed entries as rows, a kind tag before the
 * title and the date at the right. A series counts once, as its newest part,
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
      <SectionLabel>recent posts</SectionLabel>
      <ul>
        {posts.map(post => (
          <Reveal
            as='li'
            key={post.slug}
            className='border-b border-dashed border-border last:border-0'
          >
            <Link
              href={postPath(post.slug)}
              className='block py-3 [&_h3]:transition-colors [&_h3]:duration-200 [&_h3]:ease-out hover:[&_h3]:text-primary'
            >
              <TitleLine
                title={
                  <>
                    <KindTag>{kindLabel(post.type)}</KindTag>
                    {post.title}
                  </>
                }
                dates={formatPostDate(post.date)}
              />
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
