DROP USER IF EXISTS 'todouser'@'localhost';
DROP TABLE IF EXISTS `todo_db`.`todos`;
DROP DATABASE IF EXISTS `todo_db`;

CREATE DATABASE `todo_db`;

CREATE TABLE `todo_db`.`todos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`text` VARCHAR(255) NOT NULL,
	`priority` INT NOT NULL,
	`date` VARCHAR(45) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`color` VARCHAR(7) NULL,
	`isDone` TINYINT NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

CREATE USER 'todouser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `todo_db` . * TO 'todouser'@'localhost';
