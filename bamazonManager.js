var mysql = require("mysql");
var inquirer = require("inquirer");
var smallSpacer = "      "
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
    console.log("bAmazon Manager Portal\n");
    console.log("-----------------------------------\n");

    console.log("A) View Products for Sale\n");
    console.log("B) View Low Inventory\n");
    console.log("C) Add to Inventory\n");
    console.log("D) Add New Product\n");

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
                    return displayInventory()
                    break;
                case "B":
                    return displayLowInventory()
                    break;
                case "C":
                    return servePage("foods", req, res)
                    break;
                case "D":
                    return servePage("frameworks", req, res)
                    break;
                default:
                    break;
            }

        });
}


//Show 
function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + smallSpacer.slice(eval(res[i].item_id.toString().length)) + " | " + res[i].product_name + largeSpacer.slice(eval(res[i].product_name.length)) + " | " + res[i].price + smallSpacer.slice(eval(res[i].price.toString().length)) + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------\n");
    });
    connection.end()
};

//Show 
function displayLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 100", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + smallSpacer.slice(eval(res[i].item_id.toString().length)) + " | " + res[i].product_name + largeSpacer.slice(eval(res[i].product_name.length)) + " | " + res[i].price + smallSpacer.slice(eval(res[i].price.toString().length)) + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------\n");
    });
    connection.end()
};


/*

function addToInventory() {
    inquier.prompt the user which item, and how much more

    UPDATE stock_quantity=stock_quantity + 1 WHERE item_id=id || name=name
}

function addNewProduct() {
    inquier.prompt the user for all info

    PUT new ROW WITH GIVEN VALUES 

    
}

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
*/