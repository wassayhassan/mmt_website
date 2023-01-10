const router = require('express').Router();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const db = require("../db/db")

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

router.get('/get/all', async (req, res, next) => {
  var sql = "SELECT * from invoice";
  
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        data: result
      });
    }
  });
});

router.post('/get/all/by/id', async (req, res, next) => {
  var sql = "SELECT * from invoice WHERE id = " + mysql.escape(req.body.id);;
  
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        data: result
      });
    }
  });
});

router.post('/update/by/id', async (req, res, next) => {
  let sql = `UPDATE invoice SET id=` + mysql.escape(req.body.id)
   + `, title=` + mysql.escape(req.body.title) 
   + `, creator=` + mysql.escape(req.body.creator)
   + `, c_name=` + mysql.escape(req.body.c_name)
   + `, c_email=` + mysql.escape(req.body.c_email)
   + `, c_pnum=` + mysql.escape(req.body.c_pnum)
   + `, c_uid=` + mysql.escape(req.body.c_uid)
   + `, total=` + mysql.escape(req.body.total)
   + `, i_date=` + mysql.escape(req.body.i_date)
   + `, f_date =` + mysql.escape(req.body.f_date)
   + `, paid=` + mysql.escape(req.body.paid)
   + `, status=` + mysql.escape(req.body.status)
   + `, i_lst=` + mysql.escape(req.body.i_lst)
   + `, note=` + mysql.escape(req.body.note)
   + `, subp=` + mysql.escape(req.body.subp)
   + `, subop=` + mysql.escape(req.body.subop)
   + `, paid_history=` + mysql.escape(req.body.paid_history)
   + `, Remains=` + mysql.escape(req.body.Remains)
   + `WHERE id=` + mysql.escape(req.body.id);

  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        message: "invoice updated"
      });
    }
  });
});

router.post('/add', async (req, res, next) => {
  var sql = "INSERT INTO invoice (id, title, creator, c_name, c_email, c_pnum, c_uid, total, i_date, f_date, paid, status, i_lst, note, subp, subop) VALUES ?";
  var val = [
    [req.body.id, req.body.title, req.body.creator, req.body.c_name, req.body.c_email, req.body.c_pnum, req.body.c_uid, req.body.total, req.body.i_date, req.body.f_date, req.body.paid, req.body.status, req.body.i_lst, req.body.note, req.body.subp, req.body.subop]
  ];
  
  db.query(sql, [val], function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        'message': "updated"
      });
    }
  });
});

module.exports = router;