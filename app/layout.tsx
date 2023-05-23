import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import React from 'react';
import { Providers } from '../lib/provider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  weight: 'variable',
  preload: false
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
    <html lang="en" className={spaceGrotesk.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}