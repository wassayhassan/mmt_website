CREATE TABLE messages(
   messageId VARCHAR(50) NOT NULL,
   conversationId VARCHAR(50) NOT NULL,
   senderId VARCHAR(50) NOT NULL,
   receiverId VARCHAR(50) NOT NULL,
   text VARCHAR(255),
   attachment VARCHAR(255),
   readStatus BOOLEAN,
   readBy VARCHAR(3000),
   PRIMARY KEY(messageId),
   FOREIGN KEY(conversationId) REFERENCES conversations(conversationId),
   messageCreated DATETIME DEFAULT CURRENT_TIMESTAMP
)