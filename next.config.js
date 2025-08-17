/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Keep essential optimizations for portfolio performance
  experimental: {
    // Simple package optimization for common libraries
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Basic image optimization (essential for portfolio)
  images: {
    dangerouslyAllowSVG: true,
    // formats: ['image/avif', 'image/webp', 'image/png', 'image/jpeg'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
        pathname: '/icons/**',
      },
    ],
  },

  // Security headers for better performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint in builds for better code quality
  },
  // Enable gzip compression
  compress: true,
};

module.exports = nextConfig;
