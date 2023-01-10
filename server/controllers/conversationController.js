const db = require("../db/db");
const { v4: uuidv4 } = require('uuid');
const { Console } = require("console");

const createConversation = async(req, res) => {
    try{
        let members = req.body.members;

        console.log(members)
        if(members.length > 0){
            const conid = uuidv4();
            let query = `INSERT INTO conversations(conversationId, createdBy, active, groupName) VALUES("${conid}", "${req.body.createdBy}", 1, "${req.body.groupName}")`;
            db.query(query, function(err, result){
                if(err){
                }else{
                    let groupmems = '';
                    members.forEach(mem => {
                        groupmems = groupmems + mem +",";
                        var newMem = uuidv4();
                        query = `INSERT INTO members(memberId, userId,conversationId) VALUES('${newMem}','${mem}', '${conid}')`;
                        db.query(query, (err, result)=> {
                            if(err){
                                res.status(500).json(err);
                            }
                        })
                    });
                    
                    res.status(200).json({conversationId: conid, members: groupmems, groupName: req.body.groupName});
                   

                    console.log(result);
                }
            })
        }
      
    }catch(err){
        res.status(500).json(err);
    }
}

const getAllConversationsByUserId = async(req, res) => {

    try{
        let query = `SELECT members.conversationId FROM members WHERE members.userId = '${req.params.id}'`;
        db.query(query, function(err, data){
            if(!err){
                res.status(200).json(data)
            }else{
                
                console.log(err)
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}
const getConversationById = async(req, res) => {
    console.log('convers')
    try{
       let query = `SELECT conversations.conversationId,conversations.groupName,GROUP_CONCAT(members.userId) as members FROM conversations INNER JOIN members  ON conversations.conversationId = members.conversationId WHERE conversations.conversationId = '${req.params.id}' GROUP BY conversations.conversationId`;

        db.query(query, function(err, result){
            if(err){
                res.status(500).json(err)
               console.log(err);
            }else{
                let q = `SELECT * FROM messages WHERE conversationId = '${req.params.id}' ORDER BY messageCreated DESC`;
                db.query(q, (err, data)=> {
                    if(!err){
                        let dat = result[0];
                        let count = 0;
                        data?.forEach((el)=> {
                             let readBy = el?.readBy?.split(',');
                             if((!readBy?.includes(req.params.userid)) && el.senderId !== req.params.userid){
                                count++;
                                console.log(req.body.userid);
                                console.log(el);
                             }
                        })
                        res.status(200).json({...dat, ...data[0], unreadMessages: count})
                    }else{
 
                        res.status(500).json(err)
                    }
                })
                
            }
        })

    }catch(err){
        res.status(500).json(err);
    }
}
const getMessagesByConversationId = async(req, res) => {
    try{
        
     let query = `SELECT * FROM messages where messages.conversationId = '${req.params.id}' ORDER BY messageCreated ASC `;
     db.query(query, function(error, data){
        if(!error){
            res.status(200).json(data);
        }else{
            res.status(500).json(err)
        }
     })
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {getAllConversationsByUserId, getConversationById, createConversation, getMessagesByConversationId}

