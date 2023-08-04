module.exports = {
  apps: [
    {
      name: "Protocol-Server-bap-client",
      script: "./dist/app.js",
      watch: false,
      instances: 3,
    },
  ],
};
