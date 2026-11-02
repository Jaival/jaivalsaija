import series from '@/content/series';
import userData from '@/utils/data';
import { getBlog } from '@/utils/blog';
import { calendarDay, kindLabel } from '@/utils/blog/kind';
import { blogPath, feedPath, postPath } from '@/utils/blog/paths';
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

/** RSS wants RFC 822 dates. */
const rssDate = (date: string) => calendarDay(date).toUTCString();

export async function GET() {
  const { posts } = await getBlog();
  const feedUrl = absoluteUrl(feedPath);

  const items = posts
    .map(post => {
      const url = absoluteUrl(postPath(post.slug));
      const categories = [
        kindLabel(post.type),
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
    <link>${absoluteUrl(blogPath)}</link>
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
