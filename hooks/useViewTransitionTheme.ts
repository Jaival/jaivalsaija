'use client';

import { useTheme } from 'next-themes';
import { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';

export function useViewTransitionTheme() {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    const targetTheme = theme === 'dark' ? 'light' : 'dark';

    // Check if View Transition API is supported and user doesn't prefer reduced motion
    if (
      !buttonRef.current ||
      !(document as any).startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // Fallback: just change theme without animation
      setTheme(targetTheme);
      return;
    }

    // Verify we have the correct button
    const button = buttonRef.current;
    if (!button || button.getAttribute('aria-label') !== 'Toggle Dark Mode') {
      console.warn('Button ref is not pointing to the theme toggle button');
      setTheme(targetTheme);
      return;
    }

    // Force a reflow to ensure accurate positioning
    button.offsetHeight;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Debug logging
    console.log('Theme button position:', {
      x,
      y,
      rect,
      ariaLabel: button.getAttribute('aria-label'),
      className: button.className,
    });

    // Calculate maximum radius to cover entire viewport from button position
    const maxRadius = Math.hypot(
      Math.max(rect.left, window.innerWidth - rect.left),
      Math.max(rect.top, window.innerHeight - rect.top),
    );

    // Start the view transition
    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(targetTheme);
      });
    });

    // Wait for the transition to be ready, then animate
    await transition.ready;

    // Animate the circular clip-path from button position
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }, [theme, setTheme]);

  return {
    toggleTheme,
    buttonRef,
    currentTheme: theme,
  };
}
