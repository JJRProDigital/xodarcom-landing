import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xodarcom.com",
      },
    ],
  },
};

export default nextConfig;
