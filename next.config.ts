import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Dev + tunnels (ngrok): browser Origin is the public host, but the app runs locally.
   * Without this, Server Actions and some dev checks can fail silently behind ngrok.
   */
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "127.0.0.1",
        "*.ngrok-free.app",
        "*.ngrok.io",
        "*.ngrok.app",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
