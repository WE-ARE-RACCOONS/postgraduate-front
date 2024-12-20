const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [`${process.env.NEXT_PUBLIC_S3_URL}`],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
};

module.exports = nextConfig;
