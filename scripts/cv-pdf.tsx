// Renders utils/cv.ts to a PDF in the Pipeline layout
// (components/cv/cvPdfPipeline.tsx). public/cv.pdf is my master CV, built
// outside this repo, so writing over it takes --force.
//
//   bun run cv:pdf --out x.pdf             any other path
//   bun run cv:pdf --force                 replace public/cv.pdf

import { parseArgs } from 'node:util';
import { renderToFile } from '@react-pdf/renderer';
import CvPdfPipeline from '@/components/cv/cvPdfPipeline';
import userData from '@/utils/data';

const { values } = parseArgs({
  options: {
    out: { type: 'string', default: `public${userData.resumeUrl}` },
    force: { type: 'boolean', default: false },
  },
});
if (values.out === `public${userData.resumeUrl}` && !values.force) {
  throw new Error(
    `${values.out} is the master CV. Pass --out <path>, or --force to replace it.`,
  );
}

await renderToFile(<CvPdfPipeline />, values.out);
process.stdout.write(`Wrote ${values.out}\n`);
