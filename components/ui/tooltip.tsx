'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/utils';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          // Base styling with modern design
          'z-50 w-fit origin-(--radix-tooltip-content-transform-origin)',

          // Background and colors using brand palette
          'bg-gradient-to-br from-hero-font/95 to-blue-green/95 dark:from-blue-light/95 dark:to-aero/95',
          'text-black-dark dark:text-white',
          'backdrop-blur-lg border border-white/20 dark:border-black-dark/20',

          // Modern rounded corners and spacing
          'rounded-xl px-4 py-2.5',

          // Typography improvements
          'text-sm font-medium tracking-wide',

          // Enhanced shadows for depth
          'shadow-xl shadow-black/20 dark:shadow-white/10',

          // Smooth animations
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150',

          // Directional slide animations
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',

          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className={cn(
            'fill-hero-font dark:fill-blue-light',
            'z-50 size-3 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]',
            'drop-shadow-lg',
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
