const express = require("express");
const {
  httpSignUp,
  httpLogin,
  httpLogout,
  httpRefreshToken,
} = require("../../controllers/authControllers");
const authRouter = express.Router();

authRouter.post("/signup", httpSignUp);
authRouter.post("/login", httpLogin);
authRouter.get("/logout", httpLogout);
authRouter.get("/refreshtoken", httpRefreshToken);
module.exports = authRouter;
