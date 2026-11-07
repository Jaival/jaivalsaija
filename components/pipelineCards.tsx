import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionLabel } from '@/components/pipeline';
import userData from '@/utils/data';

const SHOWN = 3;

/**
 * Home "pipelines": the first projects of /projects as cards, each with the
 * badge set by hand in utils/data.ts (CI passing, a release, in progress).
 * Reorder the projects there and home follows. On a desktop the cards are in
 * the first screen, so they enter with CSS, not a scroll reveal.
 */
export default function PipelineCards() {
  const projects = userData.projects.slice(0, SHOWN);
  return (
    <section className='mt-12'>
      <SectionLabel>pipelines</SectionLabel>
      <ul className='grid gap-3 sm:grid-cols-3'>
        {projects.map((project, i) => (
          <li
            key={project.title}
            className='animate-enter'
            style={{ '--stagger': 5 + i } as CSSProperties}
          >
            <a
              href={project.githubUrl ?? '/projects'}
              target={project.githubUrl ? '_blank' : undefined}
              rel={project.githubUrl ? 'noopener noreferrer' : undefined}
              className='group block h-full rounded-lg border border-border bg-card p-4 transition-colors duration-200 ease-out hover:border-primary focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
              {project.status && (
                <p
                  className={`font-mono text-sm ${project.status.state === 'ok' ? 'text-success' : 'text-muted-foreground'}`}
                >
                  <span aria-hidden>
                    {project.status.state === 'ok' ? '✓ ' : '◌ '}
                  </span>
                  {project.status.label}
                </p>
              )}
              <h3 className='mt-1 text-lg font-semibold text-foreground transition-colors duration-200 ease-out group-hover:text-primary'>
                {project.title}
              </h3>
              <p className='text-sm text-muted-foreground'>
                {project.stack.slice(0, 3).join(' · ')}
              </p>
            </a>
          </li>
        ))}
      </ul>
      <Link
        href='/projects'
        className='mt-3 inline-block font-mono text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary'
      >
        all projects <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
