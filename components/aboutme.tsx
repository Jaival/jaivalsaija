import type { CSSProperties } from 'react';
import Reveal from '@/components/Reveal';
import {
  CommandLine,
  Rows,
  SectionLabel,
  flagLabel,
} from '@/components/pipeline';
import SkillRows from '@/components/skillRows';
import userData from '@/utils/data';

// /aboutme: the one-line lead, the story, then the CV's skill rows (from
// utils/cv.ts, like /cv and the PDF) with "learning:" items marked, and the
// status a recruiter filters on.

/** Entrance stagger step, in `.animate-enter` units. */
const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

export default function AboutMe() {
  const { about, availability, resumeUrl } = userData;

  return (
    <section className='min-h-svh pt-10 md:pt-16 pb-20'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        {/* Above the fold: CSS entrance, visible before hydration. */}
        <div className='animate-enter' style={step(1)}>
          <CommandLine className='mb-1'>$ whoami</CommandLine>
          <SectionLabel as='h1'>about</SectionLabel>
        </div>

        <p
          className='animate-enter text-lg md:text-xl text-foreground leading-relaxed'
          style={step(2)}
        >
          {about.title}
        </p>

        <section className='animate-enter mt-12' style={step(3)}>
          <SectionLabel>story</SectionLabel>
          <div className='space-y-4'>
            {about.description.map(paragraph => (
              <p key={paragraph} className='text-foreground leading-relaxed'>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <Reveal as='section' className='mt-12'>
          <SectionLabel>skills</SectionLabel>
          <SkillRows />
        </Reveal>

        {/* The facts only: home shows the same rows, and the old "I'm
            looking for…" sentence said the first one twice. */}
        <Reveal as='section' className='mt-12'>
          <SectionLabel>status</SectionLabel>
          <Rows
            labelWidth='8rem'
            rows={availability.facts.map(({ label, value }) => ({
              label: flagLabel(label),
              value,
            }))}
          />
          {/* A static file, so a plain <a>; Link would try a client route. */}
          <a
            href={resumeUrl}
            download='Jaival_Saija_CV.pdf'
            className='mt-8 inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:bg-primary/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          >
            Download CV
          </a>
        </Reveal>
      </div>
    </section>
  );
}
