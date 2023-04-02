const express = require("express");
const apiRouter = require("./routes/api");
const app = express();
const bodyParser = require("body-parser");

//configuring the necessary midllewares

app.use(bodyParser.json());
//configuring the routes
app.use("/api", apiRouter);

module.exports = app;
