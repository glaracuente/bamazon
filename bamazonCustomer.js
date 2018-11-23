var mysql = require("mysql");
var inquirer = require("inquirer");
var moment = require("moment");
var smallSpacer = "  "
var largeSpacer = "                   "

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
    console.log("bAmazon " + moment().format('dddd')  + " sales!\n");
    displayInventory();
});

//Show the ids, names, and prices of products for sale.
function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + smallSpacer.slice(eval(res[i].item_id.toString().length)) + " | " + res[i].product_name + largeSpacer.slice(eval(res[i].product_name.length)) + " | " + res[i].price);
        }
        console.log("-----------------------------------\n");

        promptUser()
    });    
};


function updateProduct(id, cur_units, desired_units) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: cur_units - desired_units
            },
            {
                item_id: id
            }
        ]
    );
}



function promptUser() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
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
            message: "How many units of this product would you like you buy?",
            validate: function (value) {
                if (isNaN(value) === false && value !== "") {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            var item_id_wanted = answer.item_id;
            var units_wanted = answer.units;
            var query = "SELECT * FROM products WHERE item_id=" + item_id_wanted;

            connection.query(query, function (err, res) {
                if (units_wanted > res[0].stock_quantity) {
                    console.log("Insufficient stock to fulfill your request!")
                }
                else {
                    updateProduct(item_id_wanted, res[0].stock_quantity, units_wanted);
                    var total_price = res[0].price * units_wanted
                    console.log("\nYour total is " + total_price + ", thank you for shopping at bAmazon =]")
                    connection.end();
                }
            });

        });
}

