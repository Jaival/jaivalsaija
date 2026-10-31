'use client';

import { useState } from 'react';
import { cvDownloads } from '@/utils/cv';

type Version = keyof typeof cvDownloads;

// Download PDF with a switch for which layout: the site-style PDF or the
// classic one. Both are static files in public/, so a plain <a>.
export default function CvDownload() {
  const [version, setVersion] = useState<Version>('site');

  return (
    <div className='flex flex-col gap-2'>
      <div
        role='radiogroup'
        aria-label='PDF style'
        className='grid grid-cols-2 rounded-md border border-border bg-muted p-1 text-xs font-medium'
      >
        {(Object.keys(cvDownloads) as Version[]).map(key => (
          <button
            key={key}
            type='button'
            role='radio'
            aria-checked={version === key}
            onClick={() => setVersion(key)}
            className={`rounded px-2 py-1.5 transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring/60 ${
              version === key
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {cvDownloads[key].label}
          </button>
        ))}
      </div>
      <a
        href={cvDownloads[version].href}
        download='Jaival_Saija_CV.pdf'
        className='inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md text-primary-foreground bg-gradient-to-r from-brand-from to-brand-to hover:from-brand-to hover:to-brand-from shadow-lg hover:shadow-xl transition-[background-color,box-shadow] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        Download PDF
      </a>
    </div>
  );
}
