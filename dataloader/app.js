const fs = require('fs');
const readline = require('readline');
const mysql = require('mysql');

const conn = mysql.createConnection({
  user: '',
  password: '',
  host: '',
  database: 'third',
});

conn.connect((err) => {
  if (err) {
    console.error(err, '连接失败');
  } else {
    console.log('数据库连接成功');
  }
});

// 使用readline模块来处理文件
const rl = readline.createInterface({
  input: fs.createReadStream('TOEFL_2.json'),
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const wordData = JSON.parse(line);
  insertData(conn, wordData);
});

function insertData(conn, wordData) {
  let sql = 'INSERT INTO word (ID, word, note, translation,book) VALUES (?, ?, ?, ?,?)';
  let values = [wordData.wordRank, wordData.headWord, wordData.content.word.content.usphone,wordData.content.word.content.trans[0].tranCn,"TOEFL"];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error(`插入单词 ${wordData.headWord} 时出现错误:`, err);
    } else {
      console.log(`Word: ${wordData.headWord} inserted`);
    }
  });
}