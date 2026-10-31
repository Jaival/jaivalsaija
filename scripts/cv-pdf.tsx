// Renders the CV PDF: `bun run cv:pdf`. Run it from the repo root after
// editing utils/cv.ts (words) or components/cv/cvPdfClassic.tsx (layout).
//
//   bun run cv:pdf                                   junior → public/cv.pdf
//   bun run cv:pdf --variant student --out x.pdf     any variant, any path

import { parseArgs } from 'node:util';
import { renderToFile } from '@react-pdf/renderer';
import CvPdfClassic, { type CvVariant } from '@/components/cv/cvPdfClassic';
import userData from '@/utils/data';

const { values } = parseArgs({
  options: {
    variant: { type: 'string', default: 'junior' },
    out: { type: 'string', default: `public${userData.resumeUrl}` },
  },
});
if (values.variant !== 'junior' && values.variant !== 'student') {
  throw new Error(`--variant must be junior or student, not ${values.variant}`);
}
const variant: CvVariant = values.variant;

await renderToFile(<CvPdfClassic variant={variant} />, values.out);
process.stdout.write(`Wrote ${values.out} (${variant})\n`);
