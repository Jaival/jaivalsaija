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

    // Start the view transition
    await (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(targetTheme);
      });
    }).ready;

    // Get button position for circular animation origin
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    // Calculate maximum radius to cover entire viewport
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

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
