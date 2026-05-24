import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/my-link",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
