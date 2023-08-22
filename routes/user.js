const {
  createUser,
  logout,
  isAuth,
  signIn,
  getAllUsers,
} = require("../controllers/user");
const validateToken = require("../middlewares/validateToken");

const router = require("express").Router();

router.post("/signup", createUser);
router.post("/logout", logout);
router.get("/isauth", isAuth);
router.post("/login", signIn);
router.get("/all", validateToken, getAllUsers);

module.exports = router;
