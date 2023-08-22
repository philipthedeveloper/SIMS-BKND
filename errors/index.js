const BadRequestError = require("./bad-request");
const CustomError = require("./custom-error");
const MethodNotAllowedError = require("./method-not-allowed");
const UnauthorizedError = require("./unauthorized");
const NotFoundError = require("./not-found");

module.exports = {
  BadRequestError,
  CustomError,
  MethodNotAllowedError,
  UnauthorizedError,
  NotFoundError,
};
