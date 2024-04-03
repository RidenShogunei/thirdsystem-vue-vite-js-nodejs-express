module.exports = function (conn) {
    const express = require('express');
    const router = express.Router();
    router.post('/', (req, res) => {
        console.log("get received!");
        console.log(req.body);
    
        let context = req.body.search;
    
        let sqlStr = `SELECT content FROM starrail WHERE content LIKE '%${context}%'`; 
    
        conn.query(sqlStr, (err, results) => {
            if (err) {
                console.error("查询失败：", err);
                // 设置 HTTP 响应状态码为 500
                res.status(500).send("查询失败");
            } else {
                console.log("查询成功");
                let detail = results.map(row => {
                    return {
                        text: row.content
                    }
                });
                console.log(detail);
                // 设置 HTTP 响应状态码为 200
                res.status(200).json({
                    code: 200,
                    data: detail
                });
            }
        });
    });
    return router;
}