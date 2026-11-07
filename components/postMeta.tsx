import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { KindTag } from '@/components/pipeline';
import series, { type SeriesId } from '@/content/series';
import { seriesPath } from '@/utils/blog/paths';
import { formatPostDate, kindLabel, postKind } from '@/utils/blog/kind';
import type { PostSummary } from '@/utils/blog/types';

function PostDate({ date }: { date: string }) {
  return <time dateTime={date}>{formatPostDate(date)}</time>;
}

type PostMetaProps = Pick<
  PostSummary,
  | 'date'
  | 'updated'
  | 'type'
  | 'release'
  | 'draft'
  | 'seriesPart'
  | 'readingMinutes'
> & {
  series?: SeriesId;
  className?: string;
};

/**
 * The mono line above a post's title: kind tag, then date, update date,
 * reading time and series part, `·` separated.
 */
export default function PostMeta({
  date,
  updated,
  type,
  release,
  draft,
  series: seriesId,
  seriesPart,
  readingMinutes,
  className = '',
}: PostMetaProps) {
  const facts: { key: string; node: ReactNode }[] = [
    { key: 'date', node: <PostDate date={date} /> },
  ];
  if (updated) {
    facts.push({
      key: 'updated',
      node: (
        <>
          updated <PostDate date={updated} />
        </>
      ),
    });
  }
  // Updates are a paragraph or two; a read time there is noise.
  if (type === 'post') {
    facts.push({ key: 'read', node: `${readingMinutes} min read` });
  }
  if (seriesId) {
    facts.push({
      key: 'series',
      node: (
        <>
          {seriesPart && `part ${seriesPart} of `}
          <Link
            href={seriesPath(seriesId)}
            className='underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary'
          >
            {series[seriesId].title}
          </Link>
        </>
      ),
    });
  }

  return (
    <p
      className={`flex flex-wrap items-center gap-y-1 font-mono text-sm text-muted-foreground ${className}`}
    >
      <KindTag>
        {kindLabel(postKind({ type, release, series: seriesId }))}
      </KindTag>
      {draft && (
        <span className='mr-2 inline-block rounded-sm border border-dashed border-warning px-1.5 leading-6 text-warning'>
          draft
        </span>
      )}
      {facts.map(({ key, node }, i) => (
        <Fragment key={key}>
          {i > 0 && (
            <span aria-hidden className='px-2'>
              ·
            </span>
          )}
          <span>{node}</span>
        </Fragment>
      ))}
    </p>
  );
}
