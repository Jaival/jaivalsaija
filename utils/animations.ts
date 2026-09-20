/**
 * Motion tokens — the single source of truth for every animation in the app.
 *
 * The CSS side of these tokens lives in `app/globals.css` (`--ease-out`,
 * `--ease-in-out`, `--ease-drawer`). Keep the two in sync.
 *
 * Rules of thumb:
 * - UI feedback (hover, press, tooltip, menu) stays under 300ms.
 * - Entrances are 500ms and only run once.
 * - Above-the-fold entrances belong in CSS (`.animate-enter`), not here, so
 *   they run without JS and off the main thread.
 */

/** Strong ease-out. Things entering or settling in place. */
export const easeOut = [0.23, 1, 0.32, 1] as const;

/** Strong ease-in-out. Things moving across the screen. */
export const easeInOut = [0.77, 0, 0.175, 1] as const;

export const durations = {
  /** Press feedback. */
  press: 0.16,
  /** Hover, tooltips, icon swaps. */
  fast: 0.2,
  /** Menus, layout shifts. */
  base: 0.3,
  /** One-off entrances. */
  enter: 0.5,
} as const;

/** Seconds between siblings in a stagger. */
export const stagger = 0.06;

/** Default spring: critically damped, no overshoot. */
export const spring = {
  type: 'spring',
  bounce: 0,
  duration: 0.35,
} as const;

/** Playful spring. Reserved for rare moments of delight. */
export const springPlayful = {
  type: 'spring',
  bounce: 0.25,
  duration: 0.5,
} as const;

/** Entrance recipe for scroll reveals and JS-driven entrances. */
export const enterTransition = {
  duration: durations.enter,
  ease: easeOut,
} as const;

export const fastTransition = {
  duration: durations.fast,
  ease: easeOut,
} as const;
