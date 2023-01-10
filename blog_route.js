const router = require('express').Router();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

//var blogpath = `http:\\\\localhost:8080`;

var blogpath = `https:\\\\mockwebsite.min.farm`;

// var db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'hunter2',
//   database: 'mmt_website'
// });


var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'minfarm_ocr_admin',
  password: 'ah6G38rjji3y',
  database: 'minfarm_ocr'
});



function getRandomInt10() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}

router.get('/', async (req, res, next) => {
});

router.post('/subject/add', async (req, res, next) => {
  var sql = "INSERT INTO blog_subject (title) VALUES ?";
  var val = [[req.body.subject]];

  db.query(sql, [val], function (err, result) {
    if (err) {
      console.log('error', err.message, err.stack)
    } else {
      res.send({});
    }
  });
});

router.get('/subject/get', async (req, res, next) => {
  var sql = "SELECT title FROM blog_subject";

  db.query(sql, function (err, result) {
    if (err) {
      console.log('error', err.message, err.stack)
    } else {
      var titlelst = [];
      for (let i = 0; i < result.length; i++) {
        titlelst.push(result[i].title)
      }
      res.send({ "title": titlelst });
    }
  });
});

router.post('/subject/remove', (req, res, next) => {
  var sql = "DELETE FROM blog_subject WHERE title = " + mysql.escape(req.body.subject);
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({});
    }
  });
});

router.post('/uploads/post/add/id', async (req, res, next) => {
  var aid = getRandomInt10();
  res.send({ 'blog_id': aid });
});

router.post('/add/article', async (req, res, next) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  sampleFile = req.files.title_img;
  uploadPath = __dirname + '/uploads/blogpost/';

  fs.mkdir(path.join(uploadPath, req.body.blog_article_id), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });


  sampleFile.mv(uploadPath + req.body.blog_article_id + "/" + "titleimg.png", function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      var sql = "INSERT INTO article (aid, title, date, subject, author_id, context) VALUES ?"
      var val = [
        [req.body.blog_article_id, req.body.title, req.body.date, req.body.subject, "Jaegeun Oh", req.body.context]
      ]

      console.log(sql, val);
      db.query(sql, [val], function (err, result) {
        if (result) {
          res.send({ message: "Successfully register to the website." });
        }
      });
    }

  });
})

router.post('/get/articles', async (req, res, next) => {
  var sql = "SELECT * FROM article";
  //change
  let uploadPath = blogpath + '\\files\\uploads\\blogpost\\';

  db.query(sql, function (err, result) {
    if (err) {
      console.log('error', err.message, err.stack)
    } else {
      let aidlst = [];
      let title = [];
      let date = [];
      let subject = [];
      let path = []; //title_img

      for (let i = 0; i < result.length; i++) {
        aidlst.push(result[i].aid)
        title.push(result[i].title)
        date.push(result[i].date)
        subject.push(result[i].subject)
        path.push( `${uploadPath}${result[i].aid}\\titleimg.png` )
      }
      res.send({
        'aidlst': aidlst,
        'title': title,
        'date': date,
        'subject': subject,
        'path': path
      });
    }
  });

});

router.post('/edit/get/article', async (req, res, next) => {
  let sql = 'SELECT * FROM article WHERE aid = ?';
  let val = [[req.body.id]];
  let uploadPath = blogpath + '\\files\\uploads\\blogpost';

  db.query(sql, [val], function (err, result) {
    if (err) {
      console.log('error', err.message, err.stack)
    } else {
      var title = result[0].title;
      var context = result[0].context;
      var subject = result[0].subject;
      var title_img = `${uploadPath}\\${req.body.id}\\titleimg.png`

      res.send({
        "title": title,
        "context": context,
        "subject": subject,
        "title_img": title_img,
        "aid": req.body.id
      });
    }

  });
});

router.post('/edit/update/article', async (req, res, next) => {
  let sql = 'UPDATE article SET title = ' + mysql.escape(req.body.title) + ', subject = ' + mysql.escape(req.body.subject) + ', context = ' + mysql.escape(req.body.context) + 'WHERE aid = ?';
  let val = [[req.body.aid]];

  db.query(sql, [val], function (err, result) {
    if (err) {
      console.log('error', err.message, err.stack)
    } else {
      res.send({ 'message': "UPDATED" });
    }
  });
});

router.post("/upload/image", async (req, res, next) => {
  let sampleFile;
  let uploadPath;
  let data_aid = req.body.aid;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  sampleFile = req.files.files;
  uploadPath = __dirname + '\\uploads\\blogpost\\';

  fs.mkdir(path.join(uploadPath, data_aid), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });

  sampleFile.mv(uploadPath + data_aid + "\\" + sampleFile.name, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send({ link: 'uploads/blogpost/' + data_aid + "/" + sampleFile.name });
    }
  });
});

router.get('/files/:filename', async(req, res, next) => {
  console.log("bring");
});

module.exports = router;