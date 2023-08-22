const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Must provide sender name"],
      trim: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Must provide receiver name"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Must provide a message"],
      trim: true,
    },
  },
  { timestamps: true }
);

const ChatSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Must provide message author"],
    },
    recipientName: {
      type: String,
      required: [true, "Must provide recipient name"],
      trim: true,
    },
    recipientAccountType: {
      type: String,
      required: [true, "Must provide recipient account type"],
      trim: true,
    },
    senderName: {
      type: String,
      required: [true, "Must provide sender name"],
      trim: true,
    },
    senderAccountType: {
      type: String,
      required: [true, "Must provide sender account type"],
      trim: true,
    },
    conversationWith: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Must provide sender name"],
      trim: true,
    },
    messages: {
      type: [MessageSchema],
      required: [true, "Must provide chat message"],
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", ChatSchema);

module.exports = Chats;
