import Link from 'next/link';
import series from '@/content/series';
import { getFeed, type FeedItem } from '@/utils/posts';
import PostCover from './postCover';
import PostMeta, { SeriesMeta } from './postMeta';
import Reveal from './Reveal';

const LIMIT = 3;

const card =
  'group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-[border-color,box-shadow,translate] duration-200 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl reduced-transparency:bg-card reduced-transparency:backdrop-blur-none';

const cardTitle =
  'mt-4 text-xl font-bold tracking-tight text-balance transition-colors duration-200 ease-out group-hover:text-primary';

const cardText = 'mt-2 text-muted-foreground leading-relaxed line-clamp-3';

// The whole card is one link: to the post, or for a series, its page.
function RecentCard({ item }: { item: FeedItem }) {
  if (item.kind === 'series') {
    const { title, description } = series[item.id];
    return (
      <Link href={`/blog/series/${item.id}`} className={card}>
        <SeriesMeta date={item.latest.date} parts={item.parts} />
        <h3 className={cardTitle}>{title}</h3>
        <p className={cardText}>{description}</p>
      </Link>
    );
  }

  const { post } = item;
  return (
    <Link href={`/blog/${post.slug}`} className={card}>
      {post.cover && (
        <PostCover
          cover={post.cover}
          sizes='(max-width: 768px) 100vw, 330px'
          className='mb-5 rounded-xl'
        />
      )}
      <PostMeta {...post} />
      <h3 className={cardTitle}>{post.title}</h3>
      <p className={cardText}>{post.summary}</p>
    </Link>
  );
}

/** Home page "Recently": the newest feed entries, below the hero. */
export default async function RecentPosts() {
  const items = (await getFeed()).slice(0, LIMIT);
  if (items.length === 0) {
    return null;
  }

  return (
    // Same container as the hero, so the heading lines up with the text above.
    <section aria-labelledby='recently-heading' className='px-4 pb-24'>
      <div className='container mx-auto max-w-6xl'>
        <Reveal className='flex items-baseline justify-between gap-4 mb-8'>
          <h2
            id='recently-heading'
            className='text-3xl md:text-4xl font-bold tracking-tight'
          >
            Recently
          </h2>
          <Link
            href='/blog'
            className='text-sm font-medium text-primary transition-colors duration-200 ease-out hover:text-brand-to'
          >
            All posts <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <ul className='grid gap-4 md:grid-cols-3'>
          {items.map((item, index) => (
            <Reveal
              as='li'
              key={item.kind === 'post' ? item.post.slug : `series-${item.id}`}
              index={index}
              className='h-full'
            >
              {/* Lift on hover is CSS on the card; Reveal owns the entrance. */}
              <RecentCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
