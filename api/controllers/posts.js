const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("Not authentiacted!!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(400).json("Token is not valid!!");

    const q =
      "SELECT posts.id, title, posts.desc, cost, category, uid, img, date, username, nickname, profileimg, profileicon FROM posts JOIN users ON posts.uid = users.id";

    pool.query(q, (err, results) => {
      if (err) return res.status(403).json(err);
      return res.status(200).json(results.rows);
    });
  });
};

const addPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).json("Not authentiacted!!");

  jwt.verify(token, "secretkey", (err, userInfor) => {
    if (err) return res.status(403).json("Not valid!!");

    const q =
      'INSERT INTO posts ("title", "desc", "cost", "category", "uid", "img") VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cost,
      req.body.cat,
      userInfor,
      req.body.img,
    ];

    pool.query(q, values, (err, results) => {
      if (err) return res.status(403).json(err);
      return res.status(200).json("Post has been created!!");
    });
  });
};

const deletePost = (req, res) => {};

module.exports = { getPosts, addPost, deletePost };
