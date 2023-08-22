const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name already exist"],
      trim: true,
      requird: [true, "Must provide parent name"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Email already exist"],
      required: [true, "Must provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, "Must provide phone number"],
      unique: [true, "Phone Number already exist"],
    },
  },
  { timestamps: true }
);

const Parent = mongoose.model("Parents", ParentSchema);

module.exports = Parent;
