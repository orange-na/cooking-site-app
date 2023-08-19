const express = require("express");
const { getOrder } = require("../controllers/simulate");

const router = express.Router();

router.get("/getorder", getOrder);

module.exports = router;
