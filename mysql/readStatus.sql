CREATE TABLE readStatuses(
  statusId VARCHAR(50),
  messageId VARCHAR(50) NOT NULL,
  userId VARCHAR(50) NOT NULL,
  readStatus BOOLEAN,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(statusId),
  FOREIGN KEY(userId) REFERENCES account(id),
  FOREIGN KEY(messageId) REFERENCES messages(messageId),
);