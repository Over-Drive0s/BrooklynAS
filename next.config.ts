import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagescdn.dealercarsearch.com",
      },
    ],
  },
  experimental: {
    serverComponentsHmrCache: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
  // Keep Next.js from picking up the lockfile in your home folder as the workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
