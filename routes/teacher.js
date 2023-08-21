const router = require("express").Router();
const {
  getAllTeacher,
  insertManyTeacher,
  addTeacher,
} = require("../controllers/teacher");

router.get("/", getAllTeacher);
router.post("/many", insertManyTeacher);
router.post("/", addTeacher);

module.exports = router;
