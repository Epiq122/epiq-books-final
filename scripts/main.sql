CREATE DATABASE  IF NOT EXISTS `epiqbooksdatabase`;
USE `epiqbooksdatabase`;

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `copies` int(11) DEFAULT NULL,
  `copies_available` int(11) DEFAULT NULL,
  `category` varchar(11) DEFAULT NULL,
  `img` MEDIUMBLOB  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `rating` decimal (3,2) DEFAULT NULL,
  `book_id` BIGINT(20) DEFAULT NULL,
  `review_description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



INSERT INTO `review` VALUES 
	(1, 'example1user@email.com', NOW(), 4, 1, 'First book is pretty good book overall'),
	(2, 'example2user@email.com', NOW(), 4.5, 2, 'Second books is pretty good book overall');
    
    
DROP TABLE IF EXISTS `checkout`;

CREATE TABLE `checkout` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) DEFAULT NULL,
  `checkout_date` varchar(45) DEFAULT NULL,
  `return_date` varchar(45) DEFAULT NULL,
  `book_id` BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `admin_email` varchar(45) DEFAULT NULL,
  `response` text DEFAULT NULL,
  `closed` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `history`;

CREATE TABLE `history` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) DEFAULT NULL,
  `checkout_date` varchar(45) DEFAULT NULL,
  `returned_date` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `img` MEDIUMBLOB  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



UNLOCK TABLES;


