import { Fragment, type CSSProperties, type ReactNode } from 'react';

// The shared parts of the "A · Pipeline" look: an engineer's terminal, with
// lowercase mono labels, title lines with the date on the right and an accent
// timeline beside jobs and projects. Every page builds from these; /cv is the
// reference build. Mono text is never below text-sm (14 px), so the terminal
// look stays readable.

/** A decorative `$ command` above a page title. Hidden from screen readers. */
export function CommandLine({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      aria-hidden
      className={`font-mono text-sm md:text-base font-medium text-primary break-words ${className}`}
    >
      {children}
    </p>
  );
}

/** The blinking block cursor that ends a command line. Still under reduced motion. */
export function Cursor() {
  return (
    <span
      aria-hidden
      className='animate-blink ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-primary'
    />
  );
}

/**
 * Lowercase mono section label with a rule that fills the rest of the line.
 * On a sub-page the first one is the page's `<h1>`.
 */
export function SectionLabel({
  as: Heading = 'h2',
  count,
  children,
  className = '',
}: {
  as?: 'h1' | 'h2';
  /** Muted number after the label, e.g. how many projects follow. */
  count?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Heading
      className={`mb-5 flex items-center gap-3 font-mono text-sm font-bold tracking-wide text-primary ${className}`}
    >
      <span className='whitespace-nowrap'>
        {children}
        {count !== undefined && (
          <span className='ml-2.5 font-normal text-muted-foreground'>
            {count}
          </span>
        )}
      </span>
      <span aria-hidden className='h-px flex-1 bg-border' />
    </Heading>
  );
}

/**
 * A semibold title, `·` and the org or stack in muted text, and the date in
 * mono at the right edge. On phones the date goes under the title.
 */
export function TitleLine({
  title,
  org,
  dates,
}: {
  title: ReactNode;
  org?: ReactNode;
  dates: string;
}) {
  return (
    <div className='flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between'>
      <h3 className='text-lg text-foreground'>
        <span className='font-semibold'>{title}</span>
        {org && <span className='text-muted-foreground'> · {org}</span>}
      </h3>
      <p className='shrink-0 font-mono text-sm whitespace-nowrap text-muted-foreground'>
        {dates}
      </p>
    </div>
  );
}

/** 'Looking for' → 'looking_for': status labels read like shell flags. */
export const flagLabel = (label: string) =>
  label.toLowerCase().replaceAll(' ', '_');

export interface Row {
  label: string;
  value: ReactNode;
}

/**
 * Label/value rows as a definition list: a mono accent label column and a
 * plain value. The label column is 11rem wide unless `labelWidth` says
 * otherwise; on phones the label sits above its value.
 */
export function Rows({
  rows,
  labelWidth,
  className = '',
}: {
  rows: Row[];
  /** A CSS length for the label column, e.g. '6rem'. */
  labelWidth?: string;
  className?: string;
}) {
  return (
    <dl
      className={`grid gap-x-6 gap-y-2 sm:grid-cols-[var(--label-width,11rem)_minmax(0,1fr)] ${className}`}
      style={
        labelWidth
          ? ({ '--label-width': labelWidth } as CSSProperties)
          : undefined
      }
    >
      {rows.map(row => (
        <div key={row.label} className='contents'>
          <dt className='pt-0.5 font-mono text-sm font-medium text-primary'>
            {row.label}
          </dt>
          <dd className='mb-2 text-foreground sm:mb-0'>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The 2 px accent border beside a job or a project row. */
export function Timeline({
  as: Element = 'article',
  children,
  className = '',
}: {
  as?: 'article' | 'div' | 'li';
  children: ReactNode;
  className?: string;
}) {
  return (
    <Element className={`border-l-2 border-primary pl-4 md:pl-5 ${className}`}>
      {children}
    </Element>
  );
}

/** A small bordered mono tag for a blog row's kind (`release`, `update`). */
export function KindTag({ children }: { children: string }) {
  return (
    <span className='mr-2 inline-block rounded-sm border border-border px-1.5 font-mono text-sm leading-6 font-medium text-primary lowercase'>
      {children}
    </span>
  );
}

/**
 * `https://github.com/Jaival/x` → `github.com/Jaival/x`, as the CV writes it.
 * A phone can wrap a long one after a slash, never inside a name.
 */
export function BareUrl({ url }: { url: string }) {
  const parts = url
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .split('/');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          /<wbr />
        </>
      )}
      {part}
    </Fragment>
  ));
}
