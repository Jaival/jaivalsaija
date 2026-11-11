'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import * as React from 'react';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {/* `reducedMotion='user'` makes every framer animation respect the OS
          setting: transforms are skipped, opacity still crossfades. */}
      <MotionConfig reducedMotion='user'>{children}</MotionConfig>
    </NextThemesProvider>
  );
}
