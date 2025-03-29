import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import React from 'react';
import { ThemeProvider } from '../lib/provider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Jaival Saija | DevOps Engineer',
  description:
    'Personal website of Jaival Saija, a DevOps Engineer and technology enthusiast.',
  keywords: ['DevOps', 'Engineer', 'Technology', 'Developer', 'Portfolio'],
  authors: [{ name: 'Jaival Saija' }],
  creator: 'Jaival Saija',
  metadataBase: new URL('https://jaivalsaija.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaivalsaija.com',
    title: 'Jaival Saija | DevOps Engineer',
    description:
      'Personal website of Jaival Saija, a DevOps Engineer and technology enthusiast.',
    siteName: 'Jaival Saija',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaival Saija | DevOps Engineer',
    description:
      'Personal website of Jaival Saija, a DevOps Engineer and technology enthusiast.',
    creator: '@jaivalsaija',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
