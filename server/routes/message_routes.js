const express = require("express");
const router = express.Router();
const {createMessage,updateReadStatus, uploadAttachment, addReadStatus,getMessagesByConversationId, getLastMessageByConversationId, getUnreadMessagesCountByConversationId} = require("../controllers/messagesController")

router.post('/', createMessage);
router.get('/conversation/:id', getMessagesByConversationId);
router.get('/conversation/:id/last', getLastMessageByConversationId);
router.get('/conversation/:id/count/unread', getUnreadMessagesCountByConversationId);
router.post('/fileupload',  uploadAttachment);
router.put('/:id/status/update', updateReadStatus)
router.post('/status/add', addReadStatus)

module.exports = router;

