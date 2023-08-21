const Teacher = require("../models/Teacher");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getAllTeacher = async (req, res) => {
  const records = await Teacher.find({});
  return res
    .status(StatusCodes.OK)
    .json({ success: true, records, nbHits: records.length });
};

const insertManyTeacher = async (req, res) => {
  const data = req.body;
  if (!(data instanceof Array)) {
    throw new BadRequestError("Please provide documents in array");
  }

  if (data.length === 0) {
    throw new BadRequestError("Can't record empty data in teacher");
  }

  let records = await Teacher.insertMany(data);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: `${records.length} records inserted successfully...`,
  });
};

const addTeacher = async (req, res) => {
  let data = req.body;
  if (!data || Object.keys(data).length === 0 || !(data instanceof Object))
    throw new BadRequestError("Must provide all teacher's info");
  let teacher = await Teacher.create(data);
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, record: teacher });
};
module.exports = { getAllTeacher, insertManyTeacher, addTeacher };
