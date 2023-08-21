const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { CustomError } = require("../errors");

const customErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  if (err.name === "ValidationError") {
    let message = Object.keys(err["errors"])
      .map((field) => err["errors"][field].message)
      .join(", ");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message });
  }
  if (err.code === 11000) {
    let message = "";
    if (err?.keyValue) {
      message = `Record with ${Object.keys(err.keyValue)
        .map((key) => `${key}: ${err.keyValue[key]}`)
        .join(", ")} already exist. Please try a new one.`;
    } else {
      if (err.message) {
        console.log("There is error message");
        message = `Record with ${duplicationErrorSplitter(
          err.message
        )} already exist. Please choose a new one.`;
      } else if (err.writeErrors) {
        message = `Record with ${err.writeErrors
          .map((wE) =>
            Object.values(wE)
              .map((val) => duplicationErrorSplitter(val?.errmsg))
              .join(", ")
          )
          .join(" ")} already exist. Please choose a new one`;
      }
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message });
  }
  // console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    err,
  });
};

const duplicationErrorSplitter = (str) => {
  let splitMessage = str.split("dup key:");
  let duplicatedField = splitMessage[splitMessage.length - 1]
    .replace(/{|}|\\"|\"/gm, "")
    .trim();
  return duplicatedField;
};
module.exports = customErrorHandler;
