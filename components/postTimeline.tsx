import Link from 'next/link';
import type { Post } from '@/utils/posts';
import PostMeta from './postMeta';
import Reveal from './Reveal';

const readLink =
  'inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200 ease-out hover:text-brand-to';

// Updates are short, so the timeline shows them whole; posts get a title, a
// summary and a link. Both keep their own permalink.
function TimelineEntry({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;

  if (post.type === 'update') {
    const { Content } = post;
    return (
      <>
        <PostMeta {...post} />
        <div className='mt-1 [&>p:first-child]:mt-3 [&>*:last-child]:mb-3'>
          <Content />
        </div>
        <Link href={href} className={readLink}>
          Permalink
        </Link>
      </>
    );
  }

  return (
    <>
      <PostMeta {...post} />
      <h2 className='mt-3 text-2xl md:text-3xl font-bold tracking-tight text-balance'>
        <Link
          href={href}
          className='transition-colors duration-200 ease-out hover:text-primary'
        >
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

/** Entries on one rule down the left, a dot per entry. Below the fold. */
export default function PostTimeline({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className='text-muted-foreground'>Nothing here yet.</p>;
  }

  return (
    <ol className='border-l border-border'>
      {posts.map((post, index) => (
        <Reveal
          as='li'
          key={post.slug}
          index={Math.min(index, 3)}
          className='relative pl-6 md:pl-8 pb-12 last:pb-0'
        >
          <span
            aria-hidden
            className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full ring-4 ring-background ${
              post.type === 'update' ? 'bg-highlight' : 'bg-primary'
            }`}
          />
          <article>
            <TimelineEntry post={post} />
          </article>
        </Reveal>
      ))}
    </ol>
  );
}
