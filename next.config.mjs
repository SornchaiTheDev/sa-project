/** @type {import('next').NextConfig} */
const nextConfig = {
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
