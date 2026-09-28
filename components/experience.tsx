'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import userData from 'utils/data';
import PageHeader from './PageHeader';
import Reveal from './Reveal';
import { durations, easeOut } from '@/utils/animations';

export default function Experience() {
  return (
    <section className='min-h-svh'>
      <PageHeader title='Experience.' />

      <div className='-mt-10'>
        <div className='px-4 md:px-8 pb-16 pt-10'>
          <div className='grid grid-cols-1 max-w-4xl mx-auto pt-12 md:pt-20 relative'>
            {userData.experience.map((exp, idx) => (
              <div key={`experience-${exp.id}`} className='timeline-item'>
                <Reveal index={idx}>
                  <ExperienceCard
                    title={exp.title}
                    desc={exp.desc}
                    year={exp.year}
                    company={exp.company}
                    companyLink={exp.companyLink}
                  />
                </Reveal>

                {idx !== userData.experience.length - 1 && (
                  <div className='flex flex-col items-center -mt-2 divider-container'>
                    <div className='relative z-10 w-6 h-6 rounded-full bg-gradient-to-r from-green-dark to-green-light shadow-lg' />

                    {/* The connector draws itself downward as you scroll past.
                        scaleY, not height — height is a layout property and
                        would reflow the whole timeline every frame. */}
                    <motion.div
                      className='w-0.5 h-20 md:h-24 origin-top bg-gradient-to-b from-green-dark via-blue-green to-green-light rounded-full'
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
      </div>
    </section>
  );
}

const ExperienceCard = ({
  title,
  desc,
  year,
  company,
  companyLink = '#',
}: {
  title: string;
  desc: string;
  year: string;
  company: string;
  companyLink?: string;
}) => {
  return (
    <div className='relative z-10 p-6 md:p-8 bg-white/20 dark:bg-black-light/20 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-white/30 dark:border-blue-line/30 group transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1'>
      {/* Year badge — a label, not a heading, so it stays out of the outline. */}
      <div className='absolute -top-4 -left-4 md:-left-6 px-4 py-2 bg-gradient-to-r from-hero-font to-blue-green rounded-xl shadow-lg z-20'>
        <span className='block text-lg md:text-xl font-bold tracking-tight text-white'>
          {year}
        </span>
      </div>

      <div className='pt-4'>
        <h2 className='text-xl md:text-2xl font-bold tracking-tight text-blue-dark dark:text-white mb-2'>
          {title}
        </h2>

        <Link
          href={companyLink}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block text-hero-font dark:text-blue-light font-semibold hover:text-blue-green dark:hover:text-aero transition-colors duration-200 ease-out mb-3 border-b border-transparent hover:border-hero-font dark:hover:border-blue-light'
        >
          {company}
        </Link>

        <p className='text-blue-dark dark:text-gray-light leading-relaxed text-base md:text-lg'>
          {desc}
        </p>
      </div>

      {/* Decorative corner dot. Static: it never meant anything. */}
      <div
        aria-hidden
        className='absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-orange-light to-red-light rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-200 ease-out'
      />
    </div>
  );
};
