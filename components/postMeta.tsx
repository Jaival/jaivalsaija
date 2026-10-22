import series, { type SeriesId } from '@/content/series';
import type { PostSummary } from '@/utils/interface';
import { formatPostDate } from '@/utils/utils';

type PostMetaProps = Pick<
  PostSummary,
  'date' | 'type' | 'draft' | 'seriesPart' | 'readingMinutes'
> & {
  series?: SeriesId;
  className?: string;
};

/**
 * Date, type, reading time, series and draft flag: the line above every entry's title or
 * body. Plain text, no links, so it can sit inside a card that is a link.
 */
export default function PostMeta({
  date,
  type,
  draft,
  series: seriesId,
  seriesPart,
  readingMinutes,
  className = '',
}: PostMetaProps) {
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
      {seriesId && (
        <span className='text-xs font-medium'>
          {series[seriesId].title}
          {seriesPart && ` · Part ${seriesPart}`}
        </span>
      )}
      {draft && (
        <span className='rounded-full border border-dashed border-warning px-2.5 py-0.5 text-xs font-medium text-warning'>
          Draft
        </span>
      )}
    </div>
  );
}
