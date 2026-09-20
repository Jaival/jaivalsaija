import type { CSSProperties } from 'react';
import BackgroundElements from './backgroundElements';
import { containerStyles, titleStyles, gradientText } from '@/utils/styles';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Above-the-fold page header. The entrance is a CSS keyframe, not JS: the
 * markup ships visible-by-default from the server and the animation runs off
 * the main thread, so the heading never waits for hydration.
 */
export default function PageHeader({
  title,
  subtitle,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`${containerStyles.header} ${className}`}>
      <BackgroundElements />

      <h1
        className={`${titleStyles.page} ${gradientText.hero} animate-enter px-4 md:px-8`}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className='animate-enter text-lg md:text-xl text-gray-dark dark:text-gray-light max-w-3xl mx-auto leading-relaxed text-center md:text-left px-4 md:px-8'
          style={{ '--stagger': 1 } as CSSProperties}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
