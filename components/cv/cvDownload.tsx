import userData from '@/utils/data';

// The PDF is a static file in public/, so a plain <a>.
export default function CvDownload() {
  return (
    <a
      href={userData.resumeUrl}
      download='Jaival_Saija_CV.pdf'
      className='inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:bg-primary/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
    >
      Download PDF
    </a>
  );
}
