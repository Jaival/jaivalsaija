// Resolve the canonical site URL. On Vercel this follows the project's own
// production domain, so it stays correct if a custom domain is added later.
// Shared by the root metadata, the sitemap and the RSS feed, which all need
// absolute URLs.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '')}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000';

/** Absolute URL for a site path, e.g. '/blog' -> 'https://…/blog'. */
export const absoluteUrl = (pathname: string) =>
  new URL(pathname, siteUrl).toString();
