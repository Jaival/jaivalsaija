import { ImageResponse } from 'next/og';
import userData from '@/utils/data';

export const alt = 'Jaival Saija | Cloud Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const { name, designation } = userData;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f0a0a',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(31,122,140,0.35), transparent 55%), radial-gradient(circle at 85% 85%, rgba(63,136,197,0.3), transparent 55%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 96,
            height: 96,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1f7a8c, #3f88c5)',
            marginBottom: 40,
            fontSize: 44,
            fontWeight: 700,
            color: '#f2f5ff',
          }}
        >
          {name
            .split(' ')
            .map(part => part[0])
            .join('')}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 700,
            color: '#f2f5ff',
            letterSpacing: -2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            fontSize: 36,
            fontWeight: 500,
            color: '#90e0ef',
          }}
        >
          {designation}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            width: 160,
            height: 6,
            borderRadius: 999,
            background: 'linear-gradient(90deg, #1f7a8c, #3f88c5)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
