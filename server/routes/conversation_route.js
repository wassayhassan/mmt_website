const express = require("express");
const router = express.Router();
const {getAllConversationsByUserId, getConversationById, createConversation, getMessagesByConversationId} = require("../controllers/conversationController");


router.get('/:id/user/:userid',getConversationById);
router.get('/user/:id', getAllConversationsByUserId);
router.post('/', createConversation);
router.get('/:id/messages', getMessagesByConversationId);


module.exports = router;

