CREATE DATABASE IF NOT EXISTS bob_hub;
USE bob_hub;
CREATE TABLE IF NOT EXISTS `category` (
  `category` VARCHAR(45) DEFAULT '없음', 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`category`)
);
CREATE TABLE IF NOT EXISTS `shop` (
  `shopId` INTEGER NOT NULL auto_increment, 
  `category` VARCHAR(45) , 
  `name` VARCHAR(45) UNIQUE, 
  `distance` INTEGER, 
  `address` VARCHAR(45), 
  `menu` VARCHAR(110), 
  `shopPicture` VARCHAR(110), 
  `description` VARCHAR(45), 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`shopId`, `category`), 
  FOREIGN KEY (`category`) REFERENCES `category` (`category`) ON DELETE SET DEFAULT ACTION ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `food` (
  `foodId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `name` VARCHAR(45) UNIQUE, 
  `picture` VARCHAR(110), 
  `price` INTEGER, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`foodId`, `shopId`), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE, 
);
CREATE TABLE IF NOT EXISTS `track` (
  `track` VARCHAR(45) NOT NULL, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`track`)
  );
CREATE TABLE IF NOT EXISTS `generation` (
  `eliceId` INTEGER NOT NULL auto_increment, 
  `generation` INTEGER NOT NULL, 
  `track` VARCHAR(45) NOT NULL, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE  `generation_generation_track_unique` (`track`, `generation`), 
  FOREIGN KEY (`track`) REFERENCES `track` (`track`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (`generation`,`track`)
  );
CREATE TABLE IF NOT EXISTS `user` (
  `userId` INTEGER NOT NULL auto_increment, 
  `generation` INTEGER NOT NULL, 
  `track` VARCHAR(45) NOT NULL, 
  `name` VARCHAR(45), 
  `nickName` VARCHAR(45), 
  `email` VARCHAR(45) UNIQUE, 
  `password` VARCHAR(60), 
  `phone` VARCHAR(45) UNIQUE, 
  `profile` VARCHAR(110), 
  `role` ENUM('elicer','admin') NOT NULL DEFAULT 'elicer', 
  `status` ENUM('graduation','active','inActive') NOT NULL DEFAULT 'active', 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE `user_userId_track_generation_unique` (`userId`,`track`, `generation`), 
  PRIMARY KEY (`userId`, `generation`,`track`),
  FOREIGN KEY (`generation`) REFERENCES `generation` (`generation`) ON DELETE CASCADE ON UPDATE CASCADE ,
  FOREIGN KEY (`track`) REFERENCES `generation` (`track`) ON DELETE CASCADE ON UPDATE CASCADE 
  );
CREATE TABLE IF NOT EXISTS `comment` (
  `commentId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `shopId` INTEGER NOT NULL, 
  `content` VARCHAR(45), 
  `star` INTEGER NOT NULL DEFAULT 3, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (
    `commentId`, `userId`, `shopId`
  ), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `group` (
  `groupId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `userId` INTEGER NOT NULL, 
  `grouplimit` INTEGER, 
  `timeLimit` INTEGER, 
  `likedNum` INTEGER, 
  `isComplete` BLOB, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (
    `groupId`, `shopId`, 
    `userId`
  ), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `pick` (
  `pickId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `groupId` INTEGER NOT NULL, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`pickId`, `userId`, `groupId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`), 
  FOREIGN KEY (`groupId`) REFERENCES `group` (`groupId`),
  INDEX `FK_User_TO_Pick_1` USING BTREE (`userId`),
  INDEX `FK_Group_TO_Pick_1` USING BTREE (`groupId`)
);