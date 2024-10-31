/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;
