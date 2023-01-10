const router = require('express').Router();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const db = require("../db/db");
/*
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'minfarm_mmtwebsite',
  password: '{?LREcI=dEtD',
  database: 'minfarm_mmtwebsite'
});*/


// var db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   database: 'mmt_website'
// });

router.get('/', async (req, res, next) => {
});

router.post('/update/instructor/title', async (req, res, next) => {
  var sql = `UPDATE t_insturctor SET `
    + `page_title=` + mysql.escape(req.body.page_title) 
    + `, page_desc=` + mysql.escape(req.body.page_desc)
    + `, teachers=` + mysql.escape(req.body.cards);

  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        message: "Updated"
      });
    }
  });
});

router.post("/testmonial/upload/image", async (req, res, next) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {}

  sampleFile = req.files.files;
  uploadPath = __dirname + '/uploads/';

  fs.mkdir(path.join(uploadPath, "testmonial"), (err) => {

    console.log('Directory created successfully!');
  });

  sampleFile.mv(uploadPath + "/testmonial/" + sampleFile.name, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send({ link: 'uploads/testmonial/' + sampleFile.name });
    }
  });
});

router.post('/update/testmonial', async (req, res, next) => {
  var sql = `UPDATE testmonial SET ` + `context=` + mysql.escape(req.body.context);
  
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        message: "updated"
      });
    }
  });
});

router.get('/get/testmonial', async (req, res, next) => {
  var sql = "SELECT * from testmonial";
  
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        data: result[0]
      });
    }
  });
});

router.get('/get/instructor', async (req, res, next) => {
  var sql = "SELECT * from t_insturctor";
  
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        data: result[0]
      });
    }
  });
});

module.exports = router;