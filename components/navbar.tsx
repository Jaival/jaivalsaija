'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import userData from '../data/data';

// NavLink component to avoid repetition
const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link href={href}>
      <span
        className={`
          text-base transition-colors duration-200
          ${
            isActive
              ? 'text-purple-dark font-bold dark:text-silver'
              : 'text-purple-dark dark:text-silver font-normal hover:text-gray-dark dark:hover:text-gray-light'
          }
        `}
      >
        {label}
        {isActive && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="inline-block w-3 h-3 ml-1 bi bi-arrow-down"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
            />
          </svg>
        )}
      </span>
    </Link>
  );
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items to avoid repetition
  const navigationItems = [
    { href: '/aboutme', label: 'About Me' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/contactme', label: 'Contact Me' },
  ];

  return (
    <nav className="max-w-6xl px-4 py-6 mx-auto sm:py-10 md:py-20">
      <div className="flex items-center justify-between md:flex-row">
        {/* Logo / Home */}
        <Link href="/" className="flex flex-col">
          <h1 className="text-xl font-semibold text-black-dark dark:text-silver transition-colors">
            {userData.name}
          </h1>
          <p className="text-base font-light text-black-dark dark:text-silver transition-colors">
            {userData.designation}
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center space-x-8">
          {navigationItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 rounded-md focus:outline-hidden transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-yellow-light dark:text-orange-dark"
                aria-hidden="true"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
          {/* TODO: Update to use lucide*/}
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="p-2 md:hidden rounded-md text-purple-dark dark:text-silver"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-3 px-4 bg-gray-dark dark:bg-gray-light rounded-lg shadow-lg transition-all">
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base py-2 px-3 rounded-md transition-colors ${
                  pathName === item.href
                    ? 'text-purple-dark dark:text-silver font-bold bg-gray-dark dark:bg-gray-light'
                    : 'text-purple-dark dark:text-silver font-normal hover:bg-gray-dark dark:hover:bg-gray-light'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
