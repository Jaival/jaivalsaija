import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostArticle from '@/components/postArticle';
import { VersionGraph, VersionHistory } from '@/components/postVersions';
import {
  getPost,
  getPosts,
  getPostVersion,
  getPostVersions,
} from '@/utils/posts';

interface VersionPageProps {
  params: Promise<{ slug: string; version: string }>;
}

// Older versions of a post, frozen as published: /blog/<slug>/v1 and so on.
// The current version is always /blog/<slug>, so it isn't listed here.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  const versions = await Promise.all(posts.map(getPostVersions));
  return posts.flatMap((post, index) =>
    versions[index]
      .slice(0, -1)
      .map(({ version }) => ({ slug: post.slug, version: `v${version}` })),
  );
}

const versionNumber = (param: string) =>
  Number(/^v(\d+)$/.exec(param)?.[1] ?? NaN);

export async function generateMetadata({
  params,
}: VersionPageProps): Promise<Metadata> {
  const { slug, version } = await params;
  const old = await getPostVersion(slug, versionNumber(version));
  if (!old) {
    return {};
  }

  // Search engines should send readers to the current version, not this one.
  return {
    title: `${old.title} (version ${versionNumber(version)}) - Jaival Saija`,
    description: old.summary,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function VersionPage({ params }: VersionPageProps) {
  const { slug, version: param } = await params;
  const version = versionNumber(param);
  const [post, old] = await Promise.all([
    getPost(slug),
    getPostVersion(slug, version),
  ]);
  if (!post || !old) {
    notFound();
  }

  const versions = await getPostVersions(post);
  const viewing = versions.find(entry => entry.version === version);
  if (!viewing || viewing === versions.at(-1)) {
    notFound();
  }

  return (
    <PostArticle
      post={old}
      versions={<VersionGraph versions={versions} viewing={version} />}
    >
      <VersionHistory versions={versions} viewing={version} />
    </PostArticle>
  );
}
