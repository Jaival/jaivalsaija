'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { durations, easeOut, spring } from '@/utils/animations';
import { blogPath } from '@/utils/blog/paths';
import { useViewTransitionTheme } from '../hooks/useViewTransitionTheme';

/** Active on the page itself and anything nested under it (/blog/<slug>). */
const isActivePath = (pathName: string, href: string) =>
  pathName === href || pathName.startsWith(`${href}/`);

// Lowercase, like paths in a shell.
const navigationItems = [
  { href: '/aboutme', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/experience', label: 'experience' },
  { href: '/cv', label: 'cv' },
  { href: blogPath, label: 'blog' },
  { href: '/contactme', label: 'contact' },
];

/** The `jaival@saija:~$` prompt that is the logo. */
function Prompt() {
  const punctuation = 'font-normal text-muted-foreground';
  return (
    <span className='font-mono text-base font-bold text-primary'>
      jaival<span className={punctuation}>@</span>saija
      <span className={punctuation}>:~$</span>
    </span>
  );
}

/**
 * Desktop nav link. Hover is colour only — these are hit dozens of times per
 * visit, so anything that moves gets tiring fast. The active underline is the
 * one exception: it slides between items to show where you landed.
 */
function NavLink({ href, label }: { href: string; label: string }) {
  const pathName = usePathname();
  const isActive = isActivePath(pathName, href);

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`relative py-2 font-mono text-sm transition-colors duration-200 ease-out ${
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      }`}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId='navbar-underline'
          transition={spring}
          className='absolute inset-x-0 bottom-1 h-0.5 bg-primary'
        />
      )}
    </Link>
  );
}

const iconClass = 'w-full h-full text-muted-foreground';

const SunIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    className={iconClass}
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    className={iconClass}
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    />
  </svg>
);

const squareButton =
  'relative size-10 p-2 rounded-md border border-border transition-[background-color,transform] duration-200 ease-out hover:bg-muted active:scale-[0.94]';

function ThemeToggle() {
  const { toggleTheme, buttonRef } = useViewTransitionTheme();

  return (
    <button
      ref={buttonRef}
      aria-label='Toggle Dark Mode'
      type='button'
      className={squareButton}
      onClick={toggleTheme}
    >
      {/* Both icons are in the DOM; the theme class crossfades between
          them. Doing this in CSS means the correct icon is painted on the
          server, with no post-hydration flash. */}
      <span className='absolute inset-2 block transition-[opacity,transform,filter] duration-200 ease-out opacity-0 scale-75 blur-[3px] dark:opacity-100 dark:scale-100 dark:blur-none'>
        <SunIcon />
      </span>
      <span className='absolute inset-2 block transition-[opacity,transform,filter] duration-200 ease-out opacity-100 scale-100 blur-none dark:opacity-0 dark:scale-75 dark:blur-[3px]'>
        <MoonIcon />
      </span>
    </button>
  );
}

function MobileMenuButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type='button'
      className={`${squareButton} md:hidden`}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label='Toggle mobile menu'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute inset-2 w-6 h-6 text-muted-foreground'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        aria-hidden='true'
      >
        {/* The path itself is the state: bars morph into the X. The static
            `d` is what renders on the server; framer takes over after that. */}
        <motion.path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 6h16M4 12h16M4 18h16'
          initial={false}
          animate={{
            d: isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16',
          }}
          transition={{ duration: durations.fast, ease: easeOut }}
        />
      </svg>
    </button>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  // Close on route change — the menu must never outlive the page it opened on.
  // Adjusted during render rather than in an effect, so the menu is already
  // gone in the same commit that paints the new route.
  const [renderedPath, setRenderedPath] = useState(pathName);
  if (renderedPath !== pathName) {
    setRenderedPath(pathName);
    setMobileMenuOpen(false);
  }

  // Escape closes it, like every other dismissible overlay.
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    // Chrome seen on every page view: no entrance animation. A flat bar with
    // a rule under it, like the top of a terminal window.
    <div className='sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md reduced-transparency:bg-background reduced-transparency:backdrop-blur-none'>
      <nav aria-label='Main' className='relative'>
        <div className='flex items-center justify-between gap-4 max-w-4xl px-4 md:px-8 py-3 mx-auto'>
          <Link href='/' aria-label='Jaival Saija, home' className='rounded-sm'>
            <Prompt />
          </Link>

          <div className='flex items-center gap-6'>
            <div className='hidden md:flex md:items-center gap-5 lg:gap-6'>
              {navigationItems.map(item => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </div>

            <div className='flex items-center gap-3'>
              <ThemeToggle />
              <MobileMenuButton
                isOpen={mobileMenuOpen}
                onToggle={() => setMobileMenuOpen(open => !open)}
              />
            </div>
          </div>
        </div>

        {/* Mobile menu: absolutely positioned so opening it never pushes the
            page down, and scaled from the top-right so it reads as coming out
            of the button that opened it. Same lowercase mono links as the
            desktop bar, active one underlined. */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className='md:hidden absolute left-4 right-4 top-full mt-2 origin-top-right'
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: durations.fast, ease: easeOut }}
            >
              <div className='flex flex-col p-2 bg-popover rounded-lg border border-border shadow-xl'>
                {navigationItems.map((item, index) => {
                  const isActive = isActivePath(pathName, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: durations.fast,
                        ease: easeOut,
                        delay: index * 0.03,
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex py-3 px-3 rounded-md font-mono text-base transition-[color,background-color,transform] duration-200 ease-out active:scale-[0.98] ${
                          isActive
                            ? 'text-primary underline decoration-2 underline-offset-[6px]'
                            : 'text-muted-foreground hover:text-primary hover:bg-muted'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
