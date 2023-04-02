const { LOGIN_TOKEN_KEY } = require("../../config/serverConfig");
const { verifyJwtToken } = require("../utils/authUtils");

const isLoggedIn = async (req, res, next) => {
  try {
    // get the x-access-token from the req header
    const jwtToken = req.headers[`x-access-token`];

    if (!jwtToken) {
      return res.status(401).send({
        err: `authentication token is missing in header kindly login `,
      });
    }
    const data = await verifyJwtToken(jwtToken, LOGIN_TOKEN_KEY);

    // after fetching the user token take the id of user and set as header in res for easy access
    req.headers.userId = data.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      err: `there is a problem while verifying the authentication of user kindly check accesstoken is correct or not`,
    });
  }
};

module.exports = {
  isLoggedIn,
};
