const mongoose = require("mongoose");
const { MONGODB_URL } = require("./serverConfig");

const DB_URL = MONGODB_URL;

const dbConnect = async () => {
  await mongoose.connect(DB_URL);
  console.log("Db is connected");
};

module.exports = dbConnect;
