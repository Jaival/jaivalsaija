// The one host search engines should index. Every Vercel build uses it for
// canonical links, the sitemap, robots.txt and the RSS feed. Not
// VERCEL_PROJECT_PRODUCTION_URL: Vercel sets that to the project's shortest
// production domain, the apex, and the apex only redirects here. The same
// host is in the redirect in next.config.js; change both together.
const productionUrl = 'https://www.jaivalsaija.dev';

// NEXT_PUBLIC_SITE_URL overrides it, for a build that serves another host.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '')}`
  : process.env.VERCEL
    ? productionUrl
    : 'http://localhost:3000';

/** Absolute URL for a site path, e.g. '/blog' -> 'https://…/blog'. */
export const absoluteUrl = (pathname: string) =>
  new URL(pathname, siteUrl).toString();
