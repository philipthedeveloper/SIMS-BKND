const Parent = require("../models/Parent");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getAllParent = async (req, res) => {
  const records = await Parent.find({});
  return res
    .status(StatusCodes.OK)
    .json({ success: true, records, nbHits: records.length });
};

const insertManyParent = async (req, res) => {
  const data = req.body;
  if (!(data instanceof Array)) {
    throw new BadRequestError("Please provide documents in array");
  }

  if (data.length === 0) {
    throw new BadRequestError("Can't record empty data in parent");
  }

  let records = await Parent.insertMany(data);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: `${records.length} records inserted successfully...`,
  });
};

const addParent = async (req, res) => {
  let data = req.body;
  if (!data || Object.keys(data).length === 0 || !(data instanceof Object))
    throw new BadRequestError("Must provide all parent's info");
  let parent = await Parent.create(data);
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, record: parent });
};
module.exports = { getAllParent, insertManyParent, addParent };
