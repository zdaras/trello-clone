module.exports = {
  apps: [
    {
      name: "app",
      script: "./dist/server.js",
      instances: "max",
      cwd: "/var/www/html/app/",
      env: {
        COMMON_VARIABLE: "true",
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    }
  ]
};
