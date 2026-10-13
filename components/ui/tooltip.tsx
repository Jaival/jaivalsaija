'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/utils';

function TooltipProvider({
  delayDuration = 200,
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

// No Provider here on purpose: the app mounts a single TooltipProvider in
// `utils/provider.tsx`. A provider per tooltip meant the "skip the delay for
// the next tooltip" grace window never applied between siblings.
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot='tooltip' {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
}

interface TooltipContentProps extends React.ComponentProps<
  typeof TooltipPrimitive.Content
> {
  variant?: 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
}

type TooltipVariant = NonNullable<TooltipContentProps['variant']>;

const surfaces: Record<TooltipVariant, string> = {
  brand:
    'bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground',
  neutral: 'bg-foreground text-background',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  error: 'bg-destructive text-destructive-foreground',
  info: 'bg-brand-to text-primary-foreground',
};

const arrows: Record<TooltipVariant, string> = {
  brand: 'fill-brand-from',
  neutral: 'fill-foreground',
  success: 'fill-success',
  warning: 'fill-warning',
  error: 'fill-destructive',
  info: 'fill-brand-to',
};

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
          // Base styling. The enter/exit animation lives in globals.css on
          // [data-slot='tooltip-content'] so it can key off Radix's own
          // data-state (including `instant-open`, which gets no animation).
          'z-50 w-fit',

          // Modern rounded corners and spacing
          'rounded-lg px-3 py-2',

          // Typography improvements
          'text-xs font-medium',

          // Enhanced shadows for depth
          'shadow-lg shadow-black/25',

          // Variant colours come from the theme tokens
          surfaces[variant],

          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className={cn(
            arrows[variant],
            'z-50 size-2.5 translate-y-[calc(-50%_-_1px)] rotate-45 rounded-sm',
            'drop-shadow-lg',
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
