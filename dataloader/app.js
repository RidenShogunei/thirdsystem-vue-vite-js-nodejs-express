const fs = require("fs");
const mysql = require("mysql");
const csv = require("csv-parser");
const _ = require("lodash");

const conn = mysql.createConnection({
  user: "blog",
  password: "chen2003",
  host: "47.96.160.149",
  database: "third",
});

let words = {}; // empty dictionary to store words

// Loading words from word.csv
fs.createReadStream("word.csv")
  .pipe(csv({ separator: ">" }))
  .on("data", (data) => {
    words[data.vc_id] = { phoneticUs: data.vc_phonetic_us };
  }).on('end', function(){
    // Loading translations from word_translation.csv
    fs.createReadStream("word_translation.csv")
      .pipe(csv({ separator: "," }))
      .on("data", (data) => {
        let word = _.findKey(words, 'vc_vocabulary'); // find word id where 'vc_vocabulary' is equal data.word
        if (word){
          words[word].translation = data.translation;
        }
      }).on('end', function(){
        // Now we have a dictionary called words that we can use to look up word translations and pronunciations
        // proceed main function here
        conn.connect((err) => {
          if (err) {
            console.error(err, "连接失败");
          } else {
            console.log("数据库连接成功");
            insertDataFromFile(conn);
          }
        });
    });
  });

function insertDataFromFile(conn) {
  let bookId = "0f28b5d49b3020afeecd95b4"; // the id of the book

  const relationBookWordStream = fs.createReadStream("relation_book_word.csv").pipe(csv({ separator: ">" }));

  relationBookWordStream.on("data", (row) => {
    if (row.bv_book_id === bookId) {
      let wordId = row.bv_voc_id;
      let word = words[wordId];

      if (word){
        let sql = "INSERT INTO word (word, translation, note, book) VALUES (?, ?, ?, ?)";
        let values = [word.vc_vocabulary, word.translation, word.phoneticUs, "TOEFL"];
        conn.query(sql, values, (err, result) => {
          if (err) {
            console.error(`插入单词 ${word.vc_vocabulary} 时出现错误:`, err);
          } else {
            console.log(`Word: ${words[vc_id].vc_vocabulary} inserted`);
          }
        });
      }
    }
  });
}