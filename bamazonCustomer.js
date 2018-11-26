var mysql = require("mysql");
var inquirer = require("inquirer");
var moment = require("moment");
var Table = require("cli-table2");


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

function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({head:['item_id','product_name','price']});
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price]);
        }
        console.log(table.toString());

        userPurchase()
    });    
};


function updateProduct(id, new_stock_quantity, new_product_sales) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: new_stock_quantity,
                product_sales: new_product_sales
            },
            {
                item_id: id
            }
        ]
    );
}



function userPurchase() {
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
                    var total_price = res[0].price * units_wanted
                    var new_product_sales = res[0].product_sales + total_price
                    var new_stock_quantity = res[0].stock_quantity - units_wanted
                    updateProduct(item_id_wanted, new_stock_quantity, new_product_sales);
                    console.log("\nYour total is " + total_price + ", thank you for shopping at bAmazon =]")
                    connection.end();
                }
            });

        });
}
