-- generation과 user 참조 끊은 버전  + category 참조도 끊음
CREATE DATABASE IF NOT EXISTS bob_hub;
USE bob_hub;
CREATE TABLE IF NOT EXISTS `category` (
  `category` VARCHAR(45) DEFAULT '없음' , 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`category`)
);
CREATE TABLE IF NOT EXISTS `shop` (
  `shopId` INTEGER NOT NULL auto_increment, 
  `category` VARCHAR(45) NOT NULL , 
  `name` VARCHAR(45) UNIQUE NOT NULL , 
  `distance` INTEGER, 
  `address` VARCHAR(45), 
  `menu` VARCHAR(110), 
  `shopPicture` VARCHAR(110), 
  `description` VARCHAR(130), 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`shopId`)
);
CREATE TABLE IF NOT EXISTS `food` (
  `foodId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `name` VARCHAR(45), 
  `picture` VARCHAR(110), 
  `price` INTEGER, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE  `food_shopId_name_unique` (`shopId`, `name`), 
  PRIMARY KEY (`foodId`, `shopId`), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE
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
  PRIMARY KEY (`eliceId` ,`generation`,`track`)
  );
CREATE TABLE IF NOT EXISTS `user` (
  `userId` INTEGER NOT NULL auto_increment, 
  `generation` INTEGER NOT NULL, 
  `track` VARCHAR(45) NOT NULL, 
  `name` VARCHAR(45) NOT NULL, 
  `nickname` VARCHAR(45) UNIQUE NOT NULL, 
  `email` VARCHAR(45) UNIQUE NOT NULL, 
  `password` VARCHAR(60) NOT NULL, 
  `phone` VARCHAR(45) UNIQUE NOT NULL, 
  `profile` VARCHAR(110), 
  `role` ENUM('elicer','admin') NOT NULL DEFAULT 'elicer', 
  `status` ENUM('graduation','active','inActive') NOT NULL DEFAULT 'active', 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  UNIQUE `user_userId_track_generation_unique` (`userId`,`track`, `generation`), 
  PRIMARY KEY (`userId`)
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
CREATE TABLE IF NOT EXISTS `party` (
  `partyId` INTEGER NOT NULL auto_increment, 
  `shopId` INTEGER NOT NULL, 
  `userId` INTEGER NOT NULL, 
  `partylimit` INTEGER NOT NULL DEFAULT 4, 
  `timeLimit` INTEGER NOT NULL DEFAULT 30, 
  `likedNum` INTEGER NOT NULL DEFAULT 1, 
  `isComplete` BOOLEAN NOT NULL DEFAULT FALSE, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (
    `partyId`, `shopId`, 
    `userId`
  ), 
  FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `pick` (
  `pickId` INTEGER NOT NULL auto_increment, 
  `userId` INTEGER NOT NULL, 
  `partyId` INTEGER NOT NULL, 
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `updatedAt` DATETIME, 
  `deletedAt` DATETIME, 
  PRIMARY KEY (`pickId`, `userId`, `partyId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`), 
  FOREIGN KEY (`partyId`) REFERENCES `party` (`partyId`),
  INDEX `FK_User_TO_Pick_1` USING BTREE (`userId`),
  INDEX `FK_Party_TO_Pick_1` USING BTREE (`partyId`)
);