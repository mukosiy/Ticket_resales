require("dotenv").config();

module.exports = {
  webpack: (config) => {
    config.node = {
      fs: "empty",
    };
    return config;
  },
  env: {
    DIRNAME: process.env.DIRNAME,
    GUID: process.env.GUID,
    PASSWORD: process.env.PASSWORD,
    EMAIL: process.env.EMAIL,
  },
};
