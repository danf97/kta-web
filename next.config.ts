import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://cdn.sanity.io/images/6csk8ef5/**")],
  },
};

export default nextConfig;
