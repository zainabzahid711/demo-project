/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Absolute path to your Strapi admin directory
    const strapiAdminPath = require("path").resolve(
      __dirname,
      "demo-strapi/src/admin"
    );

    // Ignore the entire Strapi admin directory
    config.plugins.push(
      new (require("webpack").IgnorePlugin)({
        resourceRegExp: new RegExp(
          `^${strapiAdminPath.replace(/\\/g, "\\\\")}`
        ),
      })
    );
    return config;
  },
};

// Use module.exports for CommonJS compatibility
module.exports = nextConfig;
