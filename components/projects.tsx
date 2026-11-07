import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import Reveal from '@/components/Reveal';
import {
  BareUrl,
  CommandLine,
  SectionLabel,
  Timeline,
  TitleLine,
} from '@/components/pipeline';
import userData, { type Project } from '@/utils/data';

// /projects: the hand-picked projects as rows on the accent timeline. Each row
// has the stack and dates on the title line, the repo link, what it does and
// how it ships; a project with an image gets a small thumbnail at the right.

/** Rows painted at load get the CSS entrance; the rest reveal on scroll. */
const aboveFold = 2;

const linkStyle =
  'font-mono text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary';

function ProjectRow({ project }: { project: Project }) {
  const {
    title,
    dates,
    stack,
    description,
    imgUrl,
    githubUrl,
    websiteUrl,
    websiteLabel = 'Live site',
    ships,
  } = project;

  return (
    <Timeline>
      <TitleLine title={title} org={stack.join(', ')} dates={dates} />
      {(githubUrl || websiteUrl) && (
        <p className='mt-1 flex flex-wrap items-baseline gap-x-2'>
          {githubUrl && (
            <a
              href={githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={linkStyle}
            >
              <BareUrl url={githubUrl} />
            </a>
          )}
          {githubUrl && websiteUrl && (
            <span aria-hidden className='text-muted-foreground'>
              ·
            </span>
          )}
          {websiteUrl && (
            <Link
              href={websiteUrl}
              // Internal paths (the setup guide) stay in the tab.
              {...(websiteUrl.startsWith('http') && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className={`${linkStyle} lowercase`}
              aria-label={`${title}: ${websiteLabel}`}
            >
              {websiteLabel}
            </Link>
          )}
        </p>
      )}
      {/* The thumbnail sits beside the text, below the title line, so it
          never squeezes the stack or the date. */}
      <div className='mt-2 flex gap-4 md:gap-6'>
        <div className='min-w-0 flex-1'>
          <p className='text-foreground leading-relaxed'>{description}</p>
          {ships && (
            <p className='mt-2 leading-relaxed text-muted-foreground'>
              <span className='mr-2 font-mono text-sm font-medium text-primary'>
                ships:
              </span>
              {ships}
            </p>
          )}
        </div>
        {imgUrl && (
          <div className='relative mt-1.5 hidden h-20 w-32 shrink-0 overflow-hidden rounded-md border border-border bg-muted sm:block md:h-24 md:w-40'>
            <Image
              src={imgUrl}
              alt={`${title} screenshot`}
              fill
              className='object-cover object-top'
              sizes='160px'
            />
          </div>
        )}
      </div>
    </Timeline>
  );
}

export default function Projects() {
  const { projects, githubUsername } = userData;

  return (
    <section className='min-h-svh pt-10 md:pt-16 pb-20'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        <div
          className='animate-enter'
          style={{ '--stagger': 1 } as CSSProperties}
        >
          <CommandLine className='mb-1'>
            $ ls ~/projects --sort=devops
          </CommandLine>
          <SectionLabel as='h1' count={projects.length}>
            projects
          </SectionLabel>
        </div>

        <div className='space-y-8'>
          {projects.map((project, i) =>
            i < aboveFold ? (
              // Painted before hydration; a Reveal here would ship at opacity 0.
              <div
                key={project.title}
                className='animate-enter'
                style={{ '--stagger': 2 + i } as CSSProperties}
              >
                <ProjectRow project={project} />
              </div>
            ) : (
              <Reveal key={project.title}>
                <ProjectRow project={project} />
              </Reveal>
            ),
          )}
        </div>

        <Reveal>
          <a
            href={`https://github.com/${githubUsername}`}
            target='_blank'
            rel='noopener noreferrer'
            className={`${linkStyle} mt-10 inline-block`}
          >
            more on github.com/{githubUsername} <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
