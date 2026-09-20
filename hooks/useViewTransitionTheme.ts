'use client';

import { useTheme } from 'next-themes';
import { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';

/** Matches --ease-in-out in globals.css: on-screen movement. */
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';

/** Keeps the mobile browser chrome in step with a manual theme change. */
function syncThemeColor(theme: 'light' | 'dark') {
  const color = theme === 'dark' ? '#020618' : '#ffffff';
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach(meta => {
      meta.removeAttribute('media');
      meta.content = color;
    });
}

export function useViewTransitionTheme() {
  // `resolvedTheme`, not `theme` — when the stored theme is `system`, `theme`
  // is the literal string 'system' and the toggle would jump the wrong way.
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    const targetTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const button = buttonRef.current;

    const canAnimate =
      button &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canAnimate) {
      setTheme(targetTheme);
      syncThemeColor(targetTheme);
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Radius that reaches the furthest viewport corner from the button.
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = (
      document as Document & {
        startViewTransition: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition(() => {
      flushSync(() => {
        setTheme(targetTheme);
        syncThemeColor(targetTheme);
      });
    });

    await transition.ready;

    // Circular reveal: the new theme wipes out from the button that caused it.
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: EASE_IN_OUT,
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }, [resolvedTheme, setTheme]);

  return {
    toggleTheme,
    buttonRef,
    currentTheme: resolvedTheme,
  };
}
