import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/learn",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/learn/:path*",
        destination: "/courses/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
