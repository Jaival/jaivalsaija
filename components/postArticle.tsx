import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { CommitRail } from '@/components/backToTop';
import { CommandLine } from '@/components/pipeline';
import PostCover from '@/components/postCover';
import PostMeta from '@/components/postMeta';
import { mutedLink } from '@/components/postRows';
import type { Post } from '@/utils/blog';
import { blogPath } from '@/utils/blog/paths';

const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

/** The back-to-top rail returns focus here, so the title is read first. */
const TITLE_ID = 'post-title';

/**
 * A post's page: back link, header, cover and body. Shared by the current
 * version and the older ones, so an old version reads exactly as it did.
 * `versions` goes under the summary, `children` after the body. Long posts
 * get the back-to-top rail. `oldVersion` is the number of an older version
 * on screen; it only changes the decorative command line.
 */
export default function PostArticle({
  post,
  oldVersion,
  versions,
  children,
}: {
  post: Post;
  oldVersion?: number;
  versions?: ReactNode;
  children?: ReactNode;
}) {
  const { Content } = post;
  const file = `blog/${post.slug}.mdx`;

  // Above the fold: the CSS entrance, so the title is readable before JS.
  // The page lines up with the nav (max-w-4xl); text keeps a reading width.
  return (
    <article className='min-h-svh pt-10 md:pt-16 pb-24'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        <div className='max-w-3xl'>
          <Link
            href={blogPath}
            className={`${mutedLink} animate-enter mb-6 inline-block`}
            style={step(0)}
          >
            <span aria-hidden>← </span>all posts
          </Link>

          <header className='mb-10'>
            <div className='animate-enter' style={step(1)}>
              <CommandLine className='mb-3'>
                {oldVersion
                  ? `$ git show v${oldVersion}:${file}`
                  : `$ cat ~/${file}`}
              </CommandLine>
              <PostMeta {...post} />
              <h1
                id={TITLE_ID}
                tabIndex={-1}
                className='mt-3 outline-none text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-foreground text-balance'
              >
                {post.title}
              </h1>
            </div>
            {post.type === 'post' && (
              <p
                className='animate-enter mt-5 text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty'
                style={step(2)}
              >
                {post.summary}
              </p>
            )}
            {versions && (
              <div className='animate-enter mt-6' style={step(2)}>
                {versions}
              </div>
            )}
          </header>

          {post.cover && (
            <div className='animate-enter mb-10' style={step(3)}>
              <PostCover
                cover={post.cover}
                sizes='(max-width: 768px) 100vw, 768px'
                priority
              />
            </div>
          )}

          <div className='animate-enter' style={step(3)}>
            <Content />
          </div>

          {children}
        </div>
      </div>

      <CommitRail targetId={TITLE_ID} readingMinutes={post.readingMinutes} />
    </article>
  );
}
