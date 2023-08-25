const express = require("express");
const { signup, login, logout, getposts } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.delete("/logout", logout);

router.get("/getposts", getposts);

module.exports = router;
