import Link from 'next/link';
import series, { type SeriesId } from '@/content/series';
import type { PostSummary } from '@/utils/interface';
import { formatPostDate } from '@/utils/utils';

type PostMetaProps = Pick<
  PostSummary,
  'date' | 'type' | 'draft' | 'seriesPart' | 'readingMinutes'
> & {
  series?: SeriesId;
  /** Link the series name to its page. Off inside cards that are a link. */
  linkSeries?: boolean;
  className?: string;
};

/**
 * Date, type, reading time, series and draft flag: the line above every
 * entry's title or body. Plain text unless `linkSeries` is set, so it can sit
 * inside a card that is itself a link.
 */
export default function PostMeta({
  date,
  type,
  draft,
  series: seriesId,
  seriesPart,
  readingMinutes,
  linkSeries = false,
  className = '',
}: PostMetaProps) {
  const seriesLabel = seriesId && (
    <>
      {series[seriesId].title}
      {seriesPart && ` · Part ${seriesPart}`}
    </>
  );

  return (
    <div
      className={`flex flex-wrap items-center gap-3 text-sm text-muted-foreground ${className}`}
    >
      <time dateTime={date} className='font-mono'>
        {formatPostDate(date)}
      </time>
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
          type === 'update'
            ? 'bg-highlight/20 text-highlight-foreground dark:text-highlight'
            : 'bg-primary/10 text-primary'
        }`}
      >
        {type === 'update' ? 'Update' : 'Post'}
      </span>
      {/* Updates are a paragraph or two; a read time there is noise. */}
      {type === 'post' && (
        <span className='text-xs font-medium'>{readingMinutes} min read</span>
      )}
      {seriesId &&
        (linkSeries ? (
          <Link
            href={`/blog/series/${seriesId}`}
            className='text-xs font-medium underline decoration-border underline-offset-4 transition-[color,text-decoration-color] duration-200 ease-out hover:text-primary hover:decoration-primary/40'
          >
            {seriesLabel}
          </Link>
        ) : (
          <span className='text-xs font-medium'>{seriesLabel}</span>
        ))}
      {draft && (
        <span className='rounded-full border border-dashed border-warning px-2.5 py-0.5 text-xs font-medium text-warning'>
          Draft
        </span>
      )}
    </div>
  );
}
