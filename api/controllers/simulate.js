const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getOrder = (req, res) => {
  // ランダムに3つの値を選び、その合計が1000以下になるデータを取得するクエリ
  // const q = `
  //     SELECT *
  //     FROM posts
  //     WHERE cost <= $1
  //     ORDER BY random()
  //     LIMIT $2;
  //   `;

  const q = `
    SELECT *
    FROM posts  
    ORDER BY random()
    LIMIT $1;
`;

  // const values = [req.body.limit, req.body.term];

  // クエリを実行して結果を取得
  pool.query(q, [req.body.term], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      // クエリ結果から値を取得し、合計を計算
      const data = result.rows;
      const selectedValues = result.rows.map((row) => parseFloat(row.cost));
      const total = selectedValues.reduce((sum, cost) => sum + cost, 0);

      res.json({ selectedValues, total, data });

      // // 合計が1000以下の場合、値と合計を返す
      // if (total <= req.body.limit) {
      //   res.json({ selectedValues, total, data });
      // }
      // else {
      //   // 合計が1000を超える場合は再度クエリを実行
      //   res.redirect("http://localhost:8800/api/simulate/getorder");
      // }
    }
  });
};

module.exports = { getOrder };
