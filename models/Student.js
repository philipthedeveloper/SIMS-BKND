const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      unique: true,
      trim: true,
      requird: [true, "Must provide student name"],
    },
    grade: {
      type: String,
      trim: true,
      required: [true, "Must provide student grade"],
      enum: {
        values: ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"],
        message: `Invalid grade provided: {VALUE}`,
      },
    },
    classroom: {
      type: String,
      trim: true,
      required: [true, "Must provide student grade"],
      enum: {
        values: ["A", "B", "C", "D", "E", "F"],
        message: `Invalid classroom provided: {VALUE}`,
      },
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Students", StudentSchema);

module.exports = Student;
