import { Metadata, Viewport } from 'next';
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

// Resolve the canonical site URL. On Vercel this follows the project's own
// production domain, so it stays correct if a custom domain is added later.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '')}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Jaival Saija | DevOps Engineer',
  description:
    'Personal website of Jaival Saija, a DevOps Engineer and technology enthusiast.',
  keywords: ['DevOps', 'Engineer', 'Technology', 'Developer', 'Portfolio'],
  authors: [{ name: 'Jaival Saija' }],
  creator: 'Jaival Saija',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
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

// Tints the mobile browser chrome (status bar / URL bar) to match the page.
// The navbar keeps these in sync when the theme is toggled by hand.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020618' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={spaceGrotesk.variable}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className='min-h-svh text-foreground antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex min-h-svh flex-col grow app-bg'>
            {/* Subtle noise overlay for depth */}
            <div className='noise-overlay' />
            <Navbar />
            <main className='flex-1'>
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
