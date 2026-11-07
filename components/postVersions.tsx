import Link from 'next/link';
import { SectionLabel } from '@/components/pipeline';
import { formatPostDate } from '@/utils/blog/kind';
import type { PostVersionSummary } from '@/utils/blog/types';
import Reveal from './Reveal';

// Both views borrow from git: versions are commits on one branch, `main` is
// the current version and `HEAD` is the one on screen. A version written for
// a software release carries that release as a tag (`tag: v1.0.0`, as
// `git log --decorate` prints it), linked to its release post. Amber marks
// an older version being read, the same warm tone the site uses for
// highlights.

/** A ref beside a version, bordered like a blog row's kind tag. */
const refTag =
  'inline-block rounded-sm border px-1.5 font-mono text-sm leading-6 font-medium';
const mainTag = `${refTag} border-primary/45 text-primary`;
const headTag = `${refTag} border-highlight/60 text-highlight-strong`;

const textLink =
  'text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-200 ease-out hover:decoration-primary';

function ReleaseTag({ release }: { release: string }) {
  return (
    <span className={`${refTag} border-border text-muted-foreground`}>
      tag: v{release}
    </span>
  );
}

/** A version's dot: hollow, or filled for the one on screen. No size. */
function dotClass(isHere: boolean, isOld: boolean) {
  const base = 'shrink-0 rounded-full border-2';
  if (!isHere) {
    return `${base} border-primary bg-background`;
  }
  return isOld
    ? `${base} border-highlight bg-highlight`
    : `${base} border-primary bg-primary`;
}

interface VersionsProps {
  versions: PostVersionSummary[];
  /** The version on screen. */
  viewing: number;
}

/**
 * The branch line under a post's summary: one node per version, oldest
 * first, each a link to that version. Only rendered with two or more.
 */
export function VersionGraph({ versions, viewing }: VersionsProps) {
  const here = versions.find(entry => entry.version === viewing)!;
  const current = versions.find(entry => entry.isCurrent)!;
  const isOld = !here.isCurrent;

  return (
    <nav
      aria-label='Versions of this post'
      className='flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted-foreground'
    >
      <ol className='flex flex-wrap items-center gap-y-2'>
        {versions.map(({ version, date, href }, index) => {
          const isHere = version === viewing;
          const node = (
            <>
              <span
                aria-hidden
                className={`size-2.5 ${dotClass(isHere, isOld)}`}
              />
              v{version}
            </>
          );
          return (
            <li key={version} className='flex items-center'>
              {index > 0 && (
                <span
                  aria-hidden
                  className='mx-1.5 h-0.5 w-4 rounded-full bg-primary/40 sm:mx-2 sm:w-8'
                />
              )}
              {isHere ? (
                <span
                  aria-current='page'
                  className='flex items-center gap-1.5 text-foreground'
                >
                  {node}
                </span>
              ) : (
                <Link
                  href={href}
                  aria-label={`Version ${version}, ${formatPostDate(date)}`}
                  className='flex items-center gap-1.5 transition-colors duration-200 ease-out hover:text-primary'
                >
                  {node}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <span className={mainTag}>main</span>
      {here.release && <ReleaseTag release={here.release} />}
      {isOld ? (
        <span>
          <span className='text-highlight-strong'>
            Reading v{viewing} from {formatPostDate(here.date)}
          </span>
          {' · '}
          <Link href={current.href} className={textLink}>
            v{current.version} is current <span aria-hidden>→</span>
          </Link>
        </span>
      ) : (
        <a
          href='#history'
          className='underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary'
        >
          What changed <span aria-hidden>↓</span>
        </a>
      )}
      {here.notesHref && (
        <Link href={here.notesHref} className={textLink}>
          Release notes <span aria-hidden>→</span>
        </Link>
      )}
    </nav>
  );
}

/**
 * The full history at the end of a post, like `git log --graph`: newest
 * first, one row per version with what it changed. Other rows are links.
 */
export function VersionHistory({ versions, viewing }: VersionsProps) {
  const isOld = !versions.find(entry => entry.version === viewing)!.isCurrent;
  const rows = versions.toReversed();

  return (
    <section id='history' className='mt-16 scroll-mt-28'>
      <Reveal>
        <SectionLabel count={versions.length} className='mb-2'>
          history
        </SectionLabel>
        {isOld && (
          <p className='mb-2 font-mono text-sm text-highlight-strong'>
            You&apos;re reading an older version
          </p>
        )}

        <ol>
          {rows.map(
            (
              { version, isCurrent, date, changes, href, release, notesHref },
              index,
            ) => {
              const isHere = version === viewing;
              // The rail joins the dots through each row's padding: from the
              // first dot down, and up to the last, never past either end. The
              // dot's centre sits 12px into the cell, mid first line.
              const rail =
                index === 0
                  ? 'top-[12px] -bottom-3'
                  : index === rows.length - 1
                    ? '-top-3 h-[24px]'
                    : '-top-3 -bottom-3';
              const row =
                'relative -mx-3 grid grid-cols-[0.75rem_1fr] gap-x-4 rounded-md px-3 py-3 transition-colors duration-200 ease-out sm:grid-cols-[0.75rem_1fr_auto]';
              return (
                <li key={version}>
                  <div
                    aria-current={isHere ? 'page' : undefined}
                    className={isHere ? row : `${row} group hover:bg-muted`}
                  >
                    <span className='relative row-span-2 flex justify-center self-stretch sm:row-span-1'>
                      <span
                        aria-hidden
                        className={`absolute left-1/2 w-0.5 -translate-x-1/2 bg-primary/35 ${rail}`}
                      />
                      <span
                        aria-hidden
                        className={`relative mt-[6px] size-3 ${dotClass(isHere, isOld)} ${isHere ? `ring-4 ${isOld ? 'ring-highlight/20' : 'ring-primary/15'}` : ''}`}
                      />
                    </span>
                    <span className='min-w-0'>
                      <span className='flex flex-wrap items-center gap-1.5'>
                        {isHere ? (
                          <span className='font-mono text-sm leading-6 text-foreground'>
                            v{version}
                          </span>
                        ) : (
                          // Stretched over the whole row, so the row is the
                          // link; the release-notes link sits above it.
                          <Link
                            href={href}
                            aria-label={`Version ${version}, ${formatPostDate(date)}${changes ? `: ${changes}` : ''}`}
                            className='font-mono text-sm leading-6 text-foreground after:absolute after:inset-0'
                          >
                            v{version}
                          </Link>
                        )}
                        {isCurrent && <span className={mainTag}>main</span>}
                        {isHere && <span className={headTag}>HEAD</span>}
                        {release && <ReleaseTag release={release} />}
                      </span>
                      {changes && (
                        <span className='mt-0.5 block text-muted-foreground text-pretty transition-colors duration-200 ease-out group-hover:text-foreground'>
                          {changes}
                        </span>
                      )}
                      {notesHref && (
                        <Link
                          href={notesHref}
                          className={`relative z-10 mt-1 inline-block font-mono text-sm ${textLink}`}
                        >
                          Release notes <span aria-hidden>→</span>
                        </Link>
                      )}
                    </span>
                    {/* On phones the date goes under the version, as in a
                        title line. */}
                    <time
                      dateTime={date}
                      className='col-start-2 font-mono text-sm leading-6 whitespace-nowrap text-muted-foreground sm:col-start-3 sm:row-start-1'
                    >
                      {formatPostDate(date)}
                    </time>
                  </div>
                </li>
              );
            },
          )}
        </ol>
      </Reveal>
    </section>
  );
}

/**
 * Under a release post's summary: its tag, and the series' guide as it read
 * for this release, the version carrying the same tag.
 */
export function ReleaseLine({
  release,
  guide,
}: {
  release: string;
  guide: { title: string; version: PostVersionSummary };
}) {
  return (
    <p className='flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted-foreground'>
      <ReleaseTag release={release} />
      <Link href={guide.version.href} className={textLink}>
        Setup guide as of v{release} <span aria-hidden>→</span>
      </Link>
    </p>
  );
}
