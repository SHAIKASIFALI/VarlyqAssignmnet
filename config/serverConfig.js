const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  LOGIN_TOKEN_KEY: process.env.LOGIN_TOKEN_KEY,
  LOGIN_TOKEN_TIME: parseInt(process.env.LOGIN_TOKEN_TIME),
  REFRESH_TOKEN_TIME: parseInt(process.env.REFRESH_TOKEN_TIME),
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
};
