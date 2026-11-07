import type { Metadata } from 'next';
import Hero from '@/components/hero';
import RecentPosts from '@/components/recentPosts';

// Set per page, not in the root layout: a layout canonical is inherited by
// every page that does not set its own, which would point them all at home.
export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecentPosts />
    </>
  );
}
