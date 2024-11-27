const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [`${process.env.NEXT_PUBLIC_S3_URL}`],
    formats: ['image/avif', 'image/webp'],
  },
};

const isProduction = process.env.NODE_ENV === 'production';

const sentryOptions = {
  org: 'raccons',
  project: 'postgradu',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const config = isProduction
  ? withSentryConfig(nextConfig, sentryOptions)
  : nextConfig;

module.exports = config;
