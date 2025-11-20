import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
      },
      {
        protocol: 'https',
        hostname: 'gw.alipayobjects.com',
      },
      {
        protocol: 'https',
        hostname: 'mui.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.shadcn.com',
      },
      {
        protocol: 'https',
        hostname: 'chakra-ui.com',
      },
      {
        protocol: 'https',
        hostname: 'getbootstrap.com',
      },
      {
        protocol: 'https',
        hostname: 'react.semantic-ui.com',
      },
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
