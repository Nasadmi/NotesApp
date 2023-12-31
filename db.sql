CREATE DATABASE IF NOT EXISTS `notesdb`;

USE `notesdb`;

CREATE TABLE IF NOT EXISTS `users`
(
    id CHAR(36) DEFAULT(UUID()) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS `notes`
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_uuid CHAR(36) NOT NULL,
    title VARCHAR(150),
    content TEXT,
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)
    FOREIGN KEY (user_uuid) REFERENCES users(id)
);