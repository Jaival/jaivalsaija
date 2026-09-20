import { memo } from 'react';

interface BackgroundElementsProps {
  variant?: 'default' | 'contact' | 'minimal' | 'hero';
  className?: string;
}

/**
 * Decorative blurred glows behind page headers.
 *
 * These used to pulse and drift forever on the main thread. They are static
 * now: nothing here communicates state, so perpetual motion was pure cost —
 * and the slow oscillation sat in the frequency band that triggers motion
 * sickness. Blur + opacity still give the depth the loops were there for.
 */
const glows: Record<
  NonNullable<BackgroundElementsProps['variant']>,
  { id: string; className: string }[]
> = {
  default: [
    {
      id: 'blue-primary',
      className:
        'absolute top-10 right-10 w-28 h-28 bg-blue-light/15 dark:bg-aero/15 rounded-full blur-2xl opacity-40',
    },
    {
      id: 'teal-primary',
      className:
        'absolute bottom-5 left-16 w-40 h-40 bg-blue-green/15 dark:bg-blue-green/20 rounded-full blur-2xl opacity-30',
    },
  ],
  contact: [
    {
      id: 'blue-primary',
      className:
        'absolute top-10 right-10 w-28 h-28 bg-blue-light/15 dark:bg-aero/15 rounded-full blur-2xl opacity-40',
    },
    {
      id: 'teal-primary',
      className:
        'absolute bottom-5 left-16 w-40 h-40 bg-blue-green/15 dark:bg-blue-green/20 rounded-full blur-2xl opacity-30',
    },
    {
      id: 'aero-floating',
      className:
        'absolute top-1/2 left-1/4 w-24 h-24 bg-aero/12 rounded-full blur-2xl opacity-30',
    },
    {
      id: 'green-drift',
      className:
        'absolute bottom-20 left-1/3 w-16 h-16 bg-green-light/12 rounded-full blur-2xl opacity-30',
    },
  ],
  minimal: [
    {
      id: 'blue-primary',
      className:
        'absolute top-10 right-10 w-28 h-28 bg-blue-light/15 dark:bg-aero/15 rounded-full blur-2xl opacity-40',
    },
  ],
  hero: [
    {
      id: 'blue-hero',
      className:
        'absolute top-20 left-10 w-32 h-32 bg-blue-light/20 rounded-full blur-xl opacity-45',
    },
    {
      id: 'orange-hero',
      className:
        'absolute bottom-20 right-10 w-40 h-40 bg-orange-light/20 rounded-full blur-xl opacity-30',
    },
  ],
};

const BackgroundElements = memo<BackgroundElementsProps>(
  ({ variant = 'default', className = '' }) => {
    const isHeroPage =
      className.includes('hero') || className.includes('overflow-hidden');
    const elements = glows[isHeroPage ? 'hero' : variant];

    return (
      <>
        {elements.map(element => (
          <div key={element.id} aria-hidden className={element.className} />
        ))}
      </>
    );
  },
);

BackgroundElements.displayName = 'BackgroundElements';

export default BackgroundElements;
