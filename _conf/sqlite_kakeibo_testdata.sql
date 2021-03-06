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

INSERT INTO `forms` VALUES (1,1,'スーパー',1200,1000,200,'いつものスーパーで買い物','2017-11-01','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (2,2,'街の雑貨屋さん',2000,1000,1000,'','2017-11-05','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (3,3,'くすりやさん',1000,1000,NULL,'','2017-11-10','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (4,4,'タンス',50000,25000,25000,'','2017-11-15','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (5,5,'予防接種',4000,4000,NULL,'','2017-11-15','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (6,8,'海ドライブ',10000,10000,NULL,'思い出たくさんつくろうね','2017-11-20','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (7,6,'家賃',120000,60000,60000,'','2017-11-25','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (8,7,'光熱費とか',15000,10000,5000,'','2017-11-30','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (9,1,'食料買い出し',4200,4000,200,'','2017-12-01','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (10,3,'ドラッグスーパー',3233,233,3000,'トイレットペーパーなど衛生品買い出し','2017-12-03','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (11,2,'デパート',3000,3000,NULL,'おはし購入','2017-12-04','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (12,1,'レストラン',3000,1000,2000,'たまには外食','2017-12-05','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (13,4,'加湿器',19800,15000,4800,'','2017-12-07','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (14,5,'風邪',2800,NULL,2800,'','2017-12-10','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (15,7,'電話代',12000,6000,6000,'','2017-12-15','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (16,8,'ゆうえんち',18000,10000,8000,'','2017-12-18','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (17,6,'家賃',120000,60000,60000,'','2017-12-25','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (18,1,'食料買い出し',4200,4000,200,'','2018-01-01','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (19,3,'ドラッグスーパー',3233,233,3000,'トイレットペーパーなど衛生品買い出し','2018-01-03','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (20,2,'デパート',3000,3000,NULL,'おはし購入','2018-01-04','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (21,1,'レストラン',3000,1000,2000,'たまには外食','2018-01-05','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (22,4,'加湿器',19800,15000,4800,'','2018-01-07','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (23,5,'風邪',2800,NULL,2800,'','2018-01-10','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (24,7,'電話代',12000,6000,6000,'','2018-01-15','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (25,8,'ゆうえんち',18000,10000,8000,'','2018-01-18','2017-12-15','2017-12-15');
INSERT INTO `forms` VALUES (26,6,'家賃',120000,60000,60000,'','2018-01-25','2017-12-15','2017-12-15');

CREATE TABLE `users` (
  `id` INTEGER  NOT NULL PRIMARY KEY,
  `username` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL
);

INSERT INTO `users` VALUES (1,'admin','ec9957da2bec5b66621afba79460fd98fba8c06c','2017-06-15 18:26:21','2017-06-15 18:26:21');
