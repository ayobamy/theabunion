import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site deploys free to GitHub Pages, Netlify,
  // Vercel, or any static host — no server runtime required.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Pin the workspace root — a stray lockfile higher up the tree would
  // otherwise make Next infer the wrong root.
  turbopack: { root: __dirname },
};

export default nextConfig;
