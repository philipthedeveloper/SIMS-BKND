const { StatusCodes } = require("http-status-codes");
const Chats = require("../models/Chats");
const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/User");

const getAllChats = async (req, res) => {
  const { userId, name } = req.session.user;
  //   console.log(userId);
  const records = await Chats.find({
    $or: [{ createdBy: userId }, { recipientName: name }],
  });
  return res
    .status(StatusCodes.OK)
    .json({ success: true, records, nbHits: records.length });
};

const getSingleChat = async (req, res) => {
  const { chatId } = req.params;
  const { userId, name } = req.session.user;
  if (!chatId) throw new BadRequestError("Must provide chat Id");
  const chat = await Chats.findOne({
    $or: [{ createdBy: userId }, { recipientName: name }],
    _id: chatId,
  });
  if (!chat) throw new NotFoundError(`Chat with id ${chatId} not found!`);
  return res.status(StatusCodes.OK).json({ success: true, chat });
};

const createChat = async (req, res) => {
  const data = req.body;
  const { userId, name, accountType } = req.session.user;
  if (!data || Object.keys(data).length === 0)
    throw new BadRequestError("Must provide chat credentials");
  const { to, content } = data;
  if (!to || !content)
    throw new BadRequestError("Must provide sender, recipent and message");
  const recipient = await User.findById(to);
  if (!recipient) throw new BadRequestError("Recipient doesn't exist...");
  if (!data.chatId) {
    let newChat = await Chats.create({
      createdBy: userId,
      recipientName: recipient.name,
      recipientAccountType: recipient.accountType,
      senderName: name,
      senderAccountType: accountType,
      conversationWith: to,
      messages: [{ from: userId, to, content }],
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, chat: newChat });
  }
  const currentChat = await Chats.findById(data.chatId);
  currentChat.messages.push({ from: userId, to, content });
  await currentChat.save();
  return res.status(StatusCodes.OK).json({ success: true, chat: currentChat });
};

module.exports = { getAllChats, getSingleChat, createChat };
