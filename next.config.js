/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.vecteezy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.stockvault.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stockvault.net",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "pixabay.com",
      "cdn.pixabay.com",
      "www.freepik.com",
      "img.freepik.com",
      "images.vecteezy.com",
      "static.vecteezy.com",
      "www.stockvault.net",
      "stockvault.net",
    ],
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default config;
