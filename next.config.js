module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /app\.example\.tsx$/,
      use: "ignore-loader",
    });
    return config;
  },
};
