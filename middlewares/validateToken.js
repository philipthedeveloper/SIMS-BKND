const { StatusCodes } = require("http-status-codes");
const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateToken = async (req, res, next) => {
  // if (!req.session || !req.session.isAuth || !req.signedCookies.accessToken) {
  //   throw new UnauthorizedError("Unauthorized User");
  // }
  if (!req.session || !req.session.isAuth || !req.cookies.accessToken) {
    throw new UnauthorizedError("Unauthorized User");
  }
  // const token = req.signedCookies.accessToken;
  const token = req.cookies.accessToken;
  const isValidToken = jwt.verify(token, process.env.JWT_SECRET, {
    issuer: process.env.ISSUER,
  });
  if (!isValidToken)
    throw new UnauthorizedError("Compromised access token. Try login in again");
  const user = await User.find({ _id: isValidToken._id });
  if (!user) {
    throw new UnauthorizedError("Unauthorized User");
  }
  next();
};

module.exports = validateToken;
