import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import { Font, Text, type StyleSheet } from '@react-pdf/renderer';
import { cv } from '@/utils/cv';

// What both PDF layouts (cvPdf.tsx, cvPdfClassic.tsx) need. Runs only in
// scripts/cv-pdf.tsx, never in the Next bundle.

// Space Grotesk for the site-style PDF, Google Sans for the classic one.
for (const pkg of ['space-grotesk', 'google-sans']) {
  const files = path.join(
    process.cwd(),
    'node_modules/@fontsource',
    pkg,
    'files',
  );
  Font.register({
    family: pkg,
    fonts: [400, 600, 700].map(fontWeight => ({
      src: path.join(files, `${pkg}-latin-${fontWeight}-normal.woff`),
      fontWeight,
    })),
  });
}
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

/** Turns `**bold**` in the CV strings into bold runs. */
export function rich(
  text: string,
  bold: ReturnType<typeof StyleSheet.create>[string],
): ReactNode {
  return text.split('**').map((part, i) =>
    i % 2 ? (
      <Text key={i} style={bold}>
        {part}
      </Text>
    ) : (
      part
    ),
  );
}
