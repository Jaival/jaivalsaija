import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import BackgroundElements from '@/components/backgroundElements';
import PostCover from '@/components/postCover';
import PostMeta from '@/components/postMeta';
import SeriesNav from '@/components/seriesNav';
import { gradientText } from '@/utils/styles';
import { getPost, getPosts, getSeriesPosts } from '@/utils/posts';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Every post is prerendered; an unknown slug is a 404, not a render attempt.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Jaival Saija`,
    description: post.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: ['Jaival Saija'],
    },
  };
}

const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  const { Content } = post;
  const parts = post.series ? await getSeriesPosts(post.series) : [];
  const partIndex = parts.findIndex(part => part.slug === slug);

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
            seriesPart={partIndex >= 0 ? partIndex + 1 : undefined}
            linkSeries
            className='animate-enter'
          />
          <h1
            className={`${gradientText.hero} animate-enter mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance`}
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

        {post.series && partIndex >= 0 && (
          <SeriesNav seriesId={post.series} parts={parts} index={partIndex} />
        )}
      </div>
    </article>
  );
}
