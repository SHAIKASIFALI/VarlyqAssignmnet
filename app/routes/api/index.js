const express = require("express");
const authRouter = require("./auth");
const postRouter = require("./posts");
const userRouter = require("./users");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/users", userRouter);
module.exports = apiRouter;
