const db = require("../db/db");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const fs = require('fs');

const createMessage = async(req, res) => {
    try{
        // let id = uuidv4();
        let query = `INSERT INTO messages(messageId, conversationId, senderId, readStatus, text, attachment)VALUES('${req.body.messageId}', '${req.body.conversationId}', '${req.body.senderId}','${req.body.readStatus}' ,'${req.body.text}', '${req.body.attachment}' )`
        db.query(query, function(err, data){
            if(!err){
                res.status(200).json(data);
            }else{
                console.log(err);
                res.status(500).json(err);
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}
const getMessagesByConversationId = async(req, res) => {
    try{
       let q = `SELECT * FROM messages WHERE conversationId = '${req.params.id}'`;
       db.query(q, (err, data)=> {
        if(!err){
            res.status(200).json(data);
        }
       })
    }catch(err){
        res.status(500).json(err);

    }
}
const getLastMessageByConversationId = async(req, res)=> {
    try{
      let q = `SELECT * FROM messages WHERE conversationId = '${req.params.id}' ORDER BY messageCreated DESC LIMIT 1`;
      db.query(q, (err, data)=> {
        if(!err){
            res.status(200).json(data);
        }else{
            console.log(err);
            res.status(500).json(err);
        }
      })
    }catch(err){
        res.status(500).json(err);
    }
}
const getUnreadMessagesCountByConversationId = async(req, res) => {
    try{
      let query = `SELECT COUNT(messageId) AS unreadMessages  FROM messages WHERE conversationId = '${req.params.id}' AND readStatus = 0`
      db.query(query, (err, result)=> {
        if(!err){
            res.status(200).json(result);
        }else{
            res.status(500).json(err);
        }
      })  
    }catch(err){
        res.status(500).json(err);
    }
}

const uploadAttachment = async(req, res)=> {
    try{
        if(req.files?.attachment){
            let id = uuidv4();
            let attachmentFile = req.files.attachment;
             uploadDir = path.join(__dirname, '..', 'uploads/' ,id)
            //  uploadPath = path.join(__dirname, '..', 'uploads/' ,attachmentFile.name)
             attachment = attachmentFile.name;
             fs.mkdir(uploadDir, (err) => {
                if(err){
                    console.log(err)
                }
              });
             attachmentFile.mv(uploadDir + '/' + attachment, function(err){
                 if(err){
                     console.log(err);
                 }else{
                    res.status(200).json({name: id + '/' + attachment});
                 }
             })
         }
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

const updateReadStatus = async(req, res)=> {
    try{
    let query = `UPDATE messages SET readStatus = true WHERE messageId = '${req.params.id}'`;
    db.query(query, (err, data)=> {
        if(!err){
            res.status(200).json(data)
        }else{
            res.status(500).json(err);
        }
    })
    }catch(err){
        res.status(500).json(err);
    }
}
const addReadStatus = async(req, res)=> {
    try{
        let id = uuidv4();
        let query = `SELECT * FROM messages where messageId = "${req.body.messageId}"`;
        
        
        //  query = `INSERT INTO readStatuses(statusId, messageId, userId, readStatus) VALUES("${id}", "${req.body.messageId}", "${req.body.userId}", 1)`;
        db.query(query, (err, data)=> {
            if(!err){
                
                let readBy = data[0]?.readBy;
                if(!readBy){
                    readBy = req.body.userId;
                } else{
                    readBy = readBy + `,${req.body.userId}`; 
                }
                console.log("updating readBY: " + readBy)
                query = `UPDATE messages SET readBy = "${readBy}" WHERE messageId = "${req.body.messageId}"`;
                console.log(query)
                db.query(query, (err, data)=> {
                    if(!err){
                         res.status(200).json(data);
                    }else{
                        console.log(err)
                        res.status(500).json(err);
                    }
                })
            }else{

                res.status(500).json(err);
            }
        })

    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {createMessage, updateReadStatus,getMessagesByConversationId, getLastMessageByConversationId, getUnreadMessagesCountByConversationId,  uploadAttachment, addReadStatus};