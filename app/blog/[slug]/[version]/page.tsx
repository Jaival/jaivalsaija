import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostArticle from '@/components/postArticle';
import { VersionGraph, VersionHistory } from '@/components/postVersions';
import { getBlog } from '@/utils/blog';
import { parseVersion, postPath, versionSegment } from '@/utils/blog/paths';

interface VersionPageProps {
  params: Promise<{ slug: string; version: string }>;
}

// Older versions of a post, frozen as published: /blog/<slug>/v1 and so on.
// The current version is always /blog/<slug>, so it isn't listed here.
export const dynamicParams = false;

export async function generateStaticParams() {
  const blog = await getBlog();
  return blog.posts.flatMap(post =>
    blog
      .versions(post)
      .filter(({ isCurrent }) => !isCurrent)
      .map(({ version }) => ({
        slug: post.slug,
        version: versionSegment(version),
      })),
  );
}

/** The older version a route points at; the current one isn't in here. */
async function oldVersion(slug: string, segment: string) {
  const version = parseVersion(segment);
  const blog = await getBlog();
  const post = blog.post(slug);
  const old = version && blog.version(slug, version);
  return post && old ? { blog, post, old, version } : undefined;
}

export async function generateMetadata({
  params,
}: VersionPageProps): Promise<Metadata> {
  const { slug, version: segment } = await params;
  const found = await oldVersion(slug, segment);
  if (!found) {
    return {};
  }
  const { old, version } = found;

  // Search engines should send readers to the current version, not this one.
  return {
    title: `${old.title} (version ${version}) - Jaival Saija`,
    description: old.summary,
    alternates: { canonical: postPath(slug) },
    robots: { index: false, follow: true },
  };
}

export default async function VersionPage({ params }: VersionPageProps) {
  const { slug, version: segment } = await params;
  const found = await oldVersion(slug, segment);
  if (!found) {
    notFound();
  }
  const { blog, post, old, version } = found;
  const versions = blog.versions(post);

  return (
    <PostArticle
      post={old}
      versions={<VersionGraph versions={versions} viewing={version} />}
    >
      <VersionHistory versions={versions} viewing={version} />
    </PostArticle>
  );
}
