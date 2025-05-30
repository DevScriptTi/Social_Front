/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000',
          pathname: '/files/**',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '8000',
          pathname: '/qrcode/**',
        },
      ],
    },
  };
  
  const withNextIntl = require('next-intl/plugin')();
  
  module.exports = withNextIntl(nextConfig);