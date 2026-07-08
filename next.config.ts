import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server runtime (Vercel) so RSVP API routes can run. Pages are still
  // statically prerendered where possible; only /api/* runs on demand.
  // Pin the workspace root — a stray lockfile higher up the tree would
  // otherwise make Next infer the wrong root.
  turbopack: { root: __dirname },
};

export default nextConfig;
