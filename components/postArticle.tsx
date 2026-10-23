import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { CommitRail } from '@/components/backToTop';
import BackgroundElements from '@/components/backgroundElements';
import PostCover from '@/components/postCover';
import PostMeta from '@/components/postMeta';
import type { Post } from '@/utils/posts';
import { gradientText } from '@/utils/styles';

const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

/** The back-to-top rail returns focus here, so the title is read first. */
const TITLE_ID = 'post-title';

/**
 * A post's page: back link, header, cover and body. Shared by the current
 * version and the older ones, so an old version reads exactly as it did.
 * `versions` goes under the summary, `children` after the body. Long posts
 * get the back-to-top rail.
 */
export default function PostArticle({
  post,
  seriesPart,
  versions,
  children,
}: {
  post: Post;
  seriesPart?: number;
  versions?: ReactNode;
  children?: ReactNode;
}) {
  const { Content } = post;

  // Above the fold: the CSS entrance, so the title is readable before JS.
  return (
    <article className='relative min-h-svh pb-24'>
      <BackgroundElements variant='minimal' />

      <div className='relative z-10 max-w-3xl mx-auto px-4 md:px-8 pt-12 md:pt-20'>
        <Link
          href='/blog'
          className='animate-enter inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-out hover:text-primary'
          style={step(0)}
        >
          <span aria-hidden>←</span> All posts
        </Link>

        <header className='mt-8 mb-10'>
          <PostMeta
            {...post}
            seriesPart={seriesPart}
            seriesDisplay='link'
            className='animate-enter'
          />
          <h1
            id={TITLE_ID}
            tabIndex={-1}
            className={`${gradientText.hero} animate-enter mt-4 outline-none text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance`}
            style={step(1)}
          >
            {post.title}
          </h1>
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
              sizes='(max-width: 768px) 100vw, 704px'
              priority
            />
          </div>
        )}

        <div className='animate-enter' style={step(3)}>
          <Content />
        </div>

        {children}
      </div>

      <CommitRail targetId={TITLE_ID} readingMinutes={post.readingMinutes} />
    </article>
  );
}
