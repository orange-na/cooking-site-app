const express = require("express");
const { getOrder } = require("../controllers/simulate");

const router = express.Router();

router.post("/getorder", getOrder);

module.exports = router;
