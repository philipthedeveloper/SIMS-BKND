const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide name"],
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Must provide username"],
      trim: true,
      maxlength: [30, "Username cannot be more than 30 characters"],
      unique: [true, "Username must be unique"],
    },
    password: {
      type: String,
      required: [true, "Must provide password"],
      trim: true,
    },
    accountType: {
      type: String,
      trim: true,
      required: [true, "Must provide account type"],
      enum: {
        values: ["Parent", "Teacher"],
        message: "Invalid accountType: GOT {VALUE}",
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateToken = function ({ username, _id }) {
  let issuer = process.env.ISSUER;
  let secret = process.env.JWT_SECRET;
  let expiration = process.env.JWT_EXPIRATION;
  return jwt.sign({ username, _id }, secret, { issuer, expiresIn: expiration });
};

UserSchema.methods.comparePassword = async function (inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, this.password);
  } catch (error) {
    console.log("Error occured while hashing password...", error);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
