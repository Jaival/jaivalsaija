import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Font } from '@react-pdf/renderer';
import { cv } from '@/utils/cv';

// Setup and helpers for the PDF layout (cvPdfPipeline.tsx). Runs only in
// scripts/cv-pdf.tsx, never in the Next bundle.

const fontDir = (pkg: string) =>
  path.join(process.cwd(), 'node_modules/@fontsource', pkg, 'files');
const sans = fontDir('google-sans');
const monoDir = fontDir('jetbrains-mono');
Font.register({
  family: 'google-sans',
  fonts: [
    ...[400, 600, 700].map(fontWeight => ({
      src: path.join(sans, `google-sans-latin-${fontWeight}-normal.woff`),
      fontWeight,
    })),
    {
      src: path.join(sans, 'google-sans-latin-400-italic.woff'),
      fontWeight: 400,
      fontStyle: 'italic' as const,
    },
  ],
});
Font.register({
  family: 'jetbrains-mono',
  fonts: [400, 500, 700].map(fontWeight => ({
    src: path.join(monoDir, `jetbrains-mono-latin-${fontWeight}-normal.woff`),
    fontWeight,
  })),
});
// Words never split with a hyphen; long ones move to the next line whole.
Font.registerHyphenationCallback(word => [word]);

/**
 * Ligatures, contextual alternates and kerning break the PDF's text layer:
 * copy-paste and applicant tracking systems read "fx" for "fix" and
 * "Flut ter" for "Flutter". Set on each Page.
 */
export const plainText = {
  fontFeatureSettings: { liga: false, clig: false, calt: false, kern: false },
};

/** File data, not a path: react-pdf reads `D:\...` as a URL. */
export const photo = {
  data: readFileSync(path.join(process.cwd(), 'public', cv.photo)),
  format: 'jpg' as const,
};
