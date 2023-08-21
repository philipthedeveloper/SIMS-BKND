const router = require("express").Router();
const {
  getAllAttendance,
  insertManyAttendance,
} = require("../controllers/attendance");

router.get("/", getAllAttendance);
router.post("/", insertManyAttendance);

module.exports = router;
