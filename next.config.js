/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
  images: {
    domains: [`${process.env.NEXT_PUBLIC_S3_URL}`],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
