import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Rows, SectionLabel, flagLabel } from '@/components/pipeline';
import { cv } from '@/utils/cv';
import userData from '@/utils/data';

const button =
  'inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** Entrance stagger step, in `.animate-enter` units. */
const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

/**
 * Home, above the fold: an availability pill, the headline, who I am, the two
 * CTAs and the photo, then the status rows a recruiter filters on. /cv is the document; home leads with a claim, so the two
 * don't open the same way. The entrance is CSS, so all of it is painted and
 * readable before any JS arrives.
 */
export default function Hero() {
  const [degree] = cv.education;
  return (
    <>
      <header className='flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between'>
        <div className='min-w-0'>
          <p
            className='animate-enter inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-foreground'
            style={step(1)}
          >
            <span aria-hidden className='text-success'>
              ●
            </span>
            {userData.availability.summary}
          </p>
          <h1
            className='animate-enter mt-4 max-w-2xl text-4xl md:text-5xl font-bold tracking-tight text-balance text-foreground'
            style={step(2)}
          >
            {userData.headline}
          </h1>
          <p
            className='animate-enter mt-3 text-muted-foreground'
            style={step(3)}
          >
            {userData.name} · {degree.title} student, {degree.org}
          </p>

          {/* The CV is a static file, so a plain <a>; Link would try a
            client-side route. */}
          <div
            className='animate-enter mt-6 flex flex-wrap gap-3'
            style={step(4)}
          >
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
        </div>

        <Image
          src={userData.avatarUrl}
          alt={`Photo of ${userData.name}`}
          width={144}
          height={144}
          sizes='144px'
          loading='eager'
          fetchPriority='high'
          className='animate-enter size-28 md:size-36 shrink-0 rounded-xl object-cover shadow-md'
          style={step(1)}
        />
      </header>

      {/* Plain text in the HTML: ATS and screen readers get it as it is. The
        pill already says when I can start, so that row stays on /aboutme. */}
      <section className='animate-enter mt-10' style={step(5)}>
        <SectionLabel>status</SectionLabel>
        <Rows
          labelWidth='8rem'
          rows={userData.availability.facts
            .filter(({ label }) => label !== 'Start')
            .map(({ label, value }) => ({ label: flagLabel(label), value }))}
        />
      </section>
    </>
  );
}
