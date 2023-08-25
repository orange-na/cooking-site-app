const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
  q = "SELECT * FROM users WHERE email = $1";

  pool.query(q, [req.body.email], (err, results) => {
    if (err) return res.status(403).json(err);
    if (results.rows.length)
      return res.status(400).json("User already exists!!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (username, email, password, nickname) VALUES ($1, $2, $3, $4)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.nickname,
    ];

    pool.query(q, values, (err, results) => {
      if (err) return res.status(403).json(err);
      return res.status(200).json("User has been created!!");
    });
  });
};

const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = $1";

  pool.query(q, [req.body.email], (err, results) => {
    if (err) return res.status(403).json(err);
    if (!results.rows.length) return res.status(403).json("Email not found!!");

    const checkedPassword = bcrypt.compareSync(
      req.body.password,
      results.rows[0].password
    );

    if (!checkedPassword) return res.status(403).json("Password not found!!");

    const token = jwt.sign(results.rows[0].id, "secretkey");
    const { password, ...others } = results.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been loggen out!!");
};

const getposts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("Not authentiacted!!");

  jwt.verify(token, "secretkey", (err, userInfor) => {
    if (err) return res.status(403).json("Token is not valid!!");

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
        WHERE
            p.uid = ($1)
        GROUP BY
            p.id, p.title, p.desc, p.cost, p.category, p.uid, p.img, p.date, u.username, u.nickname, u.profileimg, u.profileicon;
`;

    pool.query(q, [userInfor], (err, results) => {
      if (err) return res.status(403).json(err);
      return res.status(200).json(results.rows);
    });
  });
};

module.exports = { signup, login, logout, getposts };
