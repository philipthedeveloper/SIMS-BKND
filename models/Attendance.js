const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Must provide attendance date"],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "Must provide subject being recorded"],
    trim: true,
  },
  totalPresent: {
    type: Number,
    required: [true, "Please provide total student present"],
    trim: true,
    max: [100, "Total present cannot be greater than 100, got {VALUE}"],
    min: [0, "Total present cannot be less than 0, got {VALUE}"],
  },
  totalAbsent: {
    type: Number,
    required: [true, "Please provide total student absent"],
    trim: true,
    max: [100, "Total present cannot be greater than 100, got {VALUE}"],
    min: [0, "Total present cannot be less than 0, got {VALUE}"],
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
