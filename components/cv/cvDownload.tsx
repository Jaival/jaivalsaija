import userData from '@/utils/data';

// The PDF is a static file in public/, so a plain <a>.
export default function CvDownload() {
  return (
    <a
      href={userData.resumeUrl}
      download='Jaival_Saija_CV.pdf'
      className='inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md text-primary-foreground bg-gradient-to-r from-brand-from to-brand-to hover:from-brand-to hover:to-brand-from shadow-lg hover:shadow-xl transition-[background-color,box-shadow] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
    >
      Download PDF
    </a>
  );
}
