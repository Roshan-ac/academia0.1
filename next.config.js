/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        hostname:'cdn.sanity.io'
  
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
