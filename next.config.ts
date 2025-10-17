import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Apex → www (until cutover decision)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'penleyoil.com' }],
        destination: 'https://www.penleyoil.com/:path*',
        permanent: true
      },

      // Trailing slash cleanup
      { source: '/:path*/', destination: '/:path*', permanent: true },

      // index.html cleanup
      { source: '/:path*/index.html', destination: '/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
