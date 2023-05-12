/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    dangerouslyAllowSVG: true,
    domains: ['raw.githubusercontent.com', 'skillicons.dev'],
  },
};

module.exports = nextConfig;
