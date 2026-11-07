import Link from 'next/link';
import { SectionLabel } from '@/components/pipeline';
import { mutedLink } from '@/components/postRows';
import series, { type SeriesId } from '@/content/series';
import type { Post } from '@/utils/blog';
import { postPath, seriesPath } from '@/utils/blog/paths';
import Reveal from './Reveal';

const partLink =
  'flex flex-col gap-1 py-3 [&>span:last-child]:transition-colors [&>span:last-child]:duration-200 [&>span:last-child]:ease-out hover:[&>span:last-child]:text-primary';

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
  const { title } = series[seriesId];

  return (
    <Reveal as='section' className='mt-16'>
      <nav aria-label={`${title} series`}>
        <SectionLabel count={parts.length} className='mb-2 lowercase'>
          {title}
        </SectionLabel>

        {(previous || next) && (
          <div className='grid gap-x-6 sm:grid-cols-2'>
            {previous ? (
              <Link href={postPath(previous.slug)} className={partLink}>
                <span className='font-mono text-sm text-muted-foreground'>
                  <span aria-hidden>← </span>part {index}
                </span>
                <span className='font-semibold text-foreground text-balance'>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div className='hidden sm:block' />
            )}
            {next && (
              <Link
                href={postPath(next.slug)}
                className={`${partLink} sm:text-right`}
              >
                <span className='font-mono text-sm text-muted-foreground'>
                  part {index + 2}
                  <span aria-hidden> →</span>
                </span>
                <span className='font-semibold text-foreground text-balance'>
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        )}

        <Link
          href={seriesPath(seriesId)}
          className={`${mutedLink} mt-3 inline-block`}
        >
          all {parts.length} {parts.length === 1 ? 'part' : 'parts'}{' '}
          <span aria-hidden>→</span>
        </Link>
      </nav>
    </Reveal>
  );
}
