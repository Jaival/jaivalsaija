'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import userData from 'utils/data';
import type { Experience as ExperienceEntry } from '@/utils/interface';
import PageHeader from './PageHeader';
import Reveal from './Reveal';
import { durations, easeOut } from '@/utils/animations';

export default function Experience() {
  return (
    <section className='min-h-svh'>
      <PageHeader title='Experience.' />

      <div className='-mt-10'>
        <div className='px-4 md:px-8 pb-16 pt-10'>
          {/* Work first, then degrees: recruiters look for the job entry. */}
          <Timeline heading='Work' entries={userData.experience} aboveFold />
          <Timeline heading='Education' entries={userData.education} />
        </div>
      </div>
    </section>
  );
}

function Timeline({
  heading,
  entries,
  aboveFold = false,
}: {
  heading: string;
  entries: ExperienceEntry[];
  /** The first cards are on screen at load, so they get the CSS entrance. */
  aboveFold?: boolean;
}) {
  return (
    <div className='max-w-4xl mx-auto pt-12 md:pt-20'>
      <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10 md:mb-12'>
        {heading}
      </h2>

      <div className='grid grid-cols-1 relative'>
        {entries.map((exp, idx) => (
          <div key={`${heading}-${exp.id}`} className='timeline-item'>
            {aboveFold && idx < 2 ? (
              // Painted before hydration; a Reveal here would ship at opacity 0.
              <div
                className='animate-enter'
                style={{ '--stagger': 2 + idx } as CSSProperties}
              >
                <ExperienceCard {...exp} />
              </div>
            ) : (
              <Reveal index={idx}>
                <ExperienceCard {...exp} />
              </Reveal>
            )}

            {idx !== entries.length - 1 && (
              <div className='flex flex-col items-center -mt-2 divider-container'>
                <div className='relative z-10 w-6 h-6 rounded-full bg-gradient-to-r from-brand-from to-brand-to shadow-lg' />

                {/* The connector draws itself downward as you scroll past.
                    scaleY, not height — height is a layout property and
                    would reflow the whole timeline every frame. */}
                <motion.div
                  className='w-0.5 h-20 md:h-24 origin-top bg-gradient-to-b from-brand-from to-brand-to rounded-full'
                  initial={{ transform: 'scaleY(0)' }}
                  whileInView={{ transform: 'scaleY(1)' }}
                  viewport={{ once: true }}
                  transition={{ duration: durations.base, ease: easeOut }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const ExperienceCard = ({
  title,
  desc,
  year,
  company,
  companyLink,
  highlights,
  gap = false,
}: Omit<ExperienceEntry, 'id'>) => {
  // A gap entry explains time between jobs. It reads as a note, not a job:
  // dashed and muted, with no employer and no hover lift.
  const shell = gap
    ? 'relative z-10 px-6 py-5 md:px-8 bg-card/30 rounded-2xl border-2 border-dashed border-border'
    : 'relative z-10 p-6 md:p-8 bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-border group transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1';

  return (
    <div className={shell}>
      {/* Year badge — a label, not a heading, so it stays out of the outline. */}
      <div
        className={`absolute -top-4 -left-4 md:-left-6 px-4 py-2 rounded-xl shadow-lg z-20 ${
          gap ? 'bg-muted' : 'bg-gradient-to-r from-brand-from to-brand-to'
        }`}
      >
        <span
          className={`block text-lg md:text-xl font-bold tracking-tight ${
            gap ? 'text-muted-foreground' : 'text-primary-foreground'
          }`}
        >
          {year}
        </span>
      </div>

      <div className='pt-4'>
        <h3
          className={`font-bold tracking-tight text-card-foreground mb-2 ${
            gap ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
          }`}
        >
          {title}
        </h3>

        {company &&
          (companyLink ? (
            <Link
              href={companyLink}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block text-primary font-semibold hover:text-brand-to transition-colors duration-200 ease-out mb-3 border-b border-transparent hover:border-primary'
            >
              {company}
            </Link>
          ) : (
            <p className='text-primary font-semibold mb-3'>{company}</p>
          ))}

        <p className='text-muted-foreground leading-relaxed text-base md:text-lg'>
          {desc}
        </p>

        {highlights && highlights.length > 0 && (
          <ul className='mt-4 space-y-2 list-disc pl-5 marker:text-primary text-foreground leading-relaxed text-base'>
            {highlights.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Decorative corner dot. Static: it never meant anything. */}
      {!gap && (
        <div
          aria-hidden
          className='absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-highlight to-highlight-strong rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-200 ease-out'
        />
      )}
    </div>
  );
};
