const router = require("express").Router();
const { getAllStudent, insertManyStudent } = require("../controllers/student");

router.get("/", getAllStudent);
router.post("/", insertManyStudent);

module.exports = router;
