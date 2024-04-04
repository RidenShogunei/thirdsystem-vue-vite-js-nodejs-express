const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const conn = mysql.createConnection({
  user:'',          //用户名
  password:'',  //密码
  host:'',     //主机（默认都是local host）
  database:'third'     //数据库名
});

app.use(cors());
app.use(bodyParser.json());

conn.connect(err => {
  if (err) {
    console.error(err, '如果不为null，则连接失败');
  } else {
    console.log('数据库连接成功');
    // 完成连接后，开启一个定时器，每隔一段时间发送一个查询至数据库服务，保持连接活跃
    setInterval(function () {
      conn.query('SELECT 1');
    }, 5000);

    // 连接成功后导入路由
    const getwordRouter = require('./modle/getword')(conn);

    app.use('/getword', getwordRouter);
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});