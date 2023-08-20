const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getLikes = (req, res) => {
  const q = "SELECT * FROM likes";
  //   const q = `SELECT
  // p.id AS post_id,
  // p.title AS post_title,
  // COUNT(l.id) AS like_count
  // FROM
  // posts p
  // LEFT JOIN
  // likes l ON p.id = l.postid
  // GROUP BY
  // p.id, p.title`;

  pool.query(q, (err, result) => {
    if (err) return res.status(403).json(err);
    return res.status(200).json(result.rows);
  });
};

const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("Not authentiacted!!");

  jwt.verify(token, "secretkey", (err, userInfor) => {
    if (err) return res.status(403).json("Token is not valid!!");

    const q = "SELECT * FROM likes WHERE postid = $1 AND likeuserid = $2";
    const values = [req.body.postid, userInfor];

    pool.query(q, values, (err, results) => {
      if (err) return res.status(403).json(err);
      if (results.rows.length) {
        const q = "DELETE FROM likes WHERE postid = $1 AND likeuserid = $2;";
        const values = [req.body.postid, userInfor];

        pool.query(q, values, (err, results) => {
          if (err) return res.status(403).json(err);
          return res.status(200).json("Like has been deleted!!");
        });
      } else {
        const q = 'INSERT INTO likes ("postid", "likeuserid") VALUES ($1, $2)';
        const values = [req.body.postid, userInfor];

        pool.query(q, values, (err, results) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Like has been pushed!!");
        });
      }
    });
  });
};

const deleteLike = (req, res) => {};

module.exports = { getLikes, addLike, deleteLike };
