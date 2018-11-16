DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("xbox", "video games", 400, 40), 
("ps4", "video games", 300, 40), 
("call of duty", "video games", 59.99, 200);
