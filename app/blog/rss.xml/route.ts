import series from '@/content/series';
import userData from '@/utils/data';
import { getPosts } from '@/utils/posts';
import { absoluteUrl } from '@/utils/site';

// GET handlers render per request by default; the feed only changes when a
// post is pushed, so build it once with the rest of the site.
export const dynamic = 'force-static';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** RSS wants RFC 822 dates; post dates are calendar days in UTC. */
const rssDate = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString();

export async function GET() {
  const posts = await getPosts();
  const feedUrl = absoluteUrl('/blog/rss.xml');

  const items = posts
    .map(post => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const categories = [
        post.type === 'update' ? 'Update' : 'Post',
        ...(post.series ? [series[post.series].title] : []),
      ];
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rssDate(post.date)}</pubDate>
      <description>${escapeXml(post.summary)}</description>
${categories.map(category => `      <category>${escapeXml(category)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${userData.name} - Blog`)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>What I'm building and learning: DevOps, cloud and the projects in between.</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${rssDate(posts[0].date)}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
