import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import React, { Suspense } from 'react';
import { ThemeProvider } from '../utils/provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
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
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col grow bg-gradient-to-br from-gray via-white to-silver dark:from-black-light dark:via-blue-dark dark:to-purple-dark">
            <Navbar />
            <main className="flex-1">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
