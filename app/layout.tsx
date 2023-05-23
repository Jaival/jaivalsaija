import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import React from 'react';
import { Providers } from '../lib/provider';
import '../styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  style: 'normal',
  weight: 'variable',
  preload: false
});


export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
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