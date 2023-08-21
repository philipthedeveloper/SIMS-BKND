const CustomError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class MethodNotAllowedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
  }
}

module.exports = MethodNotAllowedError;
