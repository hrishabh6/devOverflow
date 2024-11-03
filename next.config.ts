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
  serverExternalPackages: ['mongoose']
};

export default nextConfig;
