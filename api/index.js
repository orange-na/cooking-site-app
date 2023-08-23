const express = require("express");
const pool = require("./db");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const simulateRouter = require("./routes/simulate");
const likeRouter = require("./routes/likes");
const multer = require("multer");
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    // ファイルがアップロードされた場合の処理
    const file = req.file;
    res.status(200).json(file.filename);
  } else {
    // ファイルがアップロードされなかった場合の処理
    res.status(200).json("No file uploaded");
  }
});

app.get("/", (req, res) => {
  res.json("hello world!");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/simulate", simulateRouter);
app.use("/api/likes", likeRouter);

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
