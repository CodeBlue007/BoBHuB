CREATE DATABASE IF NOT EXISTS bob_hub;
USE bob_hub;
CREATE TABLE IF NOT EXISTS `category` (
  `categoryId` INTEGER NOT NULL auto_increment, 
  `name` VARCHAR(45) UNIQUE, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`categoryId`)
);
CREATE TABLE IF NOT EXISTS `shop` (
  `shopId` INTEGER NOT NULL auto_increment, 
  `categoryId` INTEGER NOT NULL, 
  `name` VARCHAR(45) UNIQUE, 
  `distance` INTEGER, 
  `address` VARCHAR(45), 
  `menu` VARCHAR(45), 
  `shopPicture` VARCHAR(45), 
  `likes` INTEGER, 
  `description` VARCHAR(45), 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`shopId`, `categoryId`), 
  FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`)
);
CREATE TABLE IF NOT EXISTS `food` (
  `foodId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `categoryId` INTEGER NOT NULL, 
  `name` VARCHAR(45) UNIQUE, 
  `picture` VARCHAR(45), 
  `price` INTEGER, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE `food_categoryId_shopId_unique` (`shopId`, `categoryId`), 
  PRIMARY KEY (`foodId`, `shopId`, `categoryId`), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`categoryId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `elice` (
  `eliceId` INTEGER NOT NULL auto_increment, 
  `track` VARCHAR(45), 
  `generation` INTEGER, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE  (`track`, `generation`), 
  PRIMARY KEY (`eliceId`)
  );
CREATE TABLE IF NOT EXISTS `user` (
  `userId` INTEGER NOT NULL auto_increment, 
  `eliceId` INTEGER NOT NULL, 
  `name` VARCHAR(45), 
  `nickName` VARCHAR(45), 
  `email` VARCHAR(45) UNIQUE, 
  `password` VARCHAR(45), 
  `phone` VARCHAR(45) UNIQUE, 
  `profile` VARCHAR(45), 
  `role` ENUM('elicer','admin') NOT NULL DEFAULT 'elicer', 
  `status` BLOB, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE `user_userId_eliceId_unique` (`userId`, `eliceId`), 
  PRIMARY KEY (`userId`, `eliceId`),
  FOREIGN KEY (`eliceId`) REFERENCES `elice` (`eliceId`) ON DELETE CASCADE ON UPDATE CASCADE 
  );
CREATE TABLE IF NOT EXISTS `comment` (
  `commentId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `shopId` INTEGER NOT NULL, 
  `eliceId` INTEGER NOT NULL, 
  `content` VARCHAR(45), 
  `star` ENUM('1','2','3','4','5') NOT NULL, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE `comment_userId_shopId_eliceId_unique` (`userId`, `shopId`, `eliceId`), 
  PRIMARY KEY (
    `commentId`, `userId`, `shopId`, `eliceId`
  ), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`eliceId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `group` (
  `groupId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `categoryId` INTEGER NOT NULL, 
  `userId` INTEGER NOT NULL, 
  `eliceId` INTEGER NOT NULL, 
  `grouplimit` INTEGER, 
  `timeLimit` INTEGER, 
  `likedNum` INTEGER, 
  `isComplete` BLOB, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (
    `groupId`, `shopId`, `categoryId`, 
    `userId`, `eliceId`
  ), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`), 
  FOREIGN KEY (`categoryId`) REFERENCES `shop` (`categoryId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE, 
  FOREIGN KEY (`eliceId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `pick` (
  `pickId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `groupId` INTEGER NOT NULL, 
  `eliceId` INTEGER NOT NULL, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`pickId`, `userId`, `groupId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`), 
  FOREIGN KEY (`groupId`) REFERENCES `group` (`groupId`),
    INDEX `FK_User_TO_Pick_1` USING BTREE (`userId`),
	  INDEX `FK_Group_TO_Pick_1` USING BTREE (`groupId`)
);