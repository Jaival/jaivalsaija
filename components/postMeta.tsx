import type { PostSummary } from '@/utils/interface';
import { formatPostDate } from '@/utils/utils';

/** Date, type and draft flag: the line above every entry's title or body. */
export default function PostMeta({
  date,
  type,
  draft,
  className = '',
}: Pick<PostSummary, 'date' | 'type' | 'draft'> & { className?: string }) {
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
      {draft && (
        <span className='rounded-full border border-dashed border-warning px-2.5 py-0.5 text-xs font-medium text-warning'>
          Draft
        </span>
      )}
    </div>
  );
}
