import type { Metadata } from 'next';
import Hero from '@/components/hero';
import PipelineCards from '@/components/pipelineCards';
import RecentPosts from '@/components/recentPosts';

// Set per page, not in the root layout: a layout canonical is inherited by
// every page that does not set its own, which would point them all at home.
export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  // max-w-4xl: the content width of the nav, the footer and /cv.
  return (
    <section className='pt-10 md:pt-16 pb-20'>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>
        <Hero />
        <PipelineCards />
        <RecentPosts />
      </div>
    </section>
  );
}
