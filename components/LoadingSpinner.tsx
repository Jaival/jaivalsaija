import { Cursor } from '@/components/pipeline';

/**
 * Route loading fallback: a shell waiting on a command.
 *
 * Pure CSS: this renders exactly when the main thread is busiest, so a JS
 * animation would stutter. It also fades in after a 200ms delay — a fast route
 * change should never flash a loading screen.
 */
export default function LoadingSpinner() {
  return (
    <div
      role='status'
      aria-label='Loading'
      className='animate-loading min-h-[70svh] max-w-4xl mx-auto px-4 md:px-8 pt-10 md:pt-16'
    >
      <p aria-hidden className='font-mono text-sm md:text-base text-primary'>
        $ loading
        <Cursor />
      </p>
    </div>
  );
}
