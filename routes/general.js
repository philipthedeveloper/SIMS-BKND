const { getRecordCounts } = require("../controllers/general");

const router = require("express").Router({ caseSensitive: true });

router.get("/count", getRecordCounts);

module.exports = router;
