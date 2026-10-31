import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { ArrowUpRight, Check, Mail, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { cv, yearSpan, type CvEntry, type CvLanguage } from '@/utils/cv';
import CvDownload from './cvDownload';

// The CV as a page of the site. The words come from utils/cv.ts, the same
// data components/cv/cvPdf.tsx renders to the PDF this page offers.

/** Not clickable, so no hover lift. */
const card =
  'relative p-6 md:p-7 bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl border border-border';

const chip =
  'inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm text-foreground';

const linkChip = `${chip} transition-colors duration-200 ease-out hover:border-primary hover:text-primary`;

const bullets =
  'space-y-2 list-disc pl-5 marker:text-primary text-foreground leading-relaxed';

const barWidth: Record<CvLanguage['level'], string> = {
  A1: '18%',
  A2: '30%',
  B1: '48%',
  B2: '65%',
  C1: '85%',
  C2: '95%',
  Native: '100%',
};

/** Turns `**bold**` in the CV strings into <strong>. */
function rich(text: string): ReactNode {
  return text
    .split('**')
    .map((part, i) =>
      i % 2 ? (
        <strong key={i}>{part}</strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

function YearBadge({ children }: { children: ReactNode }) {
  return (
    <span className='absolute top-5 right-5 rounded-lg bg-gradient-to-r from-brand-from to-brand-to px-2.5 py-1 text-sm font-bold text-primary-foreground shadow-md'>
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='mb-12'>
      <h2 className='flex items-center gap-3 mb-6 text-2xl md:text-3xl font-bold tracking-tight text-foreground'>
        <span
          aria-hidden
          className='h-1 w-7 rounded-full bg-gradient-to-r from-brand-from to-brand-to'
        />
        {title}
      </h2>
      <div className='space-y-4'>{children}</div>
    </section>
  );
}

function EntryCard({ entry }: { entry: CvEntry }) {
  // An entry without a role explains time between jobs: a note, not a job.
  if (!entry.role) {
    return (
      <div className='px-6 py-4 md:px-7 rounded-2xl border-2 border-dashed border-border'>
        <h3 className='text-lg font-bold tracking-tight text-foreground'>
          {entry.org}{' '}
          <span className='font-normal text-muted-foreground'>
            · {entry.dates}
          </span>
        </h3>
      </div>
    );
  }

  return (
    <article className={card}>
      <YearBadge>{yearSpan(entry.dates)}</YearBadge>
      <h3 className='pr-24 text-xl md:text-2xl font-bold tracking-tight text-card-foreground'>
        {entry.org}{' '}
        {entry.place && (
          <span className='font-normal text-muted-foreground'>
            · {entry.place}
          </span>
        )}
      </h3>
      <p className='mt-1 font-semibold text-primary'>{entry.role}</p>
      <p className='text-sm text-muted-foreground'>{entry.dates}</p>
      {entry.bullets.length > 0 && (
        <ul className={`${bullets} mt-4`}>
          {entry.bullets.map(item => (
            <li key={item}>{rich(item)}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function CvPage() {
  const [, ...profiles] = cv.links; // the first link is this site

  return (
    <section className='min-h-svh'>
      <PageHeader title='CV' />

      <div className='max-w-6xl mx-auto px-4 md:px-8 pb-16'>
        {/* Above the fold: CSS entrance, visible before hydration. */}
        <div
          className={`${card} animate-enter flex flex-col md:flex-row md:items-center gap-6 md:gap-8`}
          style={{ '--stagger': 1 } as CSSProperties}
        >
          <Image
            src={cv.photo}
            alt={`Photo of ${cv.name}`}
            width={150}
            height={150}
            sizes='150px'
            priority
            className='size-28 md:size-36 shrink-0 rounded-2xl object-cover ring-2 ring-primary ring-offset-4 ring-offset-background'
          />

          <div className='min-w-0'>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-card-foreground'>
              {cv.name}
            </h2>
            <p className='mt-1 mb-4 text-lg font-semibold text-primary'>
              {cv.headline.replaceAll(' | ', ' · ')}
            </p>
            <div className='flex flex-wrap gap-2.5'>
              <span className={chip}>
                <MapPin aria-hidden className='size-4' />
                {cv.location}
              </span>
              <a href={`mailto:${cv.email}`} className={linkChip}>
                <Mail aria-hidden className='size-4' />
                {cv.email}
              </a>
              {profiles.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={linkChip}
                >
                  {link.label}
                </a>
              ))}
              <span className='inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/15 px-3.5 py-1.5 text-sm text-success'>
                <Check aria-hidden className='size-4 shrink-0' />
                {cv.permit}
              </span>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row md:flex-col gap-3 md:ml-auto md:min-w-52'>
            <CvDownload />
            <Link
              href='/contactme'
              className='sm:self-end md:self-auto inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
              Contact me
            </Link>
          </div>
        </div>

        <div className='mt-14 grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_21rem]'>
          <div>
            <Section title='Projects'>
              {cv.projects.map((project, i) => (
                <Reveal key={project.name} index={i}>
                  <article className={card}>
                    <YearBadge>{project.year}</YearBadge>
                    <h3 className='pr-20 text-xl md:text-2xl font-bold tracking-tight text-card-foreground'>
                      {project.name}{' '}
                      <span className='font-normal text-muted-foreground'>
                        · {project.tagline}
                      </span>
                    </h3>
                    <div className='mt-3 flex flex-wrap items-center gap-2'>
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className='rounded-md bg-muted px-2 py-0.5 text-sm text-foreground'
                        >
                          {tech}
                        </span>
                      ))}
                      <a
                        href={project.link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-0.5 text-sm font-semibold text-primary border-b border-transparent hover:border-primary transition-colors duration-200 ease-out'
                      >
                        {project.link.label}
                        <ArrowUpRight aria-hidden className='size-4' />
                      </a>
                    </div>
                    <ul className={`${bullets} mt-4`}>
                      {project.bullets.map(item => (
                        <li key={item}>{rich(item)}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </Section>

            <Section title='Experience'>
              {cv.experience.map(entry => (
                <Reveal key={entry.org + entry.dates}>
                  <EntryCard entry={entry} />
                </Reveal>
              ))}
            </Section>

            <Section title='Education'>
              {cv.education.map(entry => (
                <Reveal key={entry.org + entry.dates}>
                  <EntryCard entry={entry} />
                </Reveal>
              ))}
            </Section>

            <Section title='Certifications'>
              <Reveal>
                <div className={card}>
                  <ul className={bullets}>
                    {cv.certifications.map(item => (
                      <li key={item}>{rich(item)}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </Section>
          </div>

          <aside>
            <Section title='Skills'>
              <Reveal>
                <div className={`${card} space-y-5`}>
                  {cv.skills.map(skill => (
                    <div key={skill.title}>
                      <h3 className='font-semibold text-card-foreground'>
                        {skill.title}
                      </h3>
                      {skill.points.map(point => (
                        <p
                          key={point}
                          className='mt-1 text-muted-foreground leading-relaxed'
                        >
                          {point}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </Reveal>
            </Section>

            <Section title='Tech stack'>
              <Reveal>
                <div className={`${card} space-y-4`}>
                  {cv.proficiency.map(group => (
                    <div key={group.label}>
                      <h3 className='mb-2 text-xs font-bold uppercase tracking-wider text-primary'>
                        {group.label}
                      </h3>
                      <div className='flex flex-wrap gap-1.5'>
                        {group.items.map(item => (
                          <span
                            key={item}
                            className={
                              // Started, not yet a skill: dashed, like the
                              // gap entry in Experience.
                              group.label === 'Learning'
                                ? 'rounded-full border border-dashed border-border px-3 py-1 text-sm text-muted-foreground'
                                : 'rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground'
                            }
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Section>

            <Section title='Languages'>
              <Reveal>
                <div className={`${card} space-y-4`}>
                  {cv.languages.map(language => (
                    <div key={language.name}>
                      <p className='font-semibold text-card-foreground'>
                        {language.name}
                      </p>
                      <p className='mb-2 text-sm text-muted-foreground'>
                        {language.text}
                      </p>
                      <div className='h-1.5 rounded-full bg-muted overflow-hidden'>
                        <div
                          className='h-full rounded-full bg-gradient-to-r from-brand-from to-brand-to'
                          style={{ width: barWidth[language.level] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Section>

            <Section title='Leadership'>
              <Reveal>
                <div className={`${card} space-y-4`}>
                  {cv.leadership.map(item => (
                    <div key={item.title}>
                      <h3 className='font-semibold text-card-foreground'>
                        {item.title}
                      </h3>
                      <p className='mt-1 text-muted-foreground leading-relaxed'>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Section>
          </aside>
        </div>
      </div>
    </section>
  );
}
