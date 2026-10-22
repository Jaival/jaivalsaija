import Link from 'next/link';
import { getPosts } from '@/utils/posts';
import PostCover from './postCover';
import PostMeta from './postMeta';
import Reveal from './Reveal';

const LIMIT = 3;

/** Home page "Recently": the newest blog entries, below the hero. */
export default async function RecentPosts() {
  const posts = (await getPosts()).slice(0, LIMIT);
  if (posts.length === 0) {
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
          {posts.map((post, index) => (
            <Reveal as='li' key={post.slug} index={index} className='h-full'>
              {/* Lift on hover is CSS on the card; Reveal owns the entrance. */}
              <Link
                href={`/blog/${post.slug}`}
                className='group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-[border-color,box-shadow,translate] duration-200 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl reduced-transparency:bg-card reduced-transparency:backdrop-blur-none'
              >
                {post.cover && (
                  <PostCover
                    cover={post.cover}
                    sizes='(max-width: 768px) 100vw, 330px'
                    className='mb-5 rounded-xl'
                  />
                )}
                <PostMeta {...post} />
                <h3 className='mt-4 text-xl font-bold tracking-tight text-balance transition-colors duration-200 ease-out group-hover:text-primary'>
                  {post.title}
                </h3>
                <p className='mt-2 text-muted-foreground leading-relaxed line-clamp-3'>
                  {post.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
