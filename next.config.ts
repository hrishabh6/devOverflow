import { hostname } from "os";

// next.config.ts
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  experimental: {
    mdxRs: true,
  },
  serverExternalPackages: ['mongoose'], // moved from `experimental`

  images:{
    remotePatterns : [
      {
        protocol: 'https', // Removed the colon
        hostname: '*',
      },
      {
        protocol: 'http', // Removed the colon
        hostname: '*',
      }
    ]
  }

};

export default nextConfig;
