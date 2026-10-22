import Link from 'next/link';
import series, { type SeriesId } from '@/content/series';
import type { Post } from '@/utils/posts';
import Reveal from './Reveal';

const card =
  'group flex flex-col gap-1 rounded-2xl border border-border bg-card/50 p-5 transition-[border-color,background-color] duration-200 ease-out hover:border-primary/40 hover:bg-card/70';

/** Previous / next part at the end of a post in a series. */
export default function SeriesNav({
  seriesId,
  parts,
  index,
}: {
  seriesId: SeriesId;
  parts: Post[];
  index: number;
}) {
  const previous = parts[index - 1];
  const next = parts[index + 1];

  return (
    <Reveal as='section' className='mt-16'>
      <nav aria-label={`${series[seriesId].title} series`}>
        <div className='flex items-baseline justify-between gap-4 mb-4'>
          <h2 className='text-lg font-bold tracking-tight'>
            {series[seriesId].title}
          </h2>
          <Link
            href={`/blog/series/${seriesId}`}
            className='text-sm font-medium text-primary transition-colors duration-200 ease-out hover:text-brand-to'
          >
            All {parts.length} {parts.length === 1 ? 'part' : 'parts'}{' '}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {(previous || next) && (
          <div className='grid gap-4 sm:grid-cols-2'>
            {previous ? (
              <Link href={`/blog/${previous.slug}`} className={card}>
                <span className='text-xs font-medium text-muted-foreground'>
                  <span aria-hidden>←</span> Part {index}
                </span>
                <span className='font-semibold text-balance transition-colors duration-200 ease-out group-hover:text-primary'>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div className='hidden sm:block' />
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className={`${card} sm:text-right`}
              >
                <span className='text-xs font-medium text-muted-foreground'>
                  Part {index + 2} <span aria-hidden>→</span>
                </span>
                <span className='font-semibold text-balance transition-colors duration-200 ease-out group-hover:text-primary'>
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        )}
      </nav>
    </Reveal>
  );
}
