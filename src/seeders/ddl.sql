SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'category' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `category` (
  `categoryId` INTEGER NOT NULL auto_increment, 
  `name` VARCHAR(45), 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`categoryId`)
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `category` 
FROM 
  `bob_hub`;
SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'user' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `user` (
  `userId` INTEGER NOT NULL auto_increment, 
  `name` VARCHAR(45), 
  `nickName` VARCHAR(45), 
  `email` VARCHAR(45), 
  `password` VARCHAR(45), 
  `phone` VARCHAR(45), 
  `profile` VARCHAR(45), 
  `role` VARCHAR(45), 
  `status` VARCHAR(45), 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`userId`)
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `user` 
FROM 
  `bob_hub`;
SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'shop' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `shop` (
  `shopId` INTEGER NOT NULL auto_increment, 
  `categoryId` INTEGER NOT NULL, 
  `name` VARCHAR(45), 
  `distance` INTEGER, 
  `address` VARCHAR(45), 
  `menu` VARCHAR(45), 
  `shopPicture` VARCHAR(45), 
  `like` INTEGER, 
  `description` VARCHAR(45), 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`shopId`, `categoryId`), 
  FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`)
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `shop` 
FROM 
  `bob_hub`;
ALTER TABLE 
  `shop` 
ADD 
  INDEX `FK_Category_TO_Shop_1` USING BTREE (`categoryId`);
SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'comment' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `comment` (
  `commentId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `shopId` INTEGER NOT NULL, 
  `content` VARCHAR(45), 
  `star` INTEGER, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE `comment_userId_shopId_unique` (`userId`, `shopId`), 
  PRIMARY KEY (`commentId`, `userId`, `shopId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `comment` 
FROM 
  `bob_hub`;
ALTER TABLE 
  `comment` 
ADD 
  INDEX `FK_User_TO_Comment_1` USING BTREE (`userId`);
ALTER TABLE 
  `comment` 
ADD 
  INDEX `FK_Shop_TO_Comment_1` USING BTREE (`shopId`);
SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'elice' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `elice` (
  `eliceId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `track` VARCHAR(45), 
  `generation` INTEGER, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`eliceId`, `userId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `elice` 
FROM 
  `bob_hub`;
ALTER TABLE 
  `elice` 
ADD 
  INDEX `FK_User_TO_Elice_1` USING BTREE (`userId`);
SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'food' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `food` (
  `foodId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `categoryId` INTEGER NOT NULL, 
  `picture` VARCHAR(45), 
  `name` VARCHAR(45), 
  `price` INTEGER, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE `food_categoryId_shopId_unique` (`shopId`, `categoryId`), 
  PRIMARY KEY (`foodId`, `shopId`, `categoryId`), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`categoryId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `food` 
FROM 
  `bob_hub`;
ALTER TABLE 
  `food` 
ADD 
  INDEX `FK_Shop_TO_Food_1` USING BTREE (`shopId`);
ALTER TABLE 
  `food` 
ADD 
  INDEX `FK_Shop_TO_Food_2` USING BTREE (`categoryId`);
SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'group' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `group` (
  `groupId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `categoryId` INTEGER NOT NULL, 
  `userId` INTEGER NOT NULL, 
  `limit` INTEGER, 
  `timeLimit` INTEGER, 
  `createTime` TIME, 
  `likedNum` INTEGER, 
  `isComplete` BLOB, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (
    `groupId`, `shopId`, `categoryId`, 
    `userId`
  ), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`), 
  FOREIGN KEY (`categoryId`) REFERENCES `shop` (`categoryId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `group` 
FROM 
  `bob_hub`;
ALTER TABLE 
  `group` 
ADD 
  INDEX `FK_Shop_TO_Group_1` USING BTREE (`shopId`);
ALTER TABLE 
  `group` 
ADD 
  INDEX `FK_Shop_TO_Group_2` USING BTREE (`categoryId`);
ALTER TABLE 
  `group` 
ADD 
  INDEX `FK_User_TO_Group_1` USING BTREE (`userId`);
SELECT 
  TABLE_NAME 
FROM 
  INFORMATION_SCHEMA.TABLES 
WHERE 
  TABLE_TYPE = 'BASE TABLE' 
  AND TABLE_NAME = 'pick' 
  AND TABLE_SCHEMA = 'bob_hub';
CREATE TABLE IF NOT EXISTS `pick` (
  `pickId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `groupId` INTEGER NOT NULL, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`pickId`, `userId`, `groupId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`), 
  FOREIGN KEY (`groupId`) REFERENCES `group` (`groupId`)
) ENGINE = InnoDB;
SHOW INDEX 
FROM 
  `pick` 
FROM 
  `bob_hub`;
ALTER TABLE 
  `pick` 
ADD 
  INDEX `FK_User_TO_Pick_1` USING BTREE (`userId`);
ALTER TABLE 
  `pick` 
ADD 
  INDEX `FK_Group_TO_Pick_1` USING BTREE (`groupId`);
