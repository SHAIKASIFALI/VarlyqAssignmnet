const express = require("express");
const {
  httpGetUser,
  httpCreateUser,
  httpUpdateUser,
  httpDeleteUser,
} = require("../../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/", httpGetUser); // get all the users

userRouter.post("/", httpCreateUser); // create a new user

userRouter.patch("/:id", httpUpdateUser); //update the details of specific user

userRouter.delete("/:id", httpDeleteUser); // delete a specific user

module.exports = userRouter;
