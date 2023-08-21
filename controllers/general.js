const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { StatusCodes } = require("http-status-codes");

const getRecordCounts = async (req, res) => {
  const teachers = await Teacher.count();
  const students = await Student.count();
  return res.status(StatusCodes.OK).json({ success: true, teachers, students });
};

module.exports = { getRecordCounts };
