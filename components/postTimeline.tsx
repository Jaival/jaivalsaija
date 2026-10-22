import Link from 'next/link';
import series, { type SeriesId } from '@/content/series';
import type { FeedItem, Post } from '@/utils/posts';
import PostCover from './postCover';
import PostMeta, { SeriesMeta } from './postMeta';
import Reveal from './Reveal';

const readLink =
  'inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200 ease-out hover:text-brand-to';

const titleLink = 'transition-colors duration-200 ease-out hover:text-primary';

type SeriesDisplay = 'link' | 'none';

// Every entry has a title that links to its own page. Updates are short, so
// the timeline shows their text in full under a smaller title; posts get a
// summary and a "Read" link instead.
function PostEntry({
  post,
  seriesDisplay,
}: {
  post: Post;
  seriesDisplay: SeriesDisplay;
}) {
  const href = `/blog/${post.slug}`;

  if (post.type === 'update') {
    const { Content } = post;
    return (
      <>
        <PostMeta {...post} seriesDisplay={seriesDisplay} />
        <h2 className='mt-3 text-xl md:text-2xl font-bold tracking-tight text-balance'>
          <Link href={href} className={titleLink}>
            {post.title}
          </Link>
        </h2>
        <div className='[&>p:first-child]:mt-2 [&>*:last-child]:mb-0'>
          <Content />
        </div>
      </>
    );
  }

  return (
    <>
      {post.cover && (
        // The title link below is the accessible one; this is a bigger
        // pointer target, so it is hidden from screen readers and tab order.
        <Link href={href} tabIndex={-1} aria-hidden className='block mb-5'>
          <PostCover
            cover={post.cover}
            sizes='(max-width: 768px) 100vw, 640px'
          />
        </Link>
      )}
      <PostMeta {...post} seriesDisplay={seriesDisplay} />
      <h2 className='mt-3 text-2xl md:text-3xl font-bold tracking-tight text-balance'>
        <Link href={href} className={titleLink}>
          {post.title}
        </Link>
      </h2>
      <p className='mt-3 text-base md:text-lg leading-relaxed text-muted-foreground text-pretty'>
        {post.summary}
      </p>
      <Link href={href} className={`${readLink} mt-4`}>
        Read <span aria-hidden>→</span>
      </Link>
    </>
  );
}

// A whole series as one entry: what it is, and a way into its newest part.
function SeriesEntry({
  id,
  latest,
  parts,
}: {
  id: SeriesId;
  latest: Post;
  parts: number;
}) {
  const href = `/blog/series/${id}`;
  const { title, description } = series[id];

  return (
    <>
      <SeriesMeta date={latest.date} parts={parts} />
      <h2 className='mt-3 text-2xl md:text-3xl font-bold tracking-tight text-balance'>
        <Link href={href} className={titleLink}>
          {title}
        </Link>
      </h2>
      <p className='mt-3 text-base md:text-lg leading-relaxed text-muted-foreground text-pretty'>
        {description}
      </p>
      <p className='mt-4 text-sm text-muted-foreground'>
        Latest:{' '}
        <Link
          href={`/blog/${latest.slug}`}
          className='font-medium text-foreground underline decoration-border underline-offset-4 transition-[color,text-decoration-color] duration-200 ease-out hover:text-primary hover:decoration-primary/40'
        >
          Part {latest.seriesPart}, {latest.title}
        </Link>
      </p>
      <Link href={href} className={`${readLink} mt-4`}>
        View series <span aria-hidden>→</span>
      </Link>
    </>
  );
}

const dotStyles = {
  post: 'bg-primary',
  update: 'bg-highlight',
  series: 'bg-brand-to',
};

/**
 * Entries on one rule down the left, a dot per entry. Below the fold. The
 * feed passes `items` (series collapsed into one card); a series page passes
 * its `posts`, where naming the series on every part would be redundant.
 */
export default function PostTimeline(
  props: { items: FeedItem[] } | { posts: Post[] },
) {
  const inSeries = 'posts' in props;
  const items: FeedItem[] = inSeries
    ? props.posts.map(post => ({ kind: 'post', post }))
    : props.items;

  if (items.length === 0) {
    return <p className='text-muted-foreground'>Nothing here yet.</p>;
  }

  return (
    <ol className='border-l border-border'>
      {items.map((item, index) => (
        <Reveal
          as='li'
          key={item.kind === 'post' ? item.post.slug : `series-${item.id}`}
          index={Math.min(index, 3)}
          className='relative pl-6 md:pl-8 pb-12 last:pb-0'
        >
          <span
            aria-hidden
            className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full ring-4 ring-background ${
              item.kind === 'series' || item.post.series
                ? dotStyles.series
                : dotStyles[item.post.type]
            }`}
          />
          <article>
            {item.kind === 'post' ? (
              <PostEntry
                post={item.post}
                seriesDisplay={inSeries ? 'none' : 'link'}
              />
            ) : (
              <SeriesEntry {...item} />
            )}
          </article>
        </Reveal>
      ))}
    </ol>
  );
}
