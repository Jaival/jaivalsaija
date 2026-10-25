const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Keep essential optimizations for portfolio performance
  experimental: {
    // Simple package optimization for common libraries
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Basic image optimization (essential for portfolio)
  // Every image is local now, so no remote hosts and no SVG through the
  // optimizer.
  images: {
    // formats: ['image/avif', 'image/webp', 'image/png', 'image/jpeg'],
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
  // eslint: {
  //   ignoreDuringBuilds: false, // Enable ESLint in builds for better code quality
  // },
  // Enable gzip compression
  compress: true,
};

// Blog posts in content/posts are imported as .mdx modules, not routed as
// pages, so pageExtensions stays at its default. Turbopack runs the MDX
// compiler in Rust: plugins must be named by string with JSON options.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      [
        'rehype-pretty-code',
        {
          // Both themes are emitted as CSS variables; globals.css picks one
          // from the .dark class, so a theme switch never re-renders code.
          theme: { light: 'github-light', dark: 'github-dark-dimmed' },
          keepBackground: false,
        },
      ],
    ],
  },
});

module.exports = withMDX(nextConfig);
