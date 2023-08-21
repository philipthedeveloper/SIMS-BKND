const { StatusCodes } = require("http-status-codes");
const Attendance = require("../models/Attendance");
const { BadRequestError } = require("../errors");

const getAllAttendance = async (req, res) => {
  const records = await Attendance.find({});
  return res
    .status(StatusCodes.OK)
    .json({ success: true, records, nbHits: records.length });
};

const insertManyAttendance = async (req, res) => {
  const data = req.body;
  if (!(data instanceof Array)) {
    throw new BadRequestError("Please provide documents in array");
  }

  if (data.length === 0) {
    throw new BadRequestError("Can't record empty data in attendance");
  }

  let records = await Attendance.insertMany(data);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: `${records.length} records inserted successfully...`,
  });
};

module.exports = { getAllAttendance, insertManyAttendance };
