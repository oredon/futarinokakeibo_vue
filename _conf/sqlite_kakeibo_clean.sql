CREATE TABLE `categories` (
  `id` INTEGER  NOT NULL PRIMARY KEY,
  `name` TEXT DEFAULT ''
);

INSERT INTO `categories` VALUES (1,'食料品');
INSERT INTO `categories` VALUES (2,'雑貨');
INSERT INTO `categories` VALUES (3,'生活消耗品');
INSERT INTO `categories` VALUES (4,'家具・家電');
INSERT INTO `categories` VALUES (5,'医療');
INSERT INTO `categories` VALUES (6,'家賃');
INSERT INTO `categories` VALUES (7,'電気水道ガス通信');
INSERT INTO `categories` VALUES (8,'遊興費');
INSERT INTO `categories` VALUES (9,'その他');

CREATE TABLE `forms` (
  `id` INTEGER  NOT NULL PRIMARY KEY,
  `category_id` INTEGER DEFAULT NULL,
  `title` TEXT NOT NULL,
  `price` INTEGER NOT NULL DEFAULT '0',
  `pay_danna` INTEGER DEFAULT '0',
  `pay_yome` INTEGER DEFAULT '0',
  `description` text,
  `date` date DEFAULT NULL,
  `created` date DEFAULT NULL,
  `modified` date DEFAULT NULL
)  ;

CREATE TABLE `users` (
  `id` INTEGER  NOT NULL PRIMARY KEY,
  `username` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL
);

INSERT INTO `users` VALUES (1,'admin','ec9957da2bec5b66621afba79460fd98fba8c06c','2017-11-15 18:26:21','2017-11-15 18:26:21');
