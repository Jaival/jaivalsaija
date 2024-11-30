import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import React from 'react';
import { ThemeProvider } from '../lib/provider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  weight: 'variable',
  preload: false,
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Home - Jaival Saija',
  description: 'I am a DevOps Engineer and a all tech lover.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
