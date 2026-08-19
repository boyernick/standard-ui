import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: [
    "@boyernick/standard-ui-react",
    "@central-icons-react/round-outlined-radius-2-stroke-1.5",
    "@central-icons-react/round-outlined-radius-2-stroke-2",
  ],
  async redirects() {
    return [
      { source: "/spacing", destination: "/structure", permanent: true },
      { source: "/layout", destination: "/structure", permanent: true },
      { source: "/breakpoints", destination: "/structure", permanent: true },
    ]
  },
}

export default nextConfig
