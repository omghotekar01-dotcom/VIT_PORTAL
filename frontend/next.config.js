/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['learner.vierp.in', 'images.unsplash.com', 'upload.wikimedia.org'],
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig
