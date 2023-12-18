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
    domains: ['post-graduate.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;

