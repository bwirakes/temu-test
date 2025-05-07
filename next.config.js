/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: { 
    domains: ['localhost'],
  },
  // Next.js 15 configurations
  // This replaces the previous experimental.serverComponentsExternalPackages
  serverExternalPackages: [],
};

module.exports = nextConfig;
