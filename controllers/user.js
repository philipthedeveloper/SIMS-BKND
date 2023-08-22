const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorizedError } = require("../errors");
const User = require("../models/User");
const Parent = require("../models/Parent");
const Teacher = require("../models/Teacher");

const createUser = async (req, res) => {
  const data = req.body;
  const { username, name, password, accountType } = data;
  if (
    !data ||
    Object.keys(data) === 0 ||
    !username ||
    !password ||
    !name ||
    !accountType
  )
    throw new BadRequestError("Must provide all credentials");
  if (accountType.toLowerCase() === "parent") {
    const parentExist = await Parent.findOne({
      name: { $regex: name, $options: "i" },
    });
    if (!parentExist)
      throw new BadRequestError(
        `Parent with name ${name} does exist. Contact the school admin`
      );
  } else if (accountType.toLowerCase() === "teacher") {
    const teacherExist = await Teacher.findOne({
      name: { $regex: name, $options: "i" },
    });
    if (!teacherExist)
      throw new BadRequestError(
        `Teacher with name ${name} does exist. Contact the school admin`
      );
  } else {
    throw new BadRequestError("Invalid account type");
  }
  const user = await User.create(data);
  const token = user.generateToken(user);
  const userDetails = {
    username: user.username,
    userId: user._id,
    accountType: user.accountType,
    name: user.name,
  };
  req.session.isAuth = true;
  req.session.user = userDetails;
  res.cookie("accessToken", token);
  // res.cookie("accessToken", token, {
  //   maxAge: 1000 * 60 * 60 * 2,
  //   httpOnly: true,
  //   signed: true,
  // });
  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Account created succcessfully",
    user: userDetails,
    token,
  });
};

const logout = async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.clearCookie("accessToken");
  // res.clearCookie("accessToken", {
  //   httpOnly: true,
  //   signed: true,
  // });
  // res.clearCookie("connect.sid");
  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Logout successfully" });
};

const isAuth = async (req, res) => {
  if (!req.session || !req.session.isAuth)
    throw new UnauthorizedError("User not anthenticated");
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User is authorized",
    isAuth: true,
    user: req.session.user,
  });
};

const signIn = async (req, res) => {
  const data = req.body;
  if (!data.username || !data.password || Object.keys(data) === 0 || !data)
    throw new BadRequestError("Must provide username and password");
  const user = await User.findOne({ username: data.username });
  if (!user) throw new BadRequestError("Invalid username or password");
  const isCorrectPassword = await user.comparePassword(data.password);
  if (!isCorrectPassword)
    throw new BadRequestError("Invalid username or password");
  const token = user.generateToken(user);
  const userDetails = {
    username: user.username,
    userId: user._id,
    accountType: user.accountType,
    name: user.name,
  };
  req.session.isAuth = true;
  req.session.user = userDetails;
  res.cookie("accessToken", token);
  // res.cookie("accessToken", token, {
  //   maxAge: 1000 * 60 * 60 * 2,
  //   httpOnly: true,
  //   signed: true,
  // });
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "login successful",
    user: userDetails,
  });
};

const getAllUsers = async (req, res) => {
  const records = await User.find({});
  return res
    .status(StatusCodes.OK)
    .json({ success: true, records, nbHits: records.length });
};

module.exports = { createUser, logout, isAuth, signIn, getAllUsers };
