-- CREATE DATABASE zorba_todo

USE zorba_todo;

CREATE TABLE tasks (
id INT(10) NOT NULL auto_increment PRIMARY KEY,
taskType VARCHAR(150) NOT NULL,
taskName VARCHAR(150) NOT NULL,
summary VARCHAR(350) NOT NULL
);