CREATE TABLE conversations(
   conversationId VARCHAR(50) NOT NULL,
   PRIMARY KEY(conversationId),
   createdBy VARCHAR(50) NOT NULL,
   active BOOLEAN,
   groupName VARCHAR(20),
   conversationCreated DATETIME DEFAULT CURRENT_TIMESTAMP
)