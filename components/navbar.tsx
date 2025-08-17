'use client';

import { transitions } from '@/utils/animations';
import { AnimatePresence, motion } from 'framer-motion';
// import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import userData from 'utils/data';
import { useViewTransitionTheme } from '../hooks/useViewTransitionTheme';

// Simple NavLink component with optimized animations
function NavLink({ href, label }: { href: string; label: string }) {
  const pathName = usePathname();
  const isActive = pathName === href;

  const linkClasses = `relative text-base font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${
    isActive
      ? 'text-hero-font dark:text-blue-light'
      : 'text-blue-dark dark:text-gray-light hover:text-hero-font dark:hover:text-blue-light'
  }`;

  // Static animation variants (no need to memoize)
  const hoverVariant = {
    y: -1,
    transition: transitions.spring,
  };

  const backgroundVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: transitions.bounce,
  };

  const underlineVariant = {
    initial: { opacity: 0, scaleX: 0.3, x: '-50%' },
    animate: { opacity: 1, scaleX: 1, x: '-50%' },
    transition: transitions.bounce,
  };

  return (
    <Link href={href} className='relative group'>
      <motion.span
        className={linkClasses}
        whileHover={hoverVariant}
        whileTap={{ y: 0, transition: { duration: 0.1 } }}
      >
        {/* Background highlight for active state */}
        {isActive && (
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-hero-font/10 to-blue-green/10 dark:from-blue-light/10 dark:to-aero/10 rounded-lg'
            layoutId='navbar-bg'
            initial={backgroundVariant.initial}
            animate={backgroundVariant.animate}
            transition={backgroundVariant.transition}
          />
        )}

        {/* Text content */}
        <span className='relative z-10'>{label}</span>

        {/* Active underline indicator */}
        {isActive && (
          <motion.div
            className='absolute -bottom-0.5 left-1/2 w-4 h-0.5 bg-gradient-to-r from-hero-font to-blue-green rounded-full'
            layoutId='navbar-indicator'
            initial={underlineVariant.initial}
            animate={underlineVariant.animate}
            transition={underlineVariant.transition}
          />
        )}

        {/* Hover underline for inactive items */}
        {!isActive && (
          <motion.div
            className='absolute -bottom-0.5 left-1/2 w-4 h-0.5 bg-gradient-to-r from-hero-font to-blue-green rounded-full opacity-0'
            initial={{ scaleX: 0.3, x: '-50%' }}
            whileHover={{
              opacity: 0.7,
              scaleX: 1,
              transition: transitions.spring,
            }}
          />
        )}
      </motion.span>
    </Link>
  );
}

// Simple theme toggle button component
function ThemeToggle() {
  const { toggleTheme, buttonRef, currentTheme } = useViewTransitionTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
  };

  return (
    <motion.button
      ref={buttonRef}
      aria-label='Toggle Dark Mode'
      type='button'
      className='relative w-10 h-10 p-2 rounded-xl bg-gray-light/50 dark:bg-blue-line/50 backdrop-blur-sm border border-gray-light dark:border-blue-line transition-all duration-300 hover:shadow-lg hover:scale-105'
      onClick={toggleTheme}
      whileHover={buttonVariants.hover}
      whileTap={buttonVariants.tap}
    >
      <AnimatePresence mode='wait'>
        {mounted && (
          <motion.div
            key={currentTheme}
            initial={iconVariants.initial}
            animate={iconVariants.animate}
            exit={iconVariants.exit}
            transition={{ duration: 0.3 }}
            className='absolute inset-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='w-full h-full text-yellow-orange dark:text-yellow-light'
              aria-hidden='true'
            >
              {currentTheme === 'dark' ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                />
              )}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
} // Simple mobile menu button component
function MobileMenuButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const pathVariants = {
    closed: { d: 'M4 6h16M4 12h16M4 18h16' },
    open: { d: 'M6 18L18 6M6 6l12 12' },
  };

  return (
    <motion.button
      type='button'
      className='relative md:hidden w-10 h-10 p-2 rounded-xl bg-gray-light/50 dark:bg-blue-line/50 backdrop-blur-sm border border-gray-light dark:border-blue-line transition-all duration-300'
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label='Toggle mobile menu'
      whileHover={buttonVariants.hover}
      whileTap={buttonVariants.tap}
    >
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        className='absolute inset-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-full h-full text-gray-dark dark:text-gray-light'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <motion.path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            variants={pathVariants}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </motion.div>
    </motion.button>
  );
}

// Simple Navbar component - removing excessive memoization
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  // Static navigation items (no need to memoize)
  const navigationItems = [
    { href: '/aboutme', label: 'About Me' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/contactme', label: 'Contact Me' },
  ];

  // Simple functions (no need to memoize for this use case)
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Simple animation variants (using shared animations)
  const navVariants = {
    // hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const mobileMenuVariants = {
    initial: { opacity: 0, height: 0, scale: 0.95 },
    animate: { opacity: 1, height: 'auto', scale: 1 },
    exit: { opacity: 0, height: 0, scale: 0.95 },
  };

  const mobileItemVariants = {
    initial: { x: -30, opacity: 0, scale: 0.9 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -30, opacity: 0, scale: 0.9 },
  };

  // Simple user data (no need to memoize static data)
  const { name, designation } = userData;

  return (
    <div className='sticky top-0 z-50 p-4'>
      <motion.nav
        className='w-full rounded-2xl shadow-lg backdrop-blur-md border border-white/15 dark:border-white/10 bg-white/60 dark:bg-black-light/35 [@supports(backdrop-filter:blur(0))]:bg-white/50 [@supports(backdrop-filter:blur(0))]:dark:bg-black-light/30'
        initial='hidden'
        animate='visible'
        variants={navVariants}
      >
        <div className='max-w-6xl px-6 py-4 mx-auto'>
          <div className='flex items-center justify-between'>
            {/* Logo / Home */}
            <motion.div variants={itemVariants}>
              <Link href='/' className='group' aria-label='Go to homepage'>
                <motion.div
                  className='flex flex-col'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className='text-xl font-bold bg-gradient-to-r from-blue-dark via-hero-font to-blue-green bg-clip-text text-transparent dark:from-white dark:via-blue-light dark:to-aero transition-all duration-300'>
                    {name}
                  </h1>
                  <p className='text-sm font-medium text-blue-dark dark:text-gray-light group-hover:text-hero-font dark:group-hover:text-blue-light transition-colors duration-300'>
                    {designation}
                  </p>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className='hidden md:flex md:items-center space-x-8'
              variants={itemVariants}
            >
              {navigationItems.map(item => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </motion.div>

            <motion.div
              className='flex items-center space-x-3'
              variants={itemVariants}
            >
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <MobileMenuButton
                isOpen={mobileMenuOpen}
                onToggle={toggleMobileMenu}
              />
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence mode='wait'>
            {mobileMenuOpen && (
              <motion.div
                className='md:hidden mt-4'
                initial={mobileMenuVariants.initial}
                animate={mobileMenuVariants.animate}
                exit={mobileMenuVariants.exit}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <motion.div
                  className='py-4 px-4 bg-white/95 dark:bg-blue-dark/95 backdrop-blur-xl rounded-2xl border border-gray-light/30 dark:border-blue-line/30 shadow-2xl'
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <div className='flex flex-col space-y-2'>
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={mobileItemVariants.initial}
                        animate={mobileItemVariants.animate}
                        exit={mobileItemVariants.exit}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.4,
                          ease: 'easeOut',
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`block text-base py-3 px-4 rounded-xl transition-all duration-200 ${
                            pathName === item.href
                              ? 'text-hero-font dark:text-blue-light font-semibold bg-gradient-to-r from-hero-font/15 to-blue-green/15 border border-hero-font/30 shadow-sm'
                              : 'text-blue-dark dark:text-gray-light font-medium hover:text-hero-font dark:hover:text-blue-light hover:bg-gray-light/40 dark:hover:bg-blue-line/40 hover:scale-[1.02] active:scale-[0.98]'
                          }`}
                          onClick={closeMobileMenu}
                        >
                          <motion.span
                            className='flex items-center'
                            whileHover={{ x: 6 }}
                            whileTap={{ x: 3 }}
                            transition={{
                              duration: 0.15,
                              ease: 'easeOut',
                            }}
                          >
                            {item.label}
                            {pathName === item.href && (
                              <motion.div
                                className='ml-auto w-2 h-2 bg-hero-font dark:bg-blue-light rounded-full'
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                              />
                            )}
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
