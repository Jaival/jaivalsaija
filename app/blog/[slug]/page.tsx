import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostArticle from '@/components/postArticle';
import {
  ReleaseLine,
  VersionGraph,
  VersionHistory,
} from '@/components/postVersions';
import SeriesNav from '@/components/seriesNav';
import {
  getGuideVersion,
  getPost,
  getPosts,
  getPostVersions,
  getSeriesPosts,
} from '@/utils/posts';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Every post is prerendered; an unknown slug is a 404, not a render attempt.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Jaival Saija`,
    description: post.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ['Jaival Saija'],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  const parts = post.series ? await getSeriesPosts(post.series) : [];
  const partIndex = parts.findIndex(part => part.slug === slug);
  const versions = await getPostVersions(post);
  const hasHistory = versions.length > 1;
  const guide = await getGuideVersion(post);

  return (
    <PostArticle
      post={post}
      seriesPart={partIndex >= 0 ? partIndex + 1 : undefined}
      versions={
        hasHistory ? (
          <VersionGraph versions={versions} viewing={versions.length} />
        ) : (
          guide &&
          post.release && <ReleaseLine release={post.release} guide={guide} />
        )
      }
    >
      {hasHistory && (
        <VersionHistory versions={versions} viewing={versions.length} />
      )}
      {post.series && partIndex >= 0 && (
        <SeriesNav seriesId={post.series} parts={parts} index={partIndex} />
      )}
    </PostArticle>
  );
}
