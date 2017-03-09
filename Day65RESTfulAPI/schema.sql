/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database event_saver_db and specified it for use.
CREATE DATABASE my_wishes_db;
USE my_wishes_db;

-- Create the table events.
CREATE TABLE wishes
(
id int NOT NULL AUTO_INCREMENT,
event varchar(255) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO wishes (event) VALUES ('I want to make a lot of money! ');
INSERT INTO wishes (event) VALUES ('I want an IT job.');
INSERT INTO wishes (event) VALUES ('Wanna learn more languages.');
INSERT INTO wishes (event) VALUES ('Wanna be cool lie Rock.');
