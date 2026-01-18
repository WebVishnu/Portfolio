/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    // Avoid bundling @mediapipe/tasks-vision for the server; it can break __webpack_require__ / chunk resolution.
    serverComponentsExternalPackages: ["@mediapipe/tasks-vision"],
  },
};

module.exports = nextConfig;
