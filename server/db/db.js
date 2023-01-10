const mysql = require('mysql2');

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mmt_website'
  });

  db.connect(function (err) {
    if(err){
        console.log(err)
    }
  });
  module.exports = db;
  