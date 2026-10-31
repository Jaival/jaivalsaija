import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import { Font, Text, type StyleSheet } from '@react-pdf/renderer';
import { cv } from '@/utils/cv';

// Setup and helpers for the PDF layout (cvPdfClassic.tsx). Runs only in
// scripts/cv-pdf.tsx, never in the Next bundle.

const fonts = path.join(
  process.cwd(),
  'node_modules/@fontsource/google-sans/files',
);
Font.register({
  family: 'google-sans',
  fonts: [400, 600, 700].map(fontWeight => ({
    src: path.join(fonts, `google-sans-latin-${fontWeight}-normal.woff`),
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
