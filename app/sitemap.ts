import type { MetadataRoute } from 'next';
import { getPosts } from '@/utils/posts';
import { absoluteUrl } from '@/utils/site';

// Built once at build time, like every page it lists.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
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
    { url: absoluteUrl('/blog'), lastModified: newest },
    ...posts.map(post => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updated ?? post.date,
      images: post.cover ? [absoluteUrl(post.cover.src)] : undefined,
    })),
    ...seriesIds.map(id => ({
      url: absoluteUrl(`/blog/series/${id}`),
      lastModified: posts.find(post => post.series === id)?.date,
    })),
  ];
}
