const router = require("express").Router();
const {
  getAllParent,
  insertManyParent,
  addParent,
} = require("../controllers/parent");

router.get("/", getAllParent);
router.post("/many", insertManyParent);
router.post("/", addParent);

module.exports = router;
