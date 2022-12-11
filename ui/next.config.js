/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'assets.physphile.ru',
        port: '',
        pathname: '/smartphones/**',
      },
    ],
  },
}

module.exports = nextConfig
