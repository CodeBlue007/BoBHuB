CREATE TABLE `Category` (
	`categoryId`	int	NOT NULL,
	`name`	VARCHAR(45)	NOT NULL
);

CREATE TABLE `Shop` (
	`shopId`	int	NOT NULL,
	`categoryId`	int	NOT NULL,
	`name`	VARCHAR(45)	NULL,
	`distance`	int	NULL,
	`address`	VARCHAR(45)	NULL,
	`menu`	VARCHAR(45)	NULL,
	`shopPicture`	VARCHAR(45)	NULL,
	`like`	int	NULL,
	`description`	VARCHAR(45)	NULL
);

CREATE TABLE `Food` (
	`foodId`	int	NOT NULL,
	`shopId`	int	NOT NULL,
	`categoryId`	int	NOT NULL,
	`picture`	VARCHAR(45)	NULL,
	`name`	VARCHAR(45)	NULL,
	`price`	int	NULL
);

CREATE TABLE `Comment` (
	`commentId`	int	NOT NULL,
	`userId`	int	NOT NULL,
	`shopId`	int	NOT NULL,
	`content`	VARCHAR(45)	NULL,
	`star`	int	NULL
);

CREATE TABLE `User` (
	`userId`	int	NOT NULL,
	`name`	VARCHAR(45)	NULL,
	`email`	VARCHAR(45)	NULL,
	`password`	VARCHAR(45)	NULL,
	`phone`	VARCHAR(45)	NULL,
	`profile`	VARCHAR(45)	NULL,
	`role`	VARCHAR(45)	NULL,
	`status`	BLOB	NULL
);

CREATE TABLE `Elice` (
	`eliceId`	int	NOT NULL,
	`userId`	int	NOT NULL,
	`track`	VARCHAR(45)	NULL,
	`generation`	int	NULL
);

CREATE TABLE `Group` (
	`groupId`	int	NOT NULL,
	`shopId`	int	NOT NULL,
	`categoryId`	int	NOT NULL,
	`userId`	int	NOT NULL,
	`limit`	int	NULL,
	`timeLimit`	int	NULL,
	`createTime`	time	NULL,
	`likedNum`	int	NULL,
	`isComplete`	BLOB	NULL
);

CREATE TABLE `Pick` (
	`pickId`	int	NOT NULL,
	`userId`	int	NOT NULL,
	`groupId`	int	NOT NULL
);

ALTER TABLE `Category` ADD CONSTRAINT `PK_CATEGORY` PRIMARY KEY (
	`categoryId`
);

ALTER TABLE `Shop` ADD CONSTRAINT `PK_SHOP` PRIMARY KEY (
	`shopId`,
	`categoryId`
);

ALTER TABLE `Food` ADD CONSTRAINT `PK_FOOD` PRIMARY KEY (
	`foodId`,
	`shopId`,
	`categoryId`
);

ALTER TABLE `Comment` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`commentId`,
	`userId`,
	`shopId`
);

ALTER TABLE `User` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`userId`
);

ALTER TABLE `Elice` ADD CONSTRAINT `PK_ELICE` PRIMARY KEY (
	`eliceId`,
	`userId`
);

ALTER TABLE `Group` ADD CONSTRAINT `PK_GROUP` PRIMARY KEY (
	`groupId`,
	`shopId`,
	`categoryId`,
	`userId`
);

ALTER TABLE `Pick` ADD CONSTRAINT `PK_PICK` PRIMARY KEY (
	`pickId`,
	`userId`,
	`groupId`
);

ALTER TABLE `Shop` ADD CONSTRAINT `FK_Category_TO_Shop_1` FOREIGN KEY (
	`categoryId`
)
REFERENCES `Category` (
	`categoryId`
);

ALTER TABLE `Food` ADD CONSTRAINT `FK_Shop_TO_Food_1` FOREIGN KEY (
	`shopId`
)
REFERENCES `Shop` (
	`shopId`
);

ALTER TABLE `Food` ADD CONSTRAINT `FK_Shop_TO_Food_2` FOREIGN KEY (
	`categoryId`
)
REFERENCES `Shop` (
	`categoryId`
);

ALTER TABLE `Comment` ADD CONSTRAINT `FK_User_TO_Comment_1` FOREIGN KEY (
	`userId`
)
REFERENCES `User` (
	`userId`
);

ALTER TABLE `Comment` ADD CONSTRAINT `FK_Shop_TO_Comment_1` FOREIGN KEY (
	`shopId`
)
REFERENCES `Shop` (
	`shopId`
);

ALTER TABLE `Elice` ADD CONSTRAINT `FK_User_TO_Elice_1` FOREIGN KEY (
	`userId`
)
REFERENCES `User` (
	`userId`
);

ALTER TABLE `Group` ADD CONSTRAINT `FK_Shop_TO_Group_1` FOREIGN KEY (
	`shopId`
)
REFERENCES `Shop` (
	`shopId`
);

ALTER TABLE `Group` ADD CONSTRAINT `FK_Shop_TO_Group_2` FOREIGN KEY (
	`categoryId`
)
REFERENCES `Shop` (
	`categoryId`
);

ALTER TABLE `Group` ADD CONSTRAINT `FK_User_TO_Group_1` FOREIGN KEY (
	`userId`
)
REFERENCES `User` (
	`userId`
);

ALTER TABLE `Pick` ADD CONSTRAINT `FK_User_TO_Pick_1` FOREIGN KEY (
	`userId`
)
REFERENCES `User` (
	`userId`
);

ALTER TABLE `Pick` ADD CONSTRAINT `FK_Group_TO_Pick_1` FOREIGN KEY (
	`groupId`
)
REFERENCES `Group` (
	`groupId`
);

