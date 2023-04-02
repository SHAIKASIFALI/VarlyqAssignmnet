const redis = require("redis");
const { REDIS_PASSWORD, REDIS_HOST } = require("./serverConfig");

const redisClient = redis.createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: 11423,
  },
});

const redisConnect = async () => {
  await redisClient.connect();
  console.log("connected to redis cloud");
};

module.exports = { redisConnect, redisClient };
