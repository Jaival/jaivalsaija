import userData from 'utils/data';

// Contact routes on every page, so the CV is never more than one click away.
// LinkedIn and GitHub first: they're what recruiters check.
const footerLinks = [
  { label: 'email', href: `mailto:${userData.email}` },
  { label: 'linkedin', href: userData.socialLinks.linkedin, external: true },
  { label: 'github', href: userData.socialLinks.github, external: true },
  // The page, not the file: it has the download button, and reads on a phone.
  { label: 'cv', href: '/cv' },
];

const dot = <span aria-hidden>·</span>;

/** One mono line, `·` separated, under a rule. */
export default function Footer() {
  return (
    <footer className='border-t border-border'>
      <div className='max-w-4xl px-4 md:px-8 py-8 mx-auto'>
        <nav aria-label='Contact'>
          <ul className='flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted-foreground'>
            <li>© {new Date().getFullYear()} Jaival Saija</li>
            {footerLinks.map(({ label, href, external }) => (
              <li key={label} className='flex items-center gap-x-3'>
                {dot}
                <a
                  href={href}
                  {...(external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  className='underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 ease-out hover:text-primary hover:decoration-primary'
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
