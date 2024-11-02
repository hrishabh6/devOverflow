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
};

export default nextConfig;
