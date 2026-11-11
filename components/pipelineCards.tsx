import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SectionLabel } from '@/components/pipeline';
import { getBlog } from '@/utils/blog';
import userData from '@/utils/data';

const SHOWN = 3;

/**
 * Home "pipelines": the first projects of /projects as cards, each with a
 * badge: the newest release from the blog for a project with a releaseSeries,
 * else the one set by hand in utils/data.ts.
 * Reorder the projects there and home follows. On a desktop the cards are in
 * the first screen, so they enter with CSS, not a scroll reveal.
 */
export default async function PipelineCards() {
  const blog = await getBlog();
  const projects = userData.projects.slice(0, SHOWN).map(project => {
    // Parts are oldest first, so the last one with a release is the newest.
    const release =
      project.releaseSeries &&
      blog.series(project.releaseSeries).findLast(part => part.release)
        ?.release;
    return {
      ...project,
      status: release
        ? { label: `v${release} released`, state: 'ok' as const }
        : project.status,
    };
  });
  return (
    <section className='mt-12'>
      <SectionLabel>pipelines</SectionLabel>
      <ul className='grid gap-3 sm:grid-cols-3'>
        {projects.map((project, i) => (
          <li
            key={project.title}
            className='animate-enter'
            style={{ '--stagger': 6 + i } as CSSProperties}
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
