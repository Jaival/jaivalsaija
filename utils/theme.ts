// The page background of each theme as hex, for <meta name="theme-color">:
// the root layout sets it per colour scheme, and the theme toggle
// (hooks/useViewTransitionTheme.ts) rewrites it on a manual change. Equal to
// --background in app/globals.css; change both together.
export const themeColor = {
  light: '#f7fbfb',
  dark: '#071318',
} as const;
