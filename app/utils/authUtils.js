const jwt = require("jsonwebtoken");
const {
  LOGIN_TOKEN_KEY,
  LOGIN_TOKEN_TIME,
} = require("../../config/serverConfig");
const { v4: uuidv4 } = require("uuid");
const generateJwtToken = async (userId, email) => {
  const jwtToken = await jwt.sign(
    {
      userId,
      email,
    },
    LOGIN_TOKEN_KEY,
    {
      expiresIn: LOGIN_TOKEN_TIME,
    }
  );
  return jwtToken;
};

const verifyJwtToken = async (token, LOGIN_TOKEN_KEY) => {
  return await jwt.verify(token, LOGIN_TOKEN_KEY);
};

const generateRefreshToken = async () => {
  return uuidv4();
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
  generateRefreshToken,
};
