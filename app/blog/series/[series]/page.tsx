import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import BackgroundElements from '@/components/backgroundElements';
import PostTimeline from '@/components/postTimeline';
import series, { type SeriesId } from '@/content/series';
import { getPosts, getSeriesPosts } from '@/utils/posts';
import { gradientText } from '@/utils/styles';

interface SeriesPageProps {
  params: Promise<{ series: string }>;
}

const isSeriesId = (id: string): id is SeriesId => Object.hasOwn(series, id);

// A page per series with at least one visible part; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  const used = new Set(posts.map(post => post.series).filter(Boolean));
  return [...used].map(id => ({ series: id as string }));
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { series: id } = await params;
  if (!isSeriesId(id)) {
    return {};
  }
  const { title, description } = series[id];
  return {
    title: `${title} - Jaival Saija`,
    description,
    alternates: { canonical: `/blog/series/${id}` },
  };
}

const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: id } = await params;
  if (!isSeriesId(id)) {
    notFound();
  }

  const { title, description, url } = series[id];
  const parts = await getSeriesPosts(id);

  // Above the fold: the CSS entrance, as on the post page.
  return (
    <div className='relative min-h-svh pb-24'>
      <BackgroundElements variant='minimal' />

      <div className='relative z-10 max-w-3xl mx-auto px-4 md:px-8 pt-12 md:pt-20'>
        <Link
          href='/blog'
          className='animate-enter inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-out hover:text-primary'
          style={step(0)}
        >
          <span aria-hidden>←</span> All posts
        </Link>

        <header className='mt-8 mb-12'>
          <p
            className='animate-enter text-sm font-medium text-primary'
            style={step(1)}
          >
            Series · {parts.length} {parts.length === 1 ? 'part' : 'parts'} so
            far
          </p>
          <h1
            className={`${gradientText.hero} animate-enter mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance`}
            style={step(1)}
          >
            {title}
          </h1>
          <p
            className='animate-enter mt-5 text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty'
            style={step(2)}
          >
            {description}
          </p>
          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='animate-enter mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200 ease-out hover:text-brand-to'
              style={step(2)}
            >
              The repo <span aria-hidden>↗</span>
            </a>
          )}
        </header>

        <PostTimeline posts={parts} />
      </div>
    </div>
  );
}
