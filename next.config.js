const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "user",
        mongodb_password: "Shindy!12at",
        mongodb_clustername: "express-cluster",
        mongodb_database: "my-site-dev",
      },
    };
  }
  return {
    env: {
      mongodb_username: "user",
      mongodb_password: "Shindy!12at",
      mongodb_clustername: "express-cluster",
      mongodb_database: "my-site",
    },
  };
};
