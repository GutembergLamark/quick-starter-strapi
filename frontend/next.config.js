/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/(.*)sitemap.xml',
        destination: '/essentials/sitemap-proxy',
      },
      {
        source: '/sitemap(.*).xml',
        destination: '/essentials/sitemap-proxy',
      },
    ]
  },
  images: {
    domains: ["openweathermap.org"],
    remotePatterns: [
      {
        protocol: process.env.IMAGEPROTOCOL,
        hostname: process.env.IMAGEHOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: process.env.IMAGEPROTOCOL,
        hostname: 'strapi',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
