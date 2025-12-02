import type { NextConfig } from "next";

const isGithubPages = process.env.NEXT_PUBLIC_DEPLOY_SOURCE === 'github-pages';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Enable static export for GitHub Pages
  ...(isGithubPages ? { output: 'export' } : {}),

  // Disable image optimization for static export
  images: {
    unoptimized: true,
    qualities: [75, 100], // Support both default and high quality images
  },

  // Only set basePath and assetPrefix for GitHub Pages deployment
  ...(isGithubPages ? {
    // basePath: '/repo-name', // Uncomment and set if deploying to repo pages (not custom domain)
    // assetPrefix: '/repo-name', // Uncomment and set if deploying to repo pages (not custom domain)
  } : {}),
};

export default nextConfig;
