'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import * as React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {/* `reducedMotion='user'` makes every framer animation respect the OS
          setting: transforms are skipped, opacity still crossfades. */}
      <MotionConfig reducedMotion='user'>
        {/* One provider for the whole app so the "skip the delay on the next
            tooltip" grace window actually works between siblings. */}
        <TooltipProvider delayDuration={200} skipDelayDuration={300}>
          {children}
        </TooltipProvider>
      </MotionConfig>
    </NextThemesProvider>
  );
}
