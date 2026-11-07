import type { CSSProperties } from 'react';
import CvEntry from '@/components/cvEntry';
import Reveal from '@/components/Reveal';
import { CommandLine, SectionLabel } from '@/components/pipeline';
import { cv } from '@/utils/cv';
import userData from '@/utils/data';

// /experience: the CV's experience and education, from utils/cv.ts like /cv.
// Newest first, so the career break sits above the jobs and the gap reads as
// explained before a recruiter sees the dates. The site's earlier work, which
// the CV leaves out, follows the CV's jobs.

/** Entries painted at load get the CSS entrance; the rest reveal on scroll. */
const aboveFold = 2;

export default function Experience() {
  return (
    <section className='min-h-svh pt-10 md:pt-16 pb-20'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        <div
          className='animate-enter'
          style={{ '--stagger': 1 } as CSSProperties}
        >
          <CommandLine className='mb-1'>$ git log --career</CommandLine>
          <SectionLabel as='h1'>experience</SectionLabel>
        </div>

        <div className='space-y-5'>
          {[...cv.experience, ...userData.earlierWork].map((entry, i) =>
            i < aboveFold ? (
              // Painted before hydration; a Reveal here would ship at opacity 0.
              <div
                key={entry.title + entry.dates}
                className='animate-enter'
                style={{ '--stagger': 2 + i } as CSSProperties}
              >
                <CvEntry entry={entry} />
              </div>
            ) : (
              <Reveal key={entry.title + entry.dates}>
                <CvEntry entry={entry} />
              </Reveal>
            ),
          )}
        </div>

        <section className='mt-12'>
          <SectionLabel>education</SectionLabel>
          <div className='space-y-5'>
            {cv.education.map(entry => (
              <Reveal key={entry.title}>
                <CvEntry entry={entry} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
