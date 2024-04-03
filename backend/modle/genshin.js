const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    console.log("get received!");
    console.log(req.body);

    let context = req.body.search;
    let lang = req.body.lang;
    let sqlStr =
      "SELECT sentence FROM genshin WHERE sentence LIKE ? AND language = ?";
    let query = db.format(sqlStr, [`%${context}%`, lang]);
    db.query(query, (err, results) => {
      if (err) {
        console.error("查询失败：", err);
        res.status(500).send("查询失败");
      } else {
        console.log("查询成功");
        let detail = results.map((row) => {
          return {
            text: row.sentence,
          };
        });
        console.log(detail);
        res.status(200).json({
          code: 200,
          data: detail,
        });
      }
    });
  });

  return router;
};