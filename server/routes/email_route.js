const router = require('express').Router();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
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

router.post('/send', async (req, res, next) => {
  let transporter = nodemailer.createTransport({
    host: "mockwebsite.min.farm",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "service@mockwebsite.min.farm", // generated ethereal user
      pass: "10qp10qp", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"[MMTPREP] Do-Not-Reply" <service@mockwebsite.min.farm>', // sender address
    to: "aiden1393@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world?</b>", // html body
    attachments: [{
      filename: 'text3.txt',
      path: '/path/to/file.txt'
    }]
  });

  console.log("Message sent: %s", info.messageId);
});

module.exports = router;