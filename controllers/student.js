const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getAllStudent = async (req, res) => {
  const records = await Student.find({});
  return res
    .status(StatusCodes.OK)
    .json({ success: true, records, nbHits: records.length });
};

const insertManyStudent = async (req, res) => {
  const data = req.body;
  if (!(data instanceof Array)) {
    throw new BadRequestError("Please provide documents in array");
  }

  if (data.length === 0) {
    throw new BadRequestError("Can't record empty data in student");
  }

  let records = await Student.insertMany(data);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: `${records.length} records inserted successfully...`,
  });
};

module.exports = { getAllStudent, insertManyStudent };
