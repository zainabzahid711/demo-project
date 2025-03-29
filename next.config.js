module.exports = {
  output: "standalone", // Isolates dependencies
  experimental: {
    outputFileTracingExcludes: {
      "**/*": ["**/demo-strapi/**", "**/@strapi/**"],
    },
  },
};
