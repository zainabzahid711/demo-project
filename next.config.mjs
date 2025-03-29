// next.config.mjs
const nextConfig = {
  // Add this webpack config to explicitly exclude Strapi
  webpack: (config) => {
    config.module.rules.push({
      test: /demo-strapi[\\/]src[\\/]admin/,
      loader: "ignore-loader",
    });
    return config;
  },
};

export default nextConfig;
