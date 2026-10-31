import userData from 'utils/data';

// Contact routes on every page, so the CV is never more than one click away.
// LinkedIn and GitHub first: they're what recruiters check.
const footerLinks = [
  { label: 'Email', href: `mailto:${userData.email}` },
  { label: 'LinkedIn', href: userData.socialLinks.linkedin, external: true },
  { label: 'GitHub', href: userData.socialLinks.github, external: true },
  // The page, not the file: it has the download button, and reads on a phone.
  { label: 'CV', href: '/cv' },
];

export default function Footer() {
  return (
    <footer>
      <div className='max-w-6xl px-4 py-12 mx-auto md:py-20'>
        {/* Decorative line */}
        <div className='h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8' />

        <nav aria-label='Contact' className='mb-6'>
          <ul className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base'>
            {footerLinks.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  className='font-medium text-primary border-b border-transparent hover:border-primary transition-colors duration-200 ease-out'
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex flex-wrap items-center justify-center text-base text-muted-foreground'>
          <span className='mr-2'>© {new Date().getFullYear()}.</span>

          <div className='group mr-2'>
            <span className='relative inline-block'>
              <span className='font-semibold text-primary cursor-default'>
                Jaival Saija.
              </span>
              {/* Sliding underline — hover feedback, so it stays. */}
              <span className='absolute left-0 bottom-0 w-full h-0.5 bg-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left' />
            </span>
          </div>

          <span>All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
