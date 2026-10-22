import { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import React, { Suspense } from 'react';
import { ThemeProvider } from '../utils/provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { siteUrl } from '@/utils/site';
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
    'Jaival Saija is a DevOps engineer in Kaiserslautern, Germany, working on AWS infrastructure, CI/CD and cloud security, and looking for DevOps and cloud roles in Germany.',
  keywords: [
    'DevOps Engineer',
    'AWS',
    'Cloud Security',
    'CI/CD',
    'GitHub Actions',
    'Terraform',
    'Linux',
    'Docker',
    'Kubernetes',
    'Kaiserslautern',
    'Germany',
  ],
  authors: [{ name: 'Jaival Saija' }],
  creator: 'Jaival Saija',
  metadataBase: new URL(siteUrl),
  // Lets feed readers find the blog's RSS from any page on the site.
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: 'Jaival Saija - Blog' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Jaival Saija | DevOps Engineer',
    description:
      'Jaival Saija is a DevOps engineer in Kaiserslautern, Germany, working on AWS infrastructure, CI/CD and cloud security, and looking for DevOps and cloud roles in Germany.',
    siteName: 'Jaival Saija',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaival Saija | DevOps Engineer',
    description:
      'Jaival Saija is a DevOps engineer in Kaiserslautern, Germany, working on AWS infrastructure, CI/CD and cloud security, and looking for DevOps and cloud roles in Germany.',
    creator: '@Jaival469',
  },
};

// Tints the mobile browser chrome (status bar / URL bar) to match the page.
// The navbar keeps these in sync when the theme is toggled by hand.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fbfb' },
    { media: '(prefers-color-scheme: dark)', color: '#071318' },
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
