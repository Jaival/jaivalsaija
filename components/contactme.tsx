import type { CSSProperties } from 'react';
import ContactForm from '@/components/contactForm';
import { CommandLine, Rows, SectionLabel } from '@/components/pipeline';
import userData from '@/utils/data';
import { siteUrl } from '@/utils/site';

// /contactme: the ways to reach me as rows, the CV, and the form. The form is
// the only client part; everything else renders on the server.

/** Entrance stagger step, in `.animate-enter` units. */
const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

const linkStyle =
  'underline decoration-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:decoration-primary';

// These go to mail or other sites, never to a route, so plain <a>s.
const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function ContactMe() {
  const { email, address, githubUsername, socialLinks, resumeUrl } = userData;
  // 'https://www.linkedin.com/in/jaivalsaija/' → 'in/jaivalsaija'
  const linkedinHandle = new URL(socialLinks.linkedin).pathname.replace(
    /^\/|\/$/g,
    '',
  );

  return (
    <section className='min-h-svh pt-10 md:pt-16 pb-20'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        <div className='animate-enter' style={step(1)}>
          <CommandLine className='mb-1'>$ ping jaival</CommandLine>
          <SectionLabel as='h1'>contact</SectionLabel>
        </div>

        <p
          className='animate-enter text-lg md:text-xl text-foreground leading-relaxed'
          style={step(2)}
        >
          Mail reaches me fastest and I do answer, usually within a day.
          LinkedIn works too if that&apos;s easier for you.
        </p>

        <div className='mt-10 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10'>
          <div className='animate-enter' style={step(3)}>
            <Rows
              labelWidth='6rem'
              rows={[
                {
                  label: 'email',
                  value: (
                    <a href={`mailto:${email}`} className={linkStyle}>
                      {email}
                    </a>
                  ),
                },
                {
                  label: 'linkedin',
                  value: (
                    <a
                      href={socialLinks.linkedin}
                      {...external}
                      className={linkStyle}
                    >
                      {linkedinHandle}
                    </a>
                  ),
                },
                {
                  label: 'github',
                  value: (
                    <a
                      href={socialLinks.github}
                      {...external}
                      className={linkStyle}
                    >
                      {githubUsername}
                    </a>
                  ),
                },
                {
                  label: 'location',
                  value: `${address}, open to relocating`,
                },
              ]}
            />

            {/* Decoration: the button under it is the real download. */}
            <div
              aria-hidden
              className='mt-8 rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm leading-relaxed text-foreground break-words'
            >
              <p>
                <span className='text-primary'>$</span> curl -O{' '}
                {new URL(siteUrl).host}
                {resumeUrl}
              </p>
              <p>
                <span className='text-success'>✓</span> saved cv.pdf · 2 pages
              </p>
            </div>
            {/* A static file, so a plain <a>; Link would try a client route. */}
            <a
              href={resumeUrl}
              download='Jaival_Saija_CV.pdf'
              className='mt-4 inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:bg-primary/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
              Download CV
            </a>
          </div>

          <div className='animate-enter' style={step(4)}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
