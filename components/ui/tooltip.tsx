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
      data-slot='tooltip-provider'
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
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
}

interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  variant?: 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
}

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  variant = 'brand',
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(
          // Base styling with modern design
          'z-50 w-fit origin-(--radix-tooltip-content-transform-origin)',

          // Modern rounded corners and spacing
          'rounded-lg px-3 py-2',

          // Typography improvements
          'text-xs font-medium',

          // Enhanced shadows for depth
          'shadow-lg shadow-black/25 dark:shadow-black/40',

          // Smooth animations
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150',

          // Directional slide animations
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',

          // Variant-specific styles with improved contrast and readability
          variant === 'brand'
            ? cn(
              'bg-gradient-to-br from-hero-font/95 to-blue-green/95 dark:from-blue-light/95 dark:to-aero/95',
              'text-white dark:text-blue-dark font-medium',
              'backdrop-blur-lg border border-hero-font/30 dark:border-blue-light/30',
              'shadow-lg shadow-hero-font/20 dark:shadow-blue-light/20',
            )
            : variant === 'success'
              ? cn(
                'bg-gradient-to-br from-green/95 to-green-dark/95 dark:from-green-light/95 dark:to-green-dark/95',
                'text-white dark:text-blue-dark font-medium',
                'backdrop-blur-lg border border-green/30 dark:border-green-light/30',
                'shadow-lg shadow-green/20 dark:shadow-green-light/20',
              )
              : variant === 'warning'
                ? cn(
                  'bg-gradient-to-br from-yellow-orange/95 to-orange/95 dark:from-yellow-light/95 dark:to-yellow-orange/95',
                  'text-white dark:text-blue-dark font-medium',
                  'backdrop-blur-lg border border-yellow-orange/30 dark:border-yellow-light/30',
                  'shadow-lg shadow-yellow-orange/20 dark:shadow-yellow-light/20',
                )
                : variant === 'error'
                  ? cn(
                    'bg-gradient-to-br from-red-dark/95 to-red-light/95 dark:from-red-dark/95 dark:to-red-light/95',
                    'text-white font-medium',
                    'backdrop-blur-lg border border-red-dark/30 dark:border-red-light/30',
                    'shadow-lg shadow-red-dark/20 dark:shadow-red-light/20',
                  )
                  : variant === 'info'
                    ? cn(
                      'bg-gradient-to-br from-blue/95 to-aero/95 dark:from-blue-light/95 dark:to-aero/95',
                      'text-white dark:text-blue-dark font-medium',
                      'backdrop-blur-lg border border-blue/30 dark:border-blue-light/30',
                      'shadow-lg shadow-blue/20 dark:shadow-blue-light/20',
                    )
                    : cn(
                      'bg-gray-dark/95 dark:bg-gray-light/95',
                      'text-white dark:text-blue-dark font-medium',
                      'backdrop-blur-lg border border-gray-dark/30 dark:border-gray-light/30',
                      'shadow-lg shadow-gray-dark/20 dark:shadow-gray-light/20',
                    ),

          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className={cn(
            variant === 'brand'
              ? 'fill-hero-font dark:fill-blue-light'
              : variant === 'success'
                ? 'fill-green dark:fill-green-light'
                : variant === 'warning'
                  ? 'fill-yellow-orange dark:fill-yellow-light'
                  : variant === 'error'
                    ? 'fill-red-dark dark:fill-red-light'
                    : variant === 'info'
                      ? 'fill-blue dark:fill-blue-light'
                      : 'fill-gray-dark dark:fill-gray-light',
            'z-50 size-2.5 translate-y-[calc(-50%_-_1px)] rotate-45 rounded-sm',
            'drop-shadow-lg',
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
