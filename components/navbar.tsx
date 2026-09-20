'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import userData from 'utils/data';
import { durations, easeOut, spring } from '@/utils/animations';
import { useViewTransitionTheme } from '../hooks/useViewTransitionTheme';

const navigationItems = [
  { href: '/aboutme', label: 'About Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/contactme', label: 'Contact Me' },
];

/**
 * Desktop nav link. Hover is colour only — these are hit dozens of times per
 * visit, so anything that moves gets tiring fast. The active pill is the one
 * exception: it slides between items to show where you landed.
 */
function NavLink({ href, label }: { href: string; label: string }) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`relative px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ease-out ${
        isActive
          ? 'text-hero-font dark:text-blue-light'
          : 'text-blue-dark dark:text-gray-light hover:text-hero-font dark:hover:text-blue-light'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId='navbar-pill'
          transition={spring}
          className='absolute inset-0 rounded-lg bg-gradient-to-r from-hero-font/10 to-blue-green/10 dark:from-blue-light/10 dark:to-aero/10'
        />
      )}
      <span className='relative z-10'>{label}</span>
    </Link>
  );
}

const iconClass = 'w-full h-full text-yellow-orange dark:text-yellow-light';

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

function ThemeToggle() {
  const { toggleTheme, buttonRef } = useViewTransitionTheme();

  return (
    <button
      ref={buttonRef}
      aria-label='Toggle Dark Mode'
      type='button'
      className='relative w-10 h-10 p-2 rounded-xl bg-gray-light/50 dark:bg-blue-line/50 backdrop-blur-sm border border-gray-light dark:border-blue-line transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:shadow-lg active:scale-[0.94] reduced-transparency:backdrop-blur-none'
      onClick={toggleTheme}
    >
      {/* Both icons are in the DOM; the theme class crossfades between
          them. Doing this in CSS means the correct icon is painted on the
          server, with no post-hydration flash. */}
      <span className='absolute inset-2 block transition-[opacity,transform,filter] duration-200 ease-out opacity-0 scale-75 blur-[3px] dark:opacity-100 dark:scale-100 dark:blur-0'>
        <SunIcon />
      </span>
      <span className='absolute inset-2 block transition-[opacity,transform,filter] duration-200 ease-out opacity-100 scale-100 blur-0 dark:opacity-0 dark:scale-75 dark:blur-[3px]'>
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
      className='relative md:hidden w-10 h-10 p-2 rounded-xl bg-gray-light/50 dark:bg-blue-line/50 backdrop-blur-sm border border-gray-light dark:border-blue-line transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.94] reduced-transparency:backdrop-blur-none'
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label='Toggle mobile menu'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute inset-2 w-6 h-6 text-gray-dark dark:text-gray-light'
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
  const { name, designation } = userData;

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
    // Chrome seen on every page view: no entrance animation.
    <div className='sticky top-0 z-50 p-4'>
      <nav className='relative w-full rounded-2xl shadow-lg backdrop-blur-md border border-white/15 dark:border-white/10 bg-white/60 dark:bg-black-light/35 reduced-transparency:bg-white reduced-transparency:backdrop-blur-none dark:reduced-transparency:bg-black-light'>
        <div className='max-w-6xl px-6 py-4 mx-auto'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='group' aria-label='Go to homepage'>
              <div className='flex flex-col'>
                <span className='text-xl font-bold tracking-tight bg-gradient-to-r from-blue-dark via-hero-font to-blue-green bg-clip-text text-transparent dark:from-white dark:via-blue-light dark:to-aero'>
                  {name}
                </span>
                <span className='text-sm font-medium text-blue-dark dark:text-gray-light group-hover:text-hero-font dark:group-hover:text-blue-light transition-colors duration-200 ease-out'>
                  {designation}
                </span>
              </div>
            </Link>

            <div className='hidden md:flex md:items-center space-x-8'>
              {navigationItems.map(item => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </div>

            <div className='flex items-center space-x-3'>
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
            of the button that opened it. */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className='md:hidden absolute left-4 right-4 top-full mt-2 origin-top-right'
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: durations.fast, ease: easeOut }}
            >
              <div className='py-4 px-4 bg-white/95 dark:bg-blue-dark/95 backdrop-blur-xl rounded-2xl border border-gray-light/30 dark:border-blue-line/30 shadow-2xl reduced-transparency:bg-white reduced-transparency:backdrop-blur-none dark:reduced-transparency:bg-blue-dark'>
                <div className='flex flex-col space-y-2'>
                  {navigationItems.map((item, index) => (
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
                        aria-current={
                          pathName === item.href ? 'page' : undefined
                        }
                        className={`flex items-center text-base py-3 px-4 rounded-xl transition-[color,background-color,transform] duration-200 ease-out active:scale-[0.98] ${
                          pathName === item.href
                            ? 'text-hero-font dark:text-blue-light font-semibold bg-gradient-to-r from-hero-font/15 to-blue-green/15 border border-hero-font/30'
                            : 'text-blue-dark dark:text-gray-light font-medium hover:text-hero-font dark:hover:text-blue-light hover:bg-gray-light/40 dark:hover:bg-blue-line/40'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                        {pathName === item.href && (
                          <span className='ml-auto size-2 rounded-full bg-hero-font dark:bg-blue-light' />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
