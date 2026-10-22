import { ImageResponse } from 'next/og';
import series from '@/content/series';
import userData from '@/utils/data';
import { getPost, getPosts } from '@/utils/posts';
import { formatPostDate } from '@/utils/utils';

export const alt = 'Blog post by Jaival Saija';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// One card per post, rendered at build time alongside the page.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

// Same palette and gradients as app/opengraph-image.tsx, with the post title
// as the headline so a shared link says what it's about.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title ?? userData.name;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        backgroundColor: '#071318',
        backgroundImage:
          'radial-gradient(circle at 15% 20%, rgba(93,218,224,0.22), transparent 55%), radial-gradient(circle at 85% 85%, rgba(107,186,240,0.2), transparent 55%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 30,
          fontWeight: 500,
          color: '#5ddae0',
        }}
      >
        {post
          ? `${post.series ? series[post.series].title : post.type === 'update' ? 'Update' : 'Blog'} · ${formatPostDate(post.date)}`
          : 'Blog'}
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: title.length > 60 ? 64 : 80,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -2,
          color: '#ecf3f4',
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            width: 64,
            height: 64,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #5ddae0, #6bbaf0)',
            fontSize: 28,
            fontWeight: 700,
            color: '#001a22',
          }}
        >
          {userData.name
            .split(' ')
            .map(part => part[0])
            .join('')}
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#ecf3f4' }}>
          {userData.name}
        </div>
        <div
          style={{
            display: 'flex',
            width: 120,
            height: 6,
            marginLeft: 'auto',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #5ddae0, #6bbaf0)',
          }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  );
}
