import { containerStyles } from '@/utils/styles';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import userData from 'utils/data';
import PageHeader from './PageHeader';
import Reveal from './Reveal';

/** Card shell. No hover scale: these are not clickable. */
const card = 'bg-white/20 dark:bg-black-light/20 rounded-2xl p-6 shadow-lg';

// The chevron nudges on hover — feedback about where the link goes, instead of
// the old perpetual loop that ran whether you were looking or not.
const SocialLink = ({ href, name }: { href: string; name: string }) => (
  <Link href={href} className='group flex flex-row items-center space-x-4 py-2'>
    <ChevronRight className='w-5 h-5 text-blue-dark dark:text-hero-font transition-transform duration-200 ease-out group-hover:translate-x-1' />
    <span className='relative overflow-hidden font-mono text-lg text-blue-dark dark:text-gray-light'>
      {name}
      <span className='absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-red-light to-orange-light scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left' />
    </span>
  </Link>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className='text-xl font-semibold tracking-tight bg-gradient-to-r from-hero-font to-blue-green bg-clip-text text-transparent dark:from-blue-light dark:to-aero mb-4'>
    {children}
  </h2>
);

const inlineLink =
  'font-bold border-b-2 text-hero-font border-hero-font dark:border-blue-light dark:text-blue-light hover:border-blue-green dark:hover:border-aero transition-colors duration-200 ease-out';

export default function AboutMe() {
  return (
    <section className={containerStyles.page}>
      <PageHeader title='About Me.' />

      {/* Above the fold — CSS entrance, visible before hydration. */}
      <div className='-mt-10'>
        <div className='max-w-6xl pt-16 sm:pt-20 mx-auto'>
          <div
            className='animate-enter mx-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-relaxed text-blue-dark dark:text-gray-light'
            style={{ '--stagger': 2 } as React.CSSProperties}
          >
            {userData.about.title} Right now I&apos;m in Kaiserslautern,
            finishing a Masters in Computer Science at <span>RPTU</span>{' '}
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
              <div className='text-base sm:text-lg text-blue-dark dark:text-gray-light'>
                For any sort help / enquiry, shoot a{' '}
                <Link href={`mailto:${userData.email}`} className={inlineLink}>
                  mail
                </Link>{' '}
                and I&apos;ll get back. I swear.
              </div>
            </Reveal>

            <Reveal className={card} index={1}>
              <SectionHeader>Job Opportunities</SectionHeader>
              <div className='text-base sm:text-lg text-blue-dark dark:text-gray-light'>
                I&apos;m looking for DevOps and cloud work in Germany. If
                you think I fit, my{' '}
                <Link
                  href={userData.resumeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={inlineLink}
                >
                  CV
                </Link>{' '}
                has the details.
              </div>
            </Reveal>

            <Reveal className={card} index={2}>
              <SectionHeader>Social Links</SectionHeader>
              <div className='mt-2 ml-4'>
                <SocialLink
                  href={userData.socialLinks.twitter}
                  name='Twitter'
                />
                <SocialLink href={userData.socialLinks.github} name='GitHub' />
                <SocialLink
                  href={userData.socialLinks.linkedin}
                  name='LinkedIn'
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
            <Reveal className='space-y-6 mb-12 bg-white/20 dark:bg-black-light/20 rounded-2xl p-8 shadow-lg'>
              {userData.about.description?.map(desc => (
                <p
                  key={desc}
                  className='text-base sm:text-lg md:text-xl text-blue-dark dark:text-gray-light leading-relaxed'
                >
                  {desc}
                </p>
              ))}
            </Reveal>

            <Reveal className='bg-white/20 dark:bg-black-light/20 rounded-2xl p-8 shadow-lg'>
              <h3 className='inline-block px-4 py-2 text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-red-light via-orange-light to-red-dark rounded-xl text-white shadow-lg mb-8'>
                Tech Stack
              </h3>
              <div className='flex flex-row flex-wrap justify-center'>
                <Image
                  alt='My technology skills including AWS, Next.js, Tailwind, Firebase, TypeScript, IntelliJ, VSCode, Docker, Dart, Flutter, and Python'
                  width={400}
                  height={400}
                  src='https://skillicons.dev/icons?i=aws,next,tailwind,firebase,typescript,idea,vscode,docker,dart,flutter,python,&perline=6'
                  className='m-2 sm:m-4 rounded-2xl'
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
