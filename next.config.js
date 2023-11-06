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
};

module.exports = nextConfig;
