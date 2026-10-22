import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import PostTimeline from '@/components/postTimeline';
import { getPosts } from '@/utils/posts';

export const metadata: Metadata = {
  title: 'Blog - Jaival Saija',
  description:
    "What I'm building and learning: longer posts on DevOps and cloud work, and short updates in between.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className='min-h-svh pb-24'>
      <PageHeader
        title='Blog'
        subtitle="What I'm building and learning. Longer write-ups, and short updates in between."
      />

      <div className='max-w-3xl mx-auto px-4 md:px-8 mt-12'>
        <PostTimeline posts={posts} />
      </div>
    </div>
  );
}
