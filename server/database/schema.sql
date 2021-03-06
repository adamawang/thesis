-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'events'
--
-- ---

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `tm_id` VARCHAR(30) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `artist_name` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
  `event_url` VARCHAR(150) NOT NULL,
  `venue` VARCHAR(150) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(50) NOT NULL,
  `latitude` VARCHAR(50) NOT NULL,
  `longitude` VARCHAR(50) NOT NULL,
  `sale_date` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(70) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `fullname` VARCHAR(100) NOT NULL,
  `profile_photo` VARCHAR(100) NOT NULL,
  `createdOn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_events'
--
-- ---

DROP TABLE IF EXISTS `users_events`;

CREATE TABLE `users_events` (
  `id_users` INTEGER NOT NULL,
  `id_events` INTEGER NOT NULL,
  `createdOn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---
-- Table 'users_friends'
--
-- ---

DROP TABLE IF EXISTS `users_friends`;

CREATE TABLE `users_friends` (
  `id_user` INTEGER NOT NULL,
  `id_friend` INTEGER NOT NULL
  `createdOn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

-- ---
-- Table 'users_artists'
--
-- ---

DROP TABLE IF EXISTS `users_artists`;

CREATE TABLE `users_artists` (
  `id_artists` INTEGER NOT NULL,
  `id_users` INTEGER NOT NULL
);

-- ---
-- Table 'artists'
--
-- ---

DROP TABLE IF EXISTS `artists`;

CREATE TABLE `artists` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `bit_id` INTEGER NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `events` VARCHAR(255) NULL DEFAULT NULL,
  `facebook` VARCHAR(255) NULL DEFAULT NULL,
  `upcoming_events` INTEGER NOT NULL,
  `onTourUntil` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_user` INTEGER NOT NULL,
  `id_friend` INTEGER NOT NULL,
  `id_event` INTEGER NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `createdOn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `events` ADD FOREIGN KEY (id_artists) REFERENCES `artists` (`id`);
ALTER TABLE `users_events` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `users_events` ADD FOREIGN KEY (id_events) REFERENCES `events` (`id`);
ALTER TABLE `users_friends` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);
ALTER TABLE `users_friends` ADD FOREIGN KEY (id_friend) REFERENCES `users` (`id`);
ALTER TABLE `users_artists` ADD FOREIGN KEY (id_artists) REFERENCES `artists` (`id`);
ALTER TABLE `users_artists` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (id_friend) REFERENCES `users` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (id_event) REFERENCES `events` (`id`);


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `artists` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
