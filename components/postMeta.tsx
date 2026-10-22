import Link from 'next/link';
import series, { type SeriesId } from '@/content/series';
import type { PostSummary } from '@/utils/interface';
import { formatPostDate } from '@/utils/utils';

const badge = 'rounded-full px-2.5 py-0.5 text-xs font-medium';
const badgeStyles = {
  post: 'bg-primary/10 text-primary',
  update: 'bg-highlight/20 text-highlight-foreground dark:text-highlight',
  series: 'bg-brand-to/15 text-brand-to',
};

function PostDate({ date }: { date: string }) {
  return (
    <time dateTime={date} className='font-mono'>
      {formatPostDate(date)}
    </time>
  );
}

const row = 'flex flex-wrap items-center gap-3 text-sm text-muted-foreground';

type PostMetaProps = Pick<
  PostSummary,
  'date' | 'type' | 'draft' | 'seriesPart' | 'readingMinutes'
> & {
  series?: SeriesId;
  /**
   * How to show the series name: a link to its page, plain text (inside a
   * card that is already a link), or not at all (on the series page itself).
   */
  seriesDisplay?: 'link' | 'text' | 'none';
  className?: string;
};

/**
 * Date, kind, reading time, series and draft flag: the line above every
 * entry's title or body. A part of a series is badged "Part n" rather than
 * Post or Update: being in the series is what matters about it.
 */
export default function PostMeta({
  date,
  type,
  draft,
  series: seriesId,
  seriesPart,
  readingMinutes,
  seriesDisplay = 'text',
  className = '',
}: PostMetaProps) {
  return (
    <div className={`${row} ${className}`}>
      <PostDate date={date} />
      {seriesId ? (
        <span className={`${badge} ${badgeStyles.series}`}>
          {seriesPart ? `Part ${seriesPart}` : 'Series'}
        </span>
      ) : (
        <span className={`${badge} ${badgeStyles[type]}`}>
          {type === 'update' ? 'Update' : 'Post'}
        </span>
      )}
      {/* Updates are a paragraph or two; a read time there is noise. */}
      {type === 'post' && (
        <span className='text-xs font-medium'>{readingMinutes} min read</span>
      )}
      {seriesId && seriesDisplay === 'link' && (
        <Link
          href={`/blog/series/${seriesId}`}
          className='text-xs font-medium underline decoration-border underline-offset-4 transition-[color,text-decoration-color] duration-200 ease-out hover:text-primary hover:decoration-primary/40'
        >
          {series[seriesId].title}
        </Link>
      )}
      {seriesId && seriesDisplay === 'text' && (
        <span className='text-xs font-medium'>{series[seriesId].title}</span>
      )}
      {draft && (
        <span className='rounded-full border border-dashed border-warning px-2.5 py-0.5 text-xs font-medium text-warning'>
          Draft
        </span>
      )}
    </div>
  );
}

/** The meta line for a whole series in the feed: last updated, part count. */
export function SeriesMeta({
  date,
  parts,
  className = '',
}: {
  date: string;
  parts: number;
  className?: string;
}) {
  return (
    <div className={`${row} ${className}`}>
      <PostDate date={date} />
      <span className={`${badge} ${badgeStyles.series}`}>Series</span>
      <span className='text-xs font-medium'>
        {parts} {parts === 1 ? 'part' : 'parts'}
      </span>
    </div>
  );
}
