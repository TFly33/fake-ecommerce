-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called programming_db --
CREATE DATABASE bamazon_db;

-- Use programming db for the following statements --
USE bamazon_db;

CREATE TABLE products(
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
item_id INT(20) AUTO_INCREMENT NOT NULL, 
  -- Create a string column called "language" --
product_name VARCHAR(100) NOT NULL,
  -- Create an integer column called "rating" --
department_name VARCHAR(100) NOT NULL,
  -- Create an integer column called "rating" --
price DECIMAL (10) NOT NULL,

stock_quantity DECIMAL (10) NOT NULL,

  -- Set the id as this table's primary key
  PRIMARY KEY (item_id)
);

-- Create new example rows
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Rickey Henderson","modern", 50, 7), 
("Ken Griffey Jr.","modern", 100, 6), 
("Mickey Mantle","classic", 200, 3),
("Babe Ruth","antique", 500, 2),
("Honus Wagner","antique", 10000, 1),
("Greg Maddux","modern", 200, 82), 
("Jay Buhner","modern", 30, 250), 
("Shoeless Joe Jackson","antique", 1000, 4), 
("Yogi Berra","classic", 150, 350), 
("Mike Trout","active", 80, 500), 
("Anthony Rendon","active", 25, 1000)

