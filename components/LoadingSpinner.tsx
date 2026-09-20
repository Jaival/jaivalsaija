/**
 * Route loading fallback.
 *
 * Pure CSS: this renders exactly when the main thread is busiest, so a JS
 * animation would stutter. It also fades in after a 200ms delay — a fast route
 * change should never flash a spinner.
 */
export default function LoadingSpinner() {
  return (
    <div
      role='status'
      aria-label='Loading'
      className='relative min-h-svh flex items-center justify-center bg-transparent'
    >
      <div className='animate-spinner relative size-12'>
        <div className='absolute inset-0 rounded-full border-2 border-ring/20' />
        <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-primary' />
      </div>
    </div>
  );
}
