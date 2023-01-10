CREATE TABLE members(
   memberId VARCHAR(50) NOT NULL,
   userId VARCHAR(50) NOT NULL,
   conversationId VARCHAR(50) NOT NULL,
   PRIMARY KEY(memberId),
   FOREIGN KEY(conversationId) REFERENCES conversations(conversationId),
   memberCreated DATETIME DEFAULT CURRENT_TIMESTAMP 
)