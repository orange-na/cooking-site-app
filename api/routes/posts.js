const express = require("express");
const { getPosts, addPost, deletePost } = require("../controllers/posts");

const router = express.Router();

router.get("/get", getPosts);

router.post("/add", addPost);

router.delete("/delete", deletePost);

module.exports = router;
