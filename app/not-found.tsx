import { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { CommandLine, SectionLabel } from '@/components/pipeline';
import MissingPath from '@/components/missingPath';

export const metadata: Metadata = {
  title: 'Not found - Jaival Saija',
};

// A shell's answer to a path that isn't there: `$ cd /page`, then the error.
export default function NotFound() {
  return (
    <section className='min-h-[70svh] pt-10 md:pt-16 pb-20'>
      <div
        className='animate-enter max-w-4xl mx-auto px-4 md:px-8'
        style={{ '--stagger': 1 } as CSSProperties}
      >
        <CommandLine className='mb-1'>
          $ cd <MissingPath />
        </CommandLine>
        <SectionLabel as='h1'>not found</SectionLabel>
        <p className='font-mono text-sm text-muted-foreground break-words'>
          cd: <MissingPath />: no such file or directory
        </p>
        <p className='mt-4 text-foreground leading-relaxed'>
          This page doesn&apos;t exist, or it moved.
        </p>
        <Link
          href='/'
          className='mt-6 inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:bg-primary/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
