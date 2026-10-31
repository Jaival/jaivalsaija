// Renders both CV PDFs: `bun run cv:pdf`. Run it from the repo root after
// editing utils/cv.ts (words) or a layout in components/cv/.

import { renderToFile } from '@react-pdf/renderer';
import CvPdf from '@/components/cv/cvPdf';
import CvPdfClassic from '@/components/cv/cvPdfClassic';
import { cvDownloads } from '@/utils/cv';

await renderToFile(<CvPdf />, `public${cvDownloads.site.href}`);
await renderToFile(<CvPdfClassic />, `public${cvDownloads.classic.href}`);
process.stdout.write(
  `Wrote public${cvDownloads.site.href} and public${cvDownloads.classic.href}\n`,
);
