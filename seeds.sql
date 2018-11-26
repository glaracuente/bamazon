INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("xbox", "video games", 400, 40), 
("ps4", "video games", 300, 40), 
("call of duty", "video games", 59.99, 200),
("baseball glove", "sports", 40, 100),
("baseball bat", "sports", 50, 100),
("usb charging cable", "electronics", 19.99, 300),
("surge protector", "electronics", 49.99, 200),
("lcd monitor", "electronics", 199.99, 100),
("windex", "cleaning products", 4.99, 120),
("detergent", "cleaning products", 12.99, 230);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("video games", 20000.00), 
("sports", 10000.00), 
("electronics", 30000.00),
("cleaning products", 5000.00);

select * from products;

