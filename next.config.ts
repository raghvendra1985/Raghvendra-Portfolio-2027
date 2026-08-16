import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/work/porsche", destination: "/work", permanent: true },
      { source: "/work/rapipay", destination: "/work/nye", permanent: true },
      { source: "/work/nye-money", destination: "/work/nye", permanent: true },
      { source: "/work/nagarro", destination: "/work", permanent: true },
      { source: "/work/iiad", destination: "/work", permanent: true },
      { source: "/work/omf", destination: "/work", permanent: true },
      { source: "/work/crowley-maritime", destination: "/work/crowley", permanent: true },
    ];
  },
};

export default nextConfig;
