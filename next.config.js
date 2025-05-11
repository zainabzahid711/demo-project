/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing webpack config
  webpack: (config) => {
    config.module.rules.push({
      test: /app\.example\.tsx$/,
      use: "ignore-loader",
    });
    return config;
  },

  // Add these new configurations:
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },
  // For Strapi image optimization
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "wilful-juditha-tilde-2e2e9688.koyeb.app",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  },
};

module.exports = nextConfig;
