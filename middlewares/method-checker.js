const { MethodNotAllowedError } = require("../errors");

const methodChecker = (req, res, next) => {
  const ALLOWED_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
    "HEAD",
  ];
  if (!ALLOWED_METHODS.includes(req.method))
    throw new MethodNotAllowedError(`${req.method} METHOD NOT ALLOWED!`);
  next();
};

module.exports = methodChecker;
