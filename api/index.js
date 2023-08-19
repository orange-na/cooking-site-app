const express = require("express");
const pool = require("./db");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOption));
app.use(cookieparser());

app.get("/", (req, res) => {
  res.json("hello world!");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/api", (req, res) => {
  q = "SELECT * FROM users";
  pool.query(q, (err, results) => {
    if (err) return res.json(err);
    return res.json(results.rows);
  });
});

app.listen(8800, () => {
  console.log("connected to api!!");
});
