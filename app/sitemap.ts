import type { MetadataRoute } from 'next';
import { getBlog } from '@/utils/blog';
import { blogPath, postPath, seriesPath } from '@/utils/blog/paths';
import { absoluteUrl } from '@/utils/site';

// Built once at build time, like every page it lists.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getBlog();
  const newest = posts[0]?.date;
  const seriesIds = [...new Set(posts.map(post => post.series))].filter(
    id => id !== undefined,
  );

  const pages: MetadataRoute.Sitemap = [
    '/',
    '/aboutme',
    '/projects',
    '/experience',
    '/contactme',
    '/cv',
  ].map(pathname => ({ url: absoluteUrl(pathname) }));

  return [
    ...pages,
    { url: absoluteUrl(blogPath), lastModified: newest },
    ...posts.map(post => ({
      url: absoluteUrl(postPath(post.slug)),
      lastModified: post.updated ?? post.date,
      images: post.cover ? [absoluteUrl(post.cover.src)] : undefined,
    })),
    ...seriesIds.map(id => ({
      url: absoluteUrl(seriesPath(id)),
      lastModified: posts.find(post => post.series === id)?.date,
    })),
  ];
}
