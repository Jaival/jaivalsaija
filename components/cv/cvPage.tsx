import Image from 'next/image';
import Link from 'next/link';
import { JetBrains_Mono } from 'next/font/google';
import type { CSSProperties, ReactNode } from 'react';
import Reveal from '@/components/Reveal';
import { cv, type CvEntry } from '@/utils/cv';
import CvDownload from './cvDownload';

// The CV as a page of the site, laid out like the "A · Pipeline" PDF: an
// engineer's terminal, with lowercase mono section labels and an
// accent timeline beside the jobs. The words come from utils/cv.ts, the same
// data components/cv/cvPdfPipeline.tsx renders to the PDF this page offers.

// Only this page uses the mono accent, so it loads here, not in the layout.
const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cv-mono',
});

const mono = 'font-(family-name:--font-cv-mono)';

const link =
  'underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary';

const bullets =
  'mt-2 space-y-1.5 list-disc pl-5 marker:text-primary leading-relaxed';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='mt-12'>
      <h2
        className={`${mono} mb-5 flex items-center gap-3 text-sm font-bold tracking-wide text-primary`}
      >
        <span className='whitespace-nowrap'>{title}</span>
        <span aria-hidden className='h-px flex-1 bg-border' />
      </h2>
      {children}
    </section>
  );
}

/** The title and org, with the date at the right edge on wide screens. */
function TitleLine({
  title,
  org,
  dates,
}: {
  title: string;
  org: string;
  dates: string;
}) {
  return (
    <div className='flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between'>
      <h3 className='text-lg text-foreground'>
        <span className='font-semibold'>{title}</span>{' '}
        <span className='text-muted-foreground'>· {org}</span>
      </h3>
      <p
        className={`${mono} shrink-0 text-sm whitespace-nowrap text-muted-foreground`}
      >
        {dates}
      </p>
    </div>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  // A job sits on the accent timeline; a gap or a degree does not.
  const job = entry.bullets.length > 0;
  return (
    <article className={job ? 'border-l-2 border-primary pl-4 md:pl-5' : ''}>
      <TitleLine title={entry.title} org={entry.org} dates={entry.dates} />
      {entry.context && (
        <p className='mt-1 italic text-muted-foreground leading-relaxed'>
          {entry.context}
        </p>
      )}
      {entry.details && (
        <p className='mt-1 text-foreground leading-relaxed'>{entry.details}</p>
      )}
      {job && (
        <ul className={bullets}>
          {entry.bullets.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function CvPage() {
  const [site, ...profiles] = cv.links;

  return (
    <section
      className={`${jetBrainsMono.variable} min-h-svh pt-10 md:pt-16 pb-20`}
    >
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        {/* Above the fold: CSS entrance, visible before hydration. */}
        <header
          className='animate-enter flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between'
          style={{ '--stagger': 1 } as CSSProperties}
        >
          <div className='min-w-0'>
            <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
              {cv.name}
            </h1>
            <p
              className={`${mono} mt-2 text-sm md:text-base font-medium text-primary break-words`}
            >
              {cv.tagline}
            </p>
            <div className='mt-4 space-y-1 text-muted-foreground'>
              <p>
                {cv.location} ·{' '}
                <a
                  href={`tel:${cv.phone.replaceAll(' ', '')}`}
                  className={link}
                >
                  {cv.phone}
                </a>{' '}
                ·{' '}
                <a href={`mailto:${cv.email}`} className={link}>
                  {cv.email}
                </a>
              </p>
              <p>
                {[site, ...profiles].map((item, i) => (
                  <span key={item.href}>
                    {i > 0 && ' · '}
                    <a
                      href={item.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={link}
                    >
                      {item.label}
                    </a>
                  </span>
                ))}
              </p>
              <p>{cv.status}</p>
            </div>
          </div>

          <Image
            src={cv.photo}
            alt={`Photo of ${cv.name}`}
            width={144}
            height={144}
            sizes='144px'
            priority
            className='size-28 md:size-36 shrink-0 rounded-xl object-cover shadow-md'
          />
        </header>

        <div
          className='animate-enter mt-6 flex flex-col gap-3 sm:flex-row'
          style={{ '--stagger': 2 } as CSSProperties}
        >
          <CvDownload />
          <Link
            href='/contactme'
            className='inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          >
            Contact me
          </Link>
        </div>

        <Section title='profile'>
          <Reveal>
            <p className='text-foreground leading-relaxed'>{cv.profile}</p>
          </Reveal>
        </Section>

        <Section title='skills'>
          <Reveal>
            <dl className='grid gap-x-6 gap-y-2 sm:grid-cols-[11rem_minmax(0,1fr)]'>
              {cv.skills.map(skill => (
                <div key={skill.label} className='contents'>
                  <dt
                    className={`${mono} pt-0.5 text-sm font-medium text-primary`}
                  >
                    {skill.label}
                  </dt>
                  <dd className='mb-2 text-foreground sm:mb-0'>
                    {skill.value}
                    {skill.learning && (
                      <span className='text-muted-foreground'>
                        {' '}
                        · learning: {skill.learning}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        <Section title='education'>
          <div className='space-y-5'>
            {cv.education.map(entry => (
              <Reveal key={entry.title}>
                <Entry entry={entry} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section title='experience'>
          <div className='space-y-5'>
            {cv.experience.map(entry => (
              <Reveal key={entry.title + entry.dates}>
                <Entry entry={entry} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section title='projects'>
          <div className='space-y-6'>
            {cv.projects.map(project => (
              <Reveal key={project.name}>
                <article>
                  <TitleLine
                    title={project.name}
                    org={project.stack.join(', ')}
                    dates={project.dates}
                  />
                  <a
                    href={project.link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${mono} ${link} text-sm text-muted-foreground`}
                  >
                    {project.link.label}
                  </a>
                  <p className='mt-1.5 text-foreground leading-relaxed'>
                    {project.text}
                  </p>
                </article>
              </Reveal>
            ))}
            <Reveal>
              <p className='text-foreground leading-relaxed'>
                {cv.moreProjects.text} ·{' '}
                <a
                  href={cv.moreProjects.link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={link}
                >
                  {cv.moreProjects.link.label}
                </a>
              </p>
            </Reveal>
          </div>
        </Section>

        <Section title='certifications'>
          <Reveal>
            <ul className={`${bullets} text-foreground`}>
              {cv.certifications.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </div>
    </section>
  );
}
