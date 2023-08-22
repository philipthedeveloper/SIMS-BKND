const {
  getAllChats,
  getSingleChat,
  createChat,
} = require("../controllers/chat");

const router = require("express").Router();

router.get("/", getAllChats);
router.post("/", createChat);
router.get("/:chatId", getSingleChat);

module.exports = router;
