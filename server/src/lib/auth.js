const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { JWT_SECRET } = process.env;
import errors from "./errors";

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }
    return null;
  } catch (e) {
    throw new AuthenticationError(errors.SESSI0N_EXPIRED);
  }
};

module.exports = getUser;
