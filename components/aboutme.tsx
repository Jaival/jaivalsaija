import { containerStyles } from '@/utils/styles';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import userData from 'utils/data';
import PageHeader from './PageHeader';
import Reveal from './Reveal';

/** Card shell. No hover scale: these are not clickable. */
const card = 'bg-card/50 rounded-2xl p-6 shadow-lg';

// The chevron nudges on hover — feedback about where the link goes, instead of
// the old perpetual loop that ran whether you were looking or not.
const SocialLink = ({ href, name }: { href: string; name: string }) => (
  <Link href={href} className='group flex flex-row items-center space-x-4 py-2'>
    <ChevronRight className='w-5 h-5 text-primary transition-transform duration-200 ease-out group-hover:translate-x-1' />
    <span className='relative overflow-hidden font-mono text-lg text-foreground'>
      {name}
      <span className='absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-highlight to-highlight-strong scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left' />
    </span>
  </Link>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className='text-xl font-semibold tracking-tight bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent mb-4'>
    {children}
  </h2>
);

const inlineLink =
  'font-bold border-b-2 text-primary border-primary hover:border-brand-to transition-colors duration-200 ease-out';

export default function AboutMe() {
  return (
    <section className={containerStyles.page}>
      <PageHeader title='About Me.' />

      {/* Above the fold — CSS entrance, visible before hydration. */}
      <div className='-mt-10'>
        <div className='max-w-6xl pt-16 sm:pt-20 mx-auto'>
          <div
            className='animate-enter mx-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-relaxed text-foreground'
            style={{ '--stagger': 2 } as React.CSSProperties}
          >
            {userData.about.title} Right now I&apos;m in Kaiserslautern, doing
            my Master&apos;s in Computer Science at <span>RPTU</span>{' '}
            <span>✈️</span>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className='px-4'>
        <div className='grid max-w-6xl grid-cols-1 pt-12 sm:pt-16 md:pt-20 mx-auto md:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-8 md:gap-x-20'>
          {/* Left sidebar */}
          <aside className='inline-flex flex-col space-y-8'>
            <Reveal className={card}>
              <SectionHeader>Contact</SectionHeader>
              <div className='text-base sm:text-lg text-foreground'>
                Whatever it&apos;s about, send me an{' '}
                <Link href={`mailto:${userData.email}`} className={inlineLink}>
                  email
                </Link>{' '}
                and I&apos;ll get back to you. I swear.
              </div>
            </Reveal>

            <Reveal className={card} index={1}>
              <SectionHeader>Job Opportunities</SectionHeader>
              <div className='space-y-3 text-base sm:text-lg text-foreground'>
                <p>{userData.availability.role}</p>
                <ul className='space-y-1 text-base text-muted-foreground'>
                  {userData.availability.facts.map(({ label, value }) => (
                    <li key={label}>
                      <span className='font-semibold text-foreground'>
                        {label}:
                      </span>{' '}
                      {value}
                    </li>
                  ))}
                </ul>
                <p>
                  If you think I fit, my{' '}
                  {/* A static file, so a plain <a>, not Link. */}
                  <a
                    href={userData.resumeUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={inlineLink}
                  >
                    CV
                  </a>{' '}
                  has the details.
                </p>
              </div>
            </Reveal>

            <Reveal className={card} index={2}>
              <SectionHeader>Social Links</SectionHeader>
              <div className='mt-2 ml-4'>
                <SocialLink
                  href={userData.socialLinks.linkedin}
                  name='LinkedIn'
                />
                <SocialLink href={userData.socialLinks.github} name='GitHub' />
                <SocialLink
                  href={userData.socialLinks.twitter}
                  name='Twitter'
                />
                <SocialLink
                  href={userData.socialLinks.instagram}
                  name='Instagram'
                />
              </div>
            </Reveal>
          </aside>

          {/* Main content area */}
          <div className='col-span-1 md:col-span-2'>
            {/* Stack before story: it's what a recruiter scans for, and the
                story reads better once you know the tools in it. */}
            <Reveal className='mb-12 bg-card/50 rounded-2xl p-8 shadow-lg'>
              <h3 className='inline-block px-4 py-2 text-2xl sm:text-3xl font-bold tracking-tight bg-highlight rounded-xl text-highlight-foreground shadow-lg mb-8'>
                Tech Stack
              </h3>
              {/* Text, not icons: ATS and AI screeners read words. Same
                  groups as the CV's Technical Proficiency block. */}
              <dl className='space-y-4'>
                {userData.skills.map(({ group, items }) => (
                  <div
                    key={group}
                    className='grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-1'
                  >
                    <dt className='text-sm font-semibold uppercase tracking-wide text-primary sm:pt-0.5'>
                      {group}
                    </dt>
                    <dd className='text-base sm:text-lg text-foreground'>
                      {items.join(', ')}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Kept apart from the stack above so it isn't read as a
                  finished skill. */}
              <p className='mt-6 pt-6 border-t border-border text-base text-muted-foreground'>
                <span className='text-sm font-semibold uppercase tracking-wide text-foreground'>
                  Learning
                </span>{' '}
                {userData.learning.join(', ')}, in my{' '}
                <a
                  href='https://github.com/Jaival/kubernetes-learning-lab'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={inlineLink}
                >
                  Kubernetes lab
                </a>
                .
              </p>
            </Reveal>

            <Reveal className='space-y-6 bg-card/50 rounded-2xl p-8 shadow-lg'>
              {userData.about.description?.map(desc => (
                <p
                  key={desc}
                  className='text-base sm:text-lg md:text-xl text-foreground leading-relaxed'
                >
                  {desc}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
