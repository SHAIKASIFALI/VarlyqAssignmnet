const http = require("http");
const app = require("./app/app");
const dbConnect = require("./config/dbConfig");
const { redisConnect, redisClient } = require("./config/redisConfig");
// const { redisClient } = require("./config/redisConfig");
const server = http.createServer(app);

const runServer = async () => {
  await dbConnect();
  await redisConnect();
  console.log(await redisClient.keys(`*`));
  server.listen(3000, () => {
    console.log("server is listening at port 3000");
  });
};

runServer();
