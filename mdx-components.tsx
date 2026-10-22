import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

// Post typography, mapped element by element so posts use the same tokens and
// type scale as the rest of the site. The post page renders the title as the
// h1, so headings inside a post start at h2.

const headingBase =
  'scroll-mt-28 font-bold tracking-tight text-foreground text-balance';

function Anchor({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) {
  const className =
    'font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-primary';

  // Internal links stay client-side; everything else opens in a new tab.
  if (href.startsWith('/') || href.startsWith('#')) {
    return <Link href={href} className={className} {...props} />;
  }
  return (
    <a
      href={href}
      className={className}
      target='_blank'
      rel='noopener noreferrer'
      {...props}
    />
  );
}

/**
 * rehype-pretty-code marks fenced blocks with `data-language`; anything
 * without it is inline code in running text.
 */
function Code(
  props: ComponentPropsWithoutRef<'code'> & { 'data-language'?: string },
) {
  if (props['data-language']) {
    return <code {...props} />;
  }
  return (
    <code
      className='box-decoration-clone rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground'
      {...props}
    />
  );
}

const components = {
  h2: props => (
    <h2
      className={`${headingBase} mt-12 mb-4 text-2xl md:text-3xl`}
      {...props}
    />
  ),
  h3: props => (
    <h3
      className={`${headingBase} mt-10 mb-3 text-xl md:text-2xl`}
      {...props}
    />
  ),
  h4: props => <h4 className={`${headingBase} mt-8 mb-2 text-lg`} {...props} />,
  p: props => (
    <p
      className='my-5 text-base md:text-lg leading-relaxed text-muted-foreground text-pretty'
      {...props}
    />
  ),
  a: Anchor,
  strong: props => (
    <strong className='font-semibold text-foreground' {...props} />
  ),
  ul: props => (
    <ul
      className='my-5 ml-6 list-disc space-y-2 text-base md:text-lg leading-relaxed text-muted-foreground marker:text-primary'
      {...props}
    />
  ),
  ol: props => (
    <ol
      className='my-5 ml-6 list-decimal space-y-2 text-base md:text-lg leading-relaxed text-muted-foreground marker:text-primary'
      {...props}
    />
  ),
  li: props => <li className='pl-1' {...props} />,
  blockquote: props => (
    <blockquote
      className='my-6 border-l-2 border-highlight pl-5 italic text-foreground [&>p]:text-foreground'
      {...props}
    />
  ),
  hr: props => (
    <hr
      className='my-12 h-px border-0 bg-gradient-to-r from-transparent via-border to-transparent'
      {...props}
    />
  ),
  code: Code,
  pre: props => (
    <pre
      className='my-6 overflow-x-auto rounded-xl border border-border bg-muted/60 py-4 text-sm leading-relaxed'
      {...props}
    />
  ),
  table: props => (
    <div className='my-6 overflow-x-auto rounded-xl border border-border'>
      <table className='w-full text-left text-sm' {...props} />
    </div>
  ),
  th: props => (
    <th
      className='border-b border-border bg-muted/60 px-4 py-2 font-semibold text-foreground'
      {...props}
    />
  ),
  td: props => (
    <td
      className='border-b border-border px-4 py-2 text-muted-foreground'
      {...props}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
