var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
var departments = [];

var connection = mysql.createConnection({
    //host: "localhost",
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("bAmazon Manager Portal\n");
    console.log("-----------------------------------\n");

    console.log("A) View Products for Sale\n");
    console.log("B) View Low Inventory\n");
    console.log("C) Add to Inventory\n");
    console.log("D) Add New Product\n");

    pullDepartments();
    promptUser()
});


function promptUser() {
    inquirer.prompt([
        {
            name: "optionLetter",
            type: "input",
            message: "Please choose an option: ",
            validate: function (value) {
                if (["A", "B", "C", "D"].indexOf(value.toUpperCase()) !== -1) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            var optionLetter = answer.optionLetter;
            console.log("\n");

            switch (optionLetter.toUpperCase()) {
                case 'A':
                    displayInventory()
                    return connection.end()
                case "B":
                    displayLowInventory()
                    return connection.end()
                case "C":
                    displayInventory()
                    return setTimeout(function () { addToInventory(); }, 200);
                case "D":
                    return addNewProduct()
                default:
                    break;
            }

        });
}


function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({ head: ['item_id', 'product_name', 'price', 'stock_quantity'] });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
    });
};

/*function verifyDepartment(department) {
    connection.query("SELECT department_name FROM products GROUP BY department_name", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (department === res[i].department_name) {
                console.log("true")
                return true
            }
        }
        return false
    });
};*/

function pullDepartments() {
    connection.query("SELECT department_name FROM products GROUP BY department_name", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].department_name)
        }
    });
};

function displayLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 100", function (err, res) {
        if (err) throw err;
        var table = new Table({ head: ['item_id', 'product_name', 'price', 'stock_quantity'] });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
    });
};



//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addToInventory() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the ID of the product you would like to restock?",
            validate: function (value) {
                if (isNaN(value) === false && value !== "") {
                    return true;
                }
                return false;
            }
        },
        {
            name: "units",
            type: "input",
            message: "How many units of this product are you adding?",
            validate: function (value) {
                if (isNaN(value) === false && value !== "") {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            var item_id_to_stock = answer.item_id;
            var units_to_add = answer.units;
            var query = "UPDATE products SET stock_quantity = stock_quantity + " + units_to_add + " WHERE item_id = " + item_id_to_stock

            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("Increasing stock quanity of item " + item_id_to_stock + " by " + units_to_add + "...\n")
                displayInventory()
                connection.end()
            });
        });
}



//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addNewProduct() {
    console.log("Please fill out new product info:\n")

    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Product Name: ",
            validate: function (value) {
                if (isNaN(value) === true && value.length > 2) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "department_name",
            type: "input",
            message: "Department: ",
            validate: function (value) {
                if (departments.indexOf(value) === -1) { // AN IMPROVEMENT WOULD BE TO use the verifyDepartment function, but need to figure out race condition
                    return false;
                }
                return true;
            }
        },
        {
            name: "price",
            type: "input",
            message: "Unit Price: ",
            validate: function (value) {
                if (isNaN(value) === false && value != "") {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Quantity: ",
            validate: function (value) {
                if (isNaN(value) === false && value != "") {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" +
                answer.product_name + "', '" + answer.department_name + "', '" + answer.price + "', '" + answer.stock_quantity + "')";

            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("Adding item '" + answer.product_name + "' the to '" + answer.department_name + "' department...\n")
                displayInventory()
                connection.end()
            });
        });
}