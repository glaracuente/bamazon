

** bAmazon ** 

This is a Node.JS app that interacts with a MySQL server on the localhost. The seeds.sql and schema.sql files can be used to get your local MySQL server set up for testing. 

** bAmazon - This is a wrapper script that allows the user to choose between the different views: Customer, Manager, and Supervisor. **

```
# node bAmazon.js

bAmazon Portal

-----------------------------------

A) Customer View

B) Manager View

C) Supervisor View

? Please choose an option:
```


**bamazonCustomer - The customer view allows the user to buy any amount of an item, as long as there is enough left in stock.**

```
#node bamazonCustomer.js

bAmazon Sunday sales!

┌─────────┬────────────────────┬────────┐
│ item_id │ product_name       │ price  │
├─────────┼────────────────────┼────────┤
│ 1       │ xbox               │ 400    │
├─────────┼────────────────────┼────────┤
│ 2       │ ps4                │ 300    │
├─────────┼────────────────────┼────────┤
│ 3       │ call of duty       │ 59.99  │
├─────────┼────────────────────┼────────┤
│ 4       │ baseball glove     │ 40     │
├─────────┼────────────────────┼────────┤
│ 5       │ baseball bat       │ 50     │
├─────────┼────────────────────┼────────┤
│ 6       │ usb charging cable │ 19.99  │
├─────────┼────────────────────┼────────┤
│ 7       │ surge protector    │ 49.99  │
├─────────┼────────────────────┼────────┤
│ 8       │ lcd monitor        │ 199.99 │
├─────────┼────────────────────┼────────┤
│ 9       │ windex             │ 4.99   │
├─────────┼────────────────────┼────────┤
│ 10      │ detergent          │ 12.99  │
└─────────┴────────────────────┴────────┘
? What is the ID of the product you would like to buy? 1
? How many units of this product would you like you buy? 2

Your total is 800, thank you for shopping at bAmazon =]
```


**bamazonManager - The manager view allows the user to view all products for sale, with the additional stock_quantity info. The manager can also view the inventory of items with less than 100 units in stock. They can add more stock of any item, or add a brand new item. **

```
#node bamazonManager.js

bAmazon Manager Portal

-----------------------------------

A) View Products for Sale

B) View Low Inventory

C) Add to Inventory

D) Add New Product

? Please choose an option:  b


┌─────────┬──────────────┬───────┬────────────────┐
│ item_id │ product_name │ price │ stock_quantity │
├─────────┼──────────────┼───────┼────────────────┤
│ 1       │ xbox         │ 400   │ 34             │
├─────────┼──────────────┼───────┼────────────────┤
│ 2       │ ps4          │ 300   │ 40             │
└─────────┴──────────────┴───────┴────────────────┘
```

**bamazonSupervisor - The supervisor view allows the user to view each department along with the product sales and total profit. They can also create a new department. **

```
#node bamazonSupervisor.js

bAmazon Supervisor Portal

-----------------------------------

A) View Product Sales by Department

B) Create New Department

? Please choose an option:  a


┌───────────────┬───────────────────┬─────────────────┬───────────────┬──────────────┐
│ department_id │ department_name   │ over_head_costs │ product_sales │ total_profit │
├───────────────┼───────────────────┼─────────────────┼───────────────┼──────────────┤
│ 1             │ video games       │ 20000           │ 4339.96       │ -15660.04    │
├───────────────┼───────────────────┼─────────────────┼───────────────┼──────────────┤
│ 2             │ sports            │ 10000           │ 500           │ -9500        │
├───────────────┼───────────────────┼─────────────────┼───────────────┼──────────────┤
│ 3             │ electronics       │ 30000           │ 2339.76       │ -27660.24    │
├───────────────┼───────────────────┼─────────────────┼───────────────┼──────────────┤
│ 4             │ cleaning products │ 5000            │ 186.77        │ -4813.23     │
└───────────────┴───────────────────┴─────────────────┴───────────────┴──────────────┘
```

**Technologies Used:**
Javascript
nodeJS
MySQL

**npm packages:**
mysql
inquirer
cli-table2
moment
