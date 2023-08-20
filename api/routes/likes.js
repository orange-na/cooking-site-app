const express = require("express");
const { getLikes, addLike, deleteLike } = require("../controllers/likes");

const router = express.Router();

router.get("/get", getLikes);

router.post("/add", addLike);

router.delete("/delete", deleteLike);

module.exports = router;
