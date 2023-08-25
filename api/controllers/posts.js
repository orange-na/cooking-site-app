const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("Not authentiacted!!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(400).json("Token is not valid!!");

    // const q =
    //   "SELECT posts.id, title, posts.desc, cost, category, uid, img, date, username, nickname, profileimg, profileicon FROM posts JOIN users ON posts.uid = users.id";

    const q = `
        SELECT
        p.id AS post_id,
        p.title AS post_title,
        p.desc AS post_desc,
        p.cost,
        p.category,
        p.uid,
        p.img,
        p.date,
        u.username,
        u.nickname,
        u.profileimg,
        u.profileicon,
        COUNT(l.id) AS like_count
        FROM
            posts p
        JOIN
            users u ON p.uid = u.id
        LEFT JOIN
            likes l ON p.id = l.postid
        GROUP BY
            p.id, p.title, p.desc, p.cost, p.category, p.uid, p.img, p.date, u.username, u.nickname, u.profileimg, u.profileicon;
`;

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
