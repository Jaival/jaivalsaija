import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/utils/site';

// Everything is public; this file exists to point crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
