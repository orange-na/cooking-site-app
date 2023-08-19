const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getOrder = (req, res) => {
  // ランダムに3つの値を選び、その合計が1000以下になるデータを取得するクエリ
  const query = `
      SELECT cost
      FROM posts  
      WHERE cost <= 1000
      ORDER BY random()
      LIMIT 3;
    `;

  // クエリを実行して結果を取得
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      // クエリ結果から値を取得し、合計を計算
      const selectedValues = result.rows.map((row) => row.cost);
      const total = selectedValues.reduce((sum, cost) => sum + cost, 0);

      // 合計が1000以下の場合、値と合計を返す
      if (total <= 1000) {
        res.json({ selectedValues, total });
      } else {
        // 合計が1000を超える場合は再度クエリを実行
        res.redirect("http://localhost:8800/api/simulate/getorder");
      }
    }
  });
};

module.exports = { getOrder };
