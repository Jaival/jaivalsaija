import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import PostMeta from '@/components/postMeta';
import Reveal from '@/components/Reveal';
import { getPosts, type Post } from '@/utils/posts';

export const metadata: Metadata = {
  title: 'Blog - Jaival Saija',
  description:
    "What I'm building and learning: longer posts on DevOps and cloud work, and short updates in between.",
};

const readLink =
  'inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200 ease-out hover:text-brand-to';

// Updates are short, so the feed shows them whole; posts get a title, a
// summary and a link. Both keep their own permalink.
function FeedEntry({ post }: { post: Post }) {
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

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className='min-h-svh pb-24'>
      <PageHeader
        title='Blog'
        subtitle="What I'm building and learning. Longer write-ups, and short updates in between."
      />

      <div className='max-w-3xl mx-auto px-4 md:px-8 mt-12'>
        {posts.length === 0 ? (
          <p className='text-muted-foreground'>Nothing here yet.</p>
        ) : (
          // A timeline: one rule down the left, a dot per entry.
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
                  <FeedEntry post={post} />
                </article>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
