CREATE TABLE IF NOT EXISTS `tickets` (
    `id` LONG PRIMARY KEY AUTO_INCREMENT,
    `movie` VARCHAR(50) NOT NULL,
    `amount` INTEGER  NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL
);