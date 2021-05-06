module.exports = {
  apps: [
    {
      name: "socialcomment",
      script: "./server.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
