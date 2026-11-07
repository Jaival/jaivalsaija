import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import {
  BareUrl,
  CommandLine,
  Rows,
  SectionLabel,
  type Row,
} from '@/components/pipeline';
import PostRows, { mutedLink } from '@/components/postRows';
import series, { type SeriesId } from '@/content/series';
import { getBlog } from '@/utils/blog';
import { blogPath, postPath, seriesPath } from '@/utils/blog/paths';

interface SeriesPageProps {
  params: Promise<{ series: string }>;
}

const isSeriesId = (id: string): id is SeriesId => Object.hasOwn(series, id);

// A page per series with at least one visible part; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { posts } = await getBlog();
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
    alternates: { canonical: seriesPath(id) },
  };
}

const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: id } = await params;
  if (!isSeriesId(id)) {
    notFound();
  }

  const { title, description, url, guide: guideSlug } = series[id];
  const blog = await getBlog();
  const parts = blog.series(id);
  const guide = guideSlug ? blog.post(guideSlug) : undefined;

  const rows: Row[] = [];
  if (url) {
    rows.push({
      label: 'repo',
      value: (
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className={mutedLink}
        >
          <BareUrl url={url} />
        </a>
      ),
    });
  }
  if (guide) {
    rows.push({
      label: 'start here',
      value: (
        <>
          <Link
            href={postPath(guide.slug)}
            className='font-medium underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary'
          >
            {guide.title}
          </Link>
          <span className='text-muted-foreground'>
            {' · '}the setup guide, kept current
          </span>
        </>
      ),
    });
  }

  // Above the fold: the CSS entrance, as on the post page.
  return (
    <section className='min-h-svh pt-10 md:pt-16 pb-20'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        <Link
          href={blogPath}
          className={`${mutedLink} animate-enter mb-6 inline-block`}
          style={step(0)}
        >
          <span aria-hidden>← </span>all posts
        </Link>

        <div className='animate-enter' style={step(1)}>
          <CommandLine className='mb-1'>$ ls ~/blog/series/{id}</CommandLine>
          <SectionLabel as='h1' className='lowercase'>
            {title}
          </SectionLabel>
        </div>

        <div className='animate-enter' style={step(2)}>
          <p className='text-lg md:text-xl text-foreground leading-relaxed text-pretty'>
            {description}
          </p>
          {rows.length > 0 && (
            <Rows labelWidth='8rem' rows={rows} className='mt-6' />
          )}
        </div>

        <section className='mt-12'>
          <div className='animate-enter' style={step(3)}>
            <SectionLabel count={parts.length} className='mb-1'>
              parts
            </SectionLabel>
          </div>
          {/* Newest part first, like the blog; parts keep their numbers. */}
          <PostRows posts={parts.toReversed()} inSeries firstStep={4} />
        </section>
      </div>
    </section>
  );
}
