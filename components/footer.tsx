export default function Footer() {
  return (
    <footer>
      <div className='max-w-6xl px-4 py-12 mx-auto md:py-20'>
        {/* Decorative line */}
        <div className='h-px w-full bg-gradient-to-r from-transparent via-blue-line to-transparent mb-8' />

        <div className='flex flex-wrap items-center justify-center text-base text-blue-dark dark:text-gray-light'>
          <span className='mr-2'>© {new Date().getFullYear()}.</span>

          <div className='group mr-2'>
            <span className='relative inline-block'>
              <span className='font-semibold text-hero-font dark:text-blue-light cursor-default'>
                Jaival Saija.
              </span>
              {/* Sliding underline — hover feedback, so it stays. */}
              <span className='absolute left-0 bottom-0 w-full h-0.5 bg-orange-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left' />
            </span>
          </div>

          <span>All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
