import { Timeline, TitleLine } from '@/components/pipeline';
import type { CvEntry as Entry } from '@/utils/cv';

// One job, gap or degree from utils/cv.ts, as /cv and /experience show it.

type Heading = 'h2' | 'h3';

function EntryBody({ entry, as }: { entry: Entry; as: Heading }) {
  return (
    <>
      <TitleLine
        as={as}
        title={entry.title}
        org={entry.org}
        dates={entry.dates}
      />
      {entry.context && (
        <p className='mt-1 italic text-muted-foreground leading-relaxed'>
          {entry.context}
        </p>
      )}
      {entry.details && (
        <p className='mt-1 text-foreground leading-relaxed'>{entry.details}</p>
      )}
      {entry.bullets.length > 0 && (
        <ul className='mt-2 space-y-1.5 list-disc pl-5 marker:text-primary leading-relaxed'>
          {entry.bullets.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * A job sits on the accent timeline; a gap or a degree does not. The title is
 * an h3 under a section label (/cv); /experience lists jobs straight under its
 * h1, so it passes `as='h2'`.
 */
export default function CvEntry({
  entry,
  as = 'h3',
}: {
  entry: Entry;
  as?: Heading;
}) {
  return entry.bullets.length > 0 ? (
    <Timeline>
      <EntryBody entry={entry} as={as} />
    </Timeline>
  ) : (
    <article>
      <EntryBody entry={entry} as={as} />
    </article>
  );
}
