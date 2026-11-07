import Link from 'next/link';
import type { CSSProperties } from 'react';
import { KindTag, TitleLine } from '@/components/pipeline';
import Reveal from '@/components/Reveal';
import type { Post } from '@/utils/blog';
import { formatPostDate, kindLabel, postKind } from '@/utils/blog/kind';
import { postPath } from '@/utils/blog/paths';

/** Rows painted at load get the CSS entrance; the rest reveal on scroll. */
const aboveFold = 2;

/** A muted mono link, like "all posts →" on home. */
export const mutedLink =
  'font-mono text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary';

function PostRow({ post, inSeries }: { post: Post; inSeries: boolean }) {
  const date = formatPostDate(post.date);

  return (
    <Link
      href={postPath(post.slug)}
      className='block py-4 [&_h3]:transition-colors [&_h3]:duration-200 [&_h3]:ease-out hover:[&_h3]:text-primary'
    >
      <TitleLine
        title={
          <>
            <KindTag>{kindLabel(postKind(post))}</KindTag>
            {post.draft && <KindTag>draft</KindTag>}
            {post.title}
          </>
        }
        // On a series page, the part number says where a post sits.
        dates={inSeries ? `part ${post.seriesPart} · ${date}` : date}
      />
      <p className='mt-1 text-muted-foreground leading-relaxed text-pretty'>
        {post.summary}
      </p>
    </Link>
  );
}

/**
 * Posts as rows: a kind tag before the title, the date at the right and the
 * summary under it. The first rows are above the fold and use the CSS
 * entrance from `firstStep` on; the rest get one `<Reveal>` each.
 */
export default function PostRows({
  posts,
  inSeries = false,
  firstStep,
}: {
  posts: Post[];
  inSeries?: boolean;
  firstStep: number;
}) {
  if (posts.length === 0) {
    return <p className='text-muted-foreground'>Nothing here yet.</p>;
  }

  const row = 'border-b border-dashed border-border last:border-0';
  return (
    <ul>
      {posts.map((post, i) =>
        i < aboveFold ? (
          // Painted before hydration; a Reveal here would ship at opacity 0.
          <li
            key={post.slug}
            className={`animate-enter ${row}`}
            style={{ '--stagger': firstStep + i } as CSSProperties}
          >
            <PostRow post={post} inSeries={inSeries} />
          </li>
        ) : (
          <Reveal as='li' key={post.slug} className={row}>
            <PostRow post={post} inSeries={inSeries} />
          </Reveal>
        ),
      )}
    </ul>
  );
}
