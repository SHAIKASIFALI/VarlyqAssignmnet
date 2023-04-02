const { redisClient } = require("../../config/redisConfig");
const { REFRESH_TOKEN_TIME } = require("../../config/serverConfig");
const User = require("../models/userModel");
const {
  generateJwtToken,
  generateRefreshToken,
} = require("../utils/authUtils");

const httpSignUp = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(201).send({
      data: user._id,
      success: true,
      msg: `user created succesfully in the database`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `something worng occurred while creating a user in db`,
    });
  }
};

const httpLogin = async (req, res) => {
  try {
    //first match the password
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password)))
      return res.status(401).json({
        err: `email or password is incorrect`,
      });

    // now generate the jwt token and refreshtoken
    const jwtToken = await generateJwtToken(user._id, email);
    const refreshToken = await generateRefreshToken(user._id, email);

    console.log(typeof refreshToken);

    // save the refreshtoken to redis cache to verify its validity

    await redisClient.set(
      refreshToken,
      user._id.toString(),
      `EX`,
      REFRESH_TOKEN_TIME
    );
    console.log(await redisClient.keys(`*`));

    // send the jwttoken and refresh token in httpheaders
    res.set(`x-access-token`, jwtToken);
    res.set(`x-refresh-token`, refreshToken);

    //return the jwt token and the refresh token
    return res.status(200).send({
      data: user._id,
      sucess: true,
      msg: `sucessfully logged in the user`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `something worng occurred while logging in the  a user in db`,
    });
  }
};

const httpLogout = async (req, res) => {
  try {
    // get the refresh token for the req header
    const refreshToken = req.headers["x-refresh-token"];

    // delete the refreshtoken from the redis database
    await redisClient.del(refreshToken);
    // return the res with authentication headers set as none
    res.set("x-access-token", null);
    res.set("x-refresh-token", null);

    return res.status(200).send({
      success: true,
      msg: `user logged out successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `something worng occurred while logging out a user`,
    });
  }
};

const httpRefreshToken = async (req, res) => {
  try {
    // get the refresh token from the req header
    const refreshToken = req.headers[`x-refresh-token`];

    // validate that refresh token by checking whether it resides in redis
    if (!(await redisClient.exists(refreshToken)))
      res.status(401).send({
        err: `invalid refresh token it may have expired kindly login again`,
      });

    // get the userid and generate new access token and refresh token and replace previous refresh token with new one
    const user_id = await redisClient.get(refreshToken);
    const user = await User.findById(user_id);

    // get the user email and generate the jwt
    const accessToken = await generateJwtToken(user_id, user.email);
    const newRefreshToken = await generateRefreshToken();

    // delete previous key in redis and insert new refreshtoken
    await redisClient.del(refreshToken);
    await redisClient.set(
      newRefreshToken,
      user._id.toString(),
      `EX`,
      REFRESH_TOKEN_TIME
    );

    // set as heades of response
    res.set(`x-access-token`, accessToken);
    res.set(`x-refresh-token`, newRefreshToken);

    return res.status(200).send({
      success: true,
      msg: `token refresh succesfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `something worng occurred while  refreshing a token`,
    });
  }
};
module.exports = {
  httpSignUp,
  httpLogin,
  httpLogout,
  httpRefreshToken,
};
