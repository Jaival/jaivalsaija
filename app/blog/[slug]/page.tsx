import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostArticle from '@/components/postArticle';
import {
  ReleaseLine,
  VersionGraph,
  VersionHistory,
} from '@/components/postVersions';
import SeriesNav from '@/components/seriesNav';
import { getBlog } from '@/utils/blog';
import { postPath } from '@/utils/blog/paths';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Every post is prerendered; an unknown slug is a 404, not a render attempt.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { posts } = await getBlog();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlog()).post(slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Jaival Saija`,
    description: post.summary,
    alternates: { canonical: postPath(slug) },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url: postPath(slug),
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ['Jaival Saija'],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const blog = await getBlog();
  const post = blog.post(slug);
  if (!post) {
    notFound();
  }

  const versions = blog.versions(post);
  const hasHistory = versions.length > 1;
  const guide = blog.guideFor(post);

  return (
    <PostArticle
      post={post}
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
      {post.series && post.seriesPart && (
        <SeriesNav
          seriesId={post.series}
          parts={blog.series(post.series)}
          index={post.seriesPart - 1}
        />
      )}
    </PostArticle>
  );
}
