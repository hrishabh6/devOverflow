// next.config.ts
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  experimental: {
    serverActions : true,
    mdxRs : true,
  },
  serverExternalPackages: ['mongoose'],

  images: {
    remotePatterns : [
    {
      protocol : 'https',
      hostname : '*'
    },
    {
      protocol : 'http',
      hostname : '*'
    }
    ]
  }

};

export default nextConfig;
