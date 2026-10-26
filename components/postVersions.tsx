import { GitBranch, GitCommitHorizontal, Tag } from 'lucide-react';
import Link from 'next/link';
import type { PostVersionSummary } from '@/utils/interface';
import { formatPostDate } from '@/utils/utils';
import Reveal from './Reveal';

// Both views borrow from git: versions are commits on one branch, `main` is
// the current version and `HEAD` is the one on screen. A version written for
// a software release carries that release as a tag, linked to its release
// post. Amber marks an older version being read, the same warm tone the site
// uses for highlights.

const refTag =
  'rounded-full border px-2 py-px font-mono text-[0.65rem] leading-4 font-medium';
const mainTag = `${refTag} border-primary/45 text-primary`;
const headTag = `${refTag} border-highlight/60 text-highlight-strong`;

const textLink =
  'text-primary transition-colors duration-200 ease-out hover:text-brand-to';

/** A release tag, like `git log --decorate` prints one. */
function ReleaseTag({ release }: { release: string }) {
  return (
    <span
      className={`${refTag} inline-flex items-center gap-1 border-border text-muted-foreground`}
    >
      <Tag aria-hidden className='size-2.5' />v{release}
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
  const latest = versions.at(-1)!;
  const isOld = viewing !== latest.version;
  const here = versions.find(entry => entry.version === viewing)!;

  return (
    <nav
      aria-label='Versions of this post'
      className='flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-muted-foreground'
    >
      <GitBranch aria-hidden className='size-3.5 shrink-0' />
      <ol className='flex items-center'>
        {versions.map(({ version, date, href }, index) => {
          const isHere = version === viewing;
          const node = (
            <>
              <span
                aria-hidden
                className={`size-2.5 ${dotClass(isHere, isOld)}`}
              />
              <span className='font-mono'>v{version}</span>
            </>
          );
          return (
            <li key={version} className='flex items-center'>
              {index > 0 && (
                <span
                  aria-hidden
                  className='mx-2 h-0.5 w-10 rounded-full bg-primary/40 sm:w-14'
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
          <Link href={latest.href} className={textLink}>
            v{latest.version} is current <span aria-hidden>→</span>
          </Link>
        </span>
      ) : (
        <a
          href='#history'
          className='transition-colors duration-200 ease-out hover:text-primary'
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
  const latest = versions.at(-1)!.version;
  const isOld = viewing !== latest;
  const rows = versions.toReversed();

  return (
    <section id='history' className='mt-16 scroll-mt-28'>
      <Reveal>
        <div className='flex items-baseline justify-between gap-4 mb-4'>
          <h2 className='flex items-center gap-2 text-lg font-bold tracking-tight'>
            <GitCommitHorizontal
              aria-hidden
              className='size-4 self-center text-muted-foreground'
            />
            History
          </h2>
          {isOld && (
            <span className='text-sm font-medium text-highlight-strong'>
              You&apos;re reading an older version
            </span>
          )}
        </div>

        <ol className='rounded-2xl border border-border bg-card/50 py-2'>
          {rows.map(
            ({ version, date, changes, href, release, notesHref }, index) => {
              const isHere = version === viewing;
              // The rail joins the dots through each row's padding: from the
              // first dot down, and up to the last, never past either end. The
              // dot's centre sits 13px into the cell.
              const rail =
                index === 0
                  ? 'top-[13px] -bottom-3'
                  : index === rows.length - 1
                    ? '-top-3 h-[25px]'
                    : '-top-3 -bottom-3';
              const content = (
                <>
                  <span className='relative flex justify-center self-stretch'>
                    <span
                      aria-hidden
                      className={`absolute left-1/2 w-0.5 -translate-x-1/2 bg-primary/35 ${rail}`}
                    />
                    <span
                      aria-hidden
                      className={`relative mt-[7px] size-3 ${dotClass(isHere, isOld)} ${isHere ? `ring-4 ${isOld ? 'ring-highlight/20' : 'ring-primary/15'}` : ''}`}
                    />
                  </span>
                  <span className='min-w-0'>
                    <span className='flex flex-wrap items-center gap-1.5'>
                      {isHere ? (
                        <span className='font-mono text-sm text-foreground'>
                          v{version}
                        </span>
                      ) : (
                        // Stretched over the whole row, so the row is the
                        // link; the release-notes link sits above it.
                        <Link
                          href={href}
                          aria-label={`Version ${version}, ${formatPostDate(date)}${changes ? `: ${changes}` : ''}`}
                          className='font-mono text-sm text-foreground after:absolute after:inset-0'
                        >
                          v{version}
                        </Link>
                      )}
                      {version === latest && (
                        <span className={mainTag}>main</span>
                      )}
                      {isHere && <span className={headTag}>HEAD</span>}
                      {release && <ReleaseTag release={release} />}
                    </span>
                    {changes && (
                      <span className='mt-0.5 block text-sm text-muted-foreground text-pretty transition-colors duration-200 ease-out group-hover:text-foreground'>
                        {changes}
                      </span>
                    )}
                    {notesHref && (
                      <Link
                        href={notesHref}
                        className={`relative z-10 mt-1 inline-block text-sm font-medium ${textLink}`}
                      >
                        Release notes <span aria-hidden>→</span>
                      </Link>
                    )}
                  </span>
                  <time
                    dateTime={date}
                    className='pt-0.5 font-mono text-xs whitespace-nowrap text-muted-foreground'
                  >
                    {formatPostDate(date)}
                  </time>
                </>
              );
              const row =
                'relative grid grid-cols-[0.75rem_1fr_auto] gap-x-4 px-5 py-3 transition-colors duration-200 ease-out';
              return (
                <li key={version}>
                  <div
                    aria-current={isHere ? 'page' : undefined}
                    className={isHere ? row : `${row} group hover:bg-card/70`}
                  >
                    {content}
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
    <p className='flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-muted-foreground'>
      <ReleaseTag release={release} />
      <Link href={guide.version.href} className={textLink}>
        Setup guide as of v{release} <span aria-hidden>→</span>
      </Link>
    </p>
  );
}
