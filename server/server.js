const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const db = require("./db/db");
const morgan = require("morgan");

const { v4: uuidV4 } = require('uuid'); //making classid
const { Server } = require("socket.io");

const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');


const app = express();
app.use(morgan("tiny"));

app.use(session({
  secret: '_lhvudxs%wfhb-ks2vh1l+_g&y)3rw$338d)ia4j&gf&^e_y-=',
  cookie: { secure: false },
  resave: true,
  saveUninitialized: true
}));

app.use(cors({credentials: true}));
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/blog', require('./routes/blog_route'));
app.use('/email', require('./routes/email_route'));
app.use('/invoice', require('./routes/invoice_route'));
app.use('/dashboard', require('./routes/dashboard_route'));
app.use('/conversation', require('./routes/conversation_route'));
app.use('/message', require("./routes/message_routes"))
app.use('/uploads', express.static('./uploads'));
const server = require('http').Server(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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



var sess;

function getRandomInt() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function getRandomInt3() {
  return Math.floor(Math.random() * 900) + 99;
}

let users = [];
let calls = [];
// const socketToRoom = {};

const addUser = (userId, socketId) => {
   users = users.filter((user)=> user.userId !== userId);
   users.push({userId: userId, socketId: socketId});
}
const removeUser = (socketId) => {
  users = users.filter((user)=> user.socketId !== socketId);
}
const findUser = (userId)=> {
  return users.find(user=> user.userId === userId);
}
const findCall = (callId)=> {
  return calls.find(call=> call.callId === callId);
}
const addUserInCall = (callId, userId)=>{
  calls = calls.map((call)=> {
    if(call.callId === callId){
      return {callId: callId, joinedMembers: [...call.joinedMembers, userId]};
    }else{
      return call;
    }
  })
}

io.on('connection', (socket)=> {
     socket.on('addUser', (userId)=> {
       addUser(userId, socket.id);
        io.emit('getUsers', users);
     })
     socket.on('disconnect', ()=> {
       removeUser(socket.id);
       setTimeout(()=> {
        io.emit('getUsers', users);
      }, 750)
     })
    socket.on('sendMessage', ({messageId, conversationId, senderId, receiverId,  text, readStatus, messageCreated, attachment})=> {
         let user = findUser(receiverId);
         socket.to(user?.socketId).emit('receiveMessage', {messageId,conversationId,senderId, text, readStatus, messageCreated, attachment})
    })
    socket.on('newConversation', (data)=> {
      let user = findUser(data?.to);
      socket.to(user?.socketId).emit('newConversation', data);
    });
    socket.on('callUser', (data)=> {
      
      let user = findUser(data?.receiverId);
      let call = findCall(data?.callId);
      if(!call){
        calls.push({callId: data.callId, conversationId: data.conversationId, joinedMembers: data.joinedMembers, groupName: data?.groupName})
      }
      socket.to(user?.socketId).emit('callUser', data);    
    });

    socket.on('acceptedCall', (data)=> {
      let user = findUser(data?.callerId);
      socket.to(user?.socketId).emit('acceptedCall', data);
     
    });
    socket.on('rejectedCall', (data)=> {
      let user = findUser(data?.callerId);
      socket.to(user?.socketId).emit('rejectedCall', data);
     
    });
    socket.on('callEnded', (data)=> {
      let user = findUser(data?.to);
      socket.to(user?.socketId).emit('callEnded', data);
    });
    socket.on("getAddedUsersByCallId", (data)=> {
      let call = findCall(data.callId);
      let user = findUser(data.accepterId);
      if(call){

        addUserInCall(data.callId, data.accepterId);
    }
      if(user){
       io.to(user.socketId).emit("usersByCallId", call);
      }
      
   });
   
    socket.on("joinUserInCall",(data)=> {
   
      let user = findUser(data?.receiverId);

      io.to(user?.socketId).emit('joinUserInCall', data);
    


    });


    socket.on('confirmAccepted', (data)=> {
      
      let user = findUser(data.peerSenderId);
      io.to(user?.socketId).emit('confirmAccepted', data);
    })
    socket.on("leaveCall", (data)=>{

      let call = findCall(data.callId);
    
      let mems = call?.joinedMembers.filter((mem)=> mem !== data?.userId);
      calls = calls.map((call)=> {
        if(call.callId === data.callId){
          return {...call, joinedMembers: mems};
        }else{
          return call;
        }
      })
      mems?.forEach(mem => {
         let user = findUser(mem);
         io.to(user?.socketId).emit('userLeft', data);
         
        //  io.to(user?.socketId).emit('callUpdate',{msg: `${data.username} has left the call`} );
      });
    })



      
})


// io.on('connection', (socket) => {
//   socket.on("join room", roomID => {
//     if (users[roomID]) {
//       users[roomID].push(socket.id);
//     } else {
//       users[roomID] = [socket.id];
//     }
//     socketToRoom[socket.id] = roomID;
//     const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
//     socket.emit("all users", usersInThisRoom);
//   });

//   socket.on('sendElements', ({ myId, elements }) => {
//     io.to(myId).emit('revieveElement', { elements });
//   });

//   socket.on('onDraw', ({ userId, data }) => {
//     io.to(userId).emit('onDraw', { data });
//   });

//   socket.on("join_chat_room", data => {
//     socket.join(data);
//   });

//   socket.on("sending signal", payload => {
//     io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
//   });

//   socket.on("returning signal", payload => {
//     io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
//   });

//   socket.on("send_message", data => {
//     socket.to(data.id).emit("receive_message", data);
//   });

//   socket.on('disconnect', () => {
//     const roomID = socketToRoom[socket.id];
//     let room = users[roomID];
//     if (room) {
//       room = room.filter(id => id !== socket.id);
//       users[roomID] = room;
//     }
//   });

// });

app.post('/upload', async function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  sampleFile = req.files.file;
  uploadPath = __dirname + '/uploads/' + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

app.get('/uploads/get/:file', async function (req, res, next) {
  var filenamewithpath = __dirname + '/uploads/' + req.params.file;
  if (!fs.existsSync(filenamewithpath)) {
    res.status(404).json({ 'message': 'file not found' })
    return;
  }
  res.download(filenamewithpath)
});

app.post("/user/add/info/manually", async(req, res) => { //Add by manager
  var uid = getRandomInt();
  var sql = 'INSERT INTO accounts (child_list, id, Fname, Lname, Role, status,  Pnumber, Address, Zip, email, numofchild, invoice, age, birthday, gender, school, grade, expected_grad, emergency_1_n, emergency_1_p, emergency_2_n, emergency_2_p, note, password) VALUES ?';
  var val = [
    [req.body.child_list, uid, req.body.firstName, req.body.lastName, req.body.role, req.body.status, req.body.phoneNumber, req.body.address, req.body.zip, req.body.email, req.body.noOfChild, '0', req.body.age, req.body.birthday, req.body.gender, req.body.school, req.body.grade, req.body.expectedGraduate, req.body.emergencyContactName1, req.body.emergencyContactNo1, req.body.emergencyContactName2, req.body.emergencyContactNo2, req.body.notes, "mmt1234!"]
  ];
  db.query(sql, [val], function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        id: uid,
        name: req.body.firstName + ", " + req.body.lastName,
        email: req.body.email,
        status: req.body.status,
        role: req.body.role,
        invoice: 0
      });
    }
  });

});

app.post("/user/add/info", async(req, res) => {
  var sql = 'INSERT INTO accounts (id, Fname, Lname, Role, status,  Pnumber, Address, Zip, email, password) VALUES ?';
  var val = [
    [getRandomInt(), req.body.fname, req.body.lname, req.body.role, "Registered", req.body.pnum, req.body.address, req.body.zip, req.body.email, req.body.pswd]
  ];
  db.query(sql, [val], function (err, result) {
    if (result) {
      console.log("good");
      res.send({ success: "Successfully register to the website." });
    }
  });

});

app.post("/user/login", async(req, res) => {
  var sql = 'SELECT * FROM accounts WHERE email = ' + mysql.escape(req.body.uid);
  db.query(sql, function (err, result) {
    if (result[0]) {
      if (result[0].password == req.body.password) {
        req.session.login = true;
        req.session.uid = result[0].id;
        req.session.role = result[0].Role;
        req.session.save();
        res.send({
          message: "Login",
          login: "True",
          uid: result[0].id,
          role: result[0].Role
        });
       
      } else {
        res.send({ message: "login Failed" });
      }
    } else {
      res.send({ message: "login Failed" });
    }
  });
});

app.get("/user/get/info/member/all", async(req, res) => {
  var sql = 'SELECT * FROM accounts';
  var name = [];
  var id = [];
  var email = [];
  var status = [];
  var Role = [];
  var invoice = [];
  db.query(sql, function (err, result) {

    for (let i = 0; i < result.length; i++) {
      id.push(result[i].id);
      name.push(result[i].Fname + ", " + result[i].Lname);
      email.push(result[i].email);
      status.push(result[i].status);
      Role.push(result[i].Role);
      invoice.push(result[i].invoice);
    }
    res.send({
      id: id,
      name: name,
      email: email,
      status: status,
      Role: Role,
      invoice: invoice
    });
  });
});

app.get("/user/get/one/info", async(req, res) => {
  //remove
  // req.session.uid = "53531";
  console.log(req.sessionID)
  var sql = 'SELECT * FROM accounts WHERE id = ' + mysql.escape(req.session.uid);
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        info: result[0]
      });
    }
  });
});

app.post("/user/get/info/member/id", async(req, res) => {
  var sql = 'SELECT * FROM accounts WHERE id = ' + mysql.escape(req.body.uid);
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        info: result[0]
      });
    }
  });
});

app.post("/user/update/info/member/id", async(req, res) => {
  var sql = `UPDATE accounts SET `
  + `child_list=` + mysql.escape(req.body.child_list)
  + `, Fname=` + mysql.escape(req.body.firstName)
  + `, Lname=` + mysql.escape(req.body.lastName)
  + `, Role=` + mysql.escape(req.body.role)
  + `, status=` + mysql.escape(req.body.status)
  + `, Pnumber=` + mysql.escape(req.body.phoneNumber)
  + `, Address=` + mysql.escape(req.body.address)
  + `, Zip=` + mysql.escape(req.body.zip)
  + `, email=` + mysql.escape(req.body.email)
  + `, numofchild=` + mysql.escape(req.body.noOfChild)
  + `, age=` + mysql.escape(req.body.age)
  + `, birthday=` + mysql.escape(req.body.birthday)
  + `, gender=` + mysql.escape(req.body.gender)
  + `, school=` + mysql.escape(req.body.school)
  + `, grade=` + mysql.escape(req.body.grade)
  + `, expected_grad=` + mysql.escape(req.body.expectedGraduate)
  + `, emergency_1_n=` + mysql.escape(req.body.emergencyContactName1)
  + `, emergency_1_p=` + mysql.escape(req.body.emergencyContactNo1)
  + `, emergency_2_n=` + mysql.escape(req.body.emergencyContactName2)
  + `, emergency_2_p=` + mysql.escape(req.body.emergencyContactNo2)
  + `, note=` + mysql.escape(req.body.notes)
  + ` WHERE id =` + mysql.escape(req.body.uid);
  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({});
    }
  });

});

app.get("/user/get/login", async(req, res) => {
  //Remove
  req.session.login = "True";
  req.session.uid = "53531";
  req.session.role = "admin";
  if (req.session.login) {
    res.send({
      message: "True",
      role: req.session.role
    })
  } else {
    res.send({ message: "False" })
  }
});

app.post("/user/get/info/addressNphoneNname", async(req, res) => {
  var sql = 'SELECT * FROM accounts WHERE id = ' + mysql.escape(req.body.id);
  var pnum = [];
  var email = [];
  var name = [];
  var uid = [];
  var address = [];

  db.query(sql, function (err, result) {
    for (let i = 0; i < result.length; i++) {
      pnum.push(result[i].Pnumber);
      email.push(result[i].email);
      name.push(result[i].Fname + ", " + result[i].Lname);
      address.push(result[i].address);
      uid.push(result[i].id);
    }
    res.send({
      pnum: pnum,
      email: email,
      name: name,
      address: address,
      uid: uid
    });
  });
});

app.post("/user/get/info/parents/namenid", async(req, res) => {
  var sql = 'SELECT id FROM accounts WHERE Role = ' + mysql.escape("parents");
  var id = [];
  var name = [];

  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      for (let i = 0; i < result.length; i++) {
        id.push(result[i].id);
        var sql2 = 'SELECT * FROM accounts WHERE id = ' + mysql.escape(result[i].id);
        db.query(sql2, function (err, result) {
          for (let i = 0; i < result.length; i++) {
            name.push(result[i].Fname + ", " + result[i].Lname);
          }
        });
      }

      db.query("", function (err, result) {
        res.send({
          p_lst: name,
          p_idlst: id
        });
      });
    }
  });
});

app.post("/class/add", async(req, res) => {
  var sql = 'INSERT INTO class_lst (id, name, description, price) VALUES ?';
  var val = [
    [getRandomInt3(), req.body.title, req.body.describe, req.body.price]
  ];

  db.query(sql, [val], function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({
        message: "Add class to the list successfully."
      });
    }
  });
});

app.post("/class/get/one", (req, res) => {
  var sql = 'SELECT * FROM class_lst WHERE id = ' + mysql.escape(req.body.cid);
  var title = [];
  var price = [];
  var description = [];

  db.query(sql, function (err, result) {
    for (let i = 0; i < result.length; i++) {
      title.push(result[i].name);
      price.push(result[i].price);
      description.push(result[i].description);
    }
    res.send({
      title: title,
      price: price,
      description: description
    });
  });
});

app.post("/class/get/all", (req, res) => {
  var sql = 'SELECT * FROM class_lst';
  var title = [];
  var price = [];
  var description = [];
  var cid = [];

  db.query(sql, function (err, result) {
    for (let i = 0; i < result.length; i++) {
      title.push(result[i].name);
      price.push(result[i].price);
      description.push(result[i].description);
      cid.push(result[i].id);
    }
    res.send({
      title: title,
      price: price,
      description: description,
      cid: cid
    });
  });
});

app.post("/google/get/info", async (req, res, next) => {
  let sql = 'SELECT * FROM accounts WHERE email = ' + mysql.escape(req.body.email);

  db.query(sql, function (err, result) {
    if (result[0]) {
      req.session.login = true;
      req.session.role = result[0].Role;
      req.session.uid = result[0].id;
      res.send({
        'message': "Login"
      });
    } else {
      res.send({
        'register': "need to add the info to the server",
        'gmail': req.body.email
      });
    }
  });
});

app.get("/files/uploads/blogpost/:id/:img", async (req, res, next) => {
  var custom_path = __dirname + "/routes/uploads/blogpost/" + req.params.id;
  var filePath = path.join(custom_path, req.params.img);
  res.download(filePath);
});

app.get("/files/uploads/profile/:file", async (req, res, next) => {
  var custom_path = __dirname + "/routes/uploads/profile/";
  var filePath = path.join(custom_path, req.params.file);
  res.download(filePath);
});

app.get("/files/uploads/testmonial/:file", async (req, res, next) => {
  var custom_path = __dirname + "/routes/uploads/testmonial/";
  var filePath = path.join(custom_path, req.params.file);
  res.download(filePath);
});

app.post("/search/child/by/name", async (req, res, next) => {
  var search = req.body.child_search;
  let sql = "SELECT * FROM accounts WHERE Fname LIKE '%" + search + "%'";

  db.query(sql, function (err, result) {
    var uid = [];
    var Fname = [];
    var Lname = [];
    var role = [];

    for (let i = 0; i < result.length; i++) {
      uid.push(result[i].id);
      Fname.push(result[i].Fname);
      Lname.push(result[i].Lname);
      role.push(result[i].Role);
    }

    res.send({
      'uid': uid,
      'Fname': Fname,
      'Lname': Lname,
      'role': role
    })
  });
});


/*
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

// db.connect(function (err) {
//   console.log("[mysql error]", err);
// });

server.listen(8080, () => {
  console.log("SERVER IS RUNNING");
});