/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "rickandmortyapi.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
