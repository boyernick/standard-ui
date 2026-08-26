import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Dev-only: lets the preview browser reach the server over the loopback IP.
  allowedDevOrigins: ["127.0.0.1"],
  transpilePackages: [
    "@boyernick/standard-ui-react",
    "@central-icons-react/round-outlined-radius-2-stroke-1.5",
    "@central-icons-react/round-outlined-radius-2-stroke-2",
  ],
  async redirects() {
    return [
      { source: "/structure", destination: "/", permanent: true },
      { source: "/spacing", destination: "/", permanent: true },
      { source: "/layout", destination: "/", permanent: true },
      { source: "/breakpoints", destination: "/", permanent: true },
      { source: "/colors/:slug", destination: "/colors", permanent: true },
    ]
  },
}

export default nextConfig
