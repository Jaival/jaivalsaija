import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { CommandLine, Cursor, Rows, SectionLabel } from '@/components/pipeline';
import { cv } from '@/utils/cv';
import userData from '@/utils/data';

const button =
  'inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** Entrance stagger step, in `.animate-enter` units. */
const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

// 'Looking for' -> 'looking_for': the status labels read like shell flags.
const flag = (label: string) => label.toLowerCase().replaceAll(' ', '_');

/**
 * Home, above the fold: the name, a `$` tagline, the short profile, the status
 * a recruiter filters on, and the two CTAs. The entrance is CSS, so all of it
 * is painted and readable before any JS arrives.
 */
export default function Hero() {
  return (
    <>
      <header
        className='animate-enter flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between'
        style={step(1)}
      >
        <div className='min-w-0'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
            {userData.name}
          </h1>
          <CommandLine className='mt-2'>
            {cv.tagline}
            <Cursor />
          </CommandLine>
          <p className='mt-4 max-w-xl text-foreground leading-relaxed'>
            {userData.intro}
          </p>
        </div>

        <Image
          src={userData.avatarUrl}
          alt={`Photo of ${userData.name}`}
          width={144}
          height={144}
          sizes='144px'
          loading='eager'
          fetchPriority='high'
          className='size-28 md:size-36 shrink-0 rounded-xl object-cover shadow-md'
        />
      </header>

      {/* Plain text in the HTML: ATS and screen readers get it as it is. */}
      <section className='animate-enter mt-10' style={step(2)}>
        <SectionLabel>status</SectionLabel>
        <Rows
          labelWidth='8rem'
          rows={userData.availability.facts.map(({ label, value }) => ({
            label: flag(label),
            value:
              label === 'Start' ? (
                <>
                  <span aria-hidden className='mr-1.5 text-success'>
                    ●
                  </span>
                  {value}
                </>
              ) : (
                value
              ),
          }))}
        />
      </section>

      {/* The CV is a static file, so a plain <a>; Link would try a
          client-side route. */}
      <div className='animate-enter mt-8 flex flex-wrap gap-3' style={step(3)}>
        <a
          href={userData.resumeUrl}
          download='Jaival_Saija_CV.pdf'
          className={`${button} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          Download CV
        </a>
        <Link
          href='/projects'
          className={`${button} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground`}
        >
          View my work
        </Link>
      </div>
    </>
  );
}
