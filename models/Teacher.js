const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name already exist"],
      trim: true,
      requird: [true, "Must provide teacher name"],
    },
    grade: {
      type: String,
      trim: true,
      required: [true, "Must provide teacher grade"],
      enum: {
        values: ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"],
        message: `Invalid grade provided: {VALUE}`,
      },
    },
    yearsOfExperience: {
      type: String,
      trim: true,
      required: [true, "Must provide teacher's years of experience"],
      min: [1, "Years of experience cannot be less than 1, got {VALUE}"],
      max: [20, "Years of experience cannot be greater than 20, got {VALUE}"],
    },
    subject: {
      type: String,
      required: [true, "Must provide subject being recorded"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teachers", TeacherSchema);

module.exports = Teacher;
