var mysql = require("mysql");
var inquirer = require("inquirer");
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
    console.log("connected as id " + connection.threadId + "\n");
    queryAll();
});

//Show the ids, names, and prices of products for sale.
function queryAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + smallSpacer.slice(eval(res[i].item_id.toString().length)) + " | " + res[i].product_name + largeSpacer.slice(eval(res[i].product_name.length)) + " | " + res[i].price);
        }
        console.log("-----------------------------------\n");
    });
    //connection.end();
    setTimeout(function(){ promptUser(); }, 200);
    //promptUser()
};



//The app should then prompt users with two messages.
//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.

function promptUser() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
        },
        {
            name: "units",
            type: "input",
            message: "How many units of this product would you like you buy?",
            //validate: function (value) {
            //    if (isNaN(value) === false) {
            //        return true;
            //    }
            //    return false;
            //}
        }
    ])
        .then(function (answer) {
            var item_id = answer.item_id;
            var units = answer.units;
            var query = "SELECT * FROM products WHERE item_id=" + item_id;


            connection.query(query, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].item_id + smallSpacer.slice(eval(res[i].item_id.toString().length)) + " | " + res[i].product_name + largeSpacer.slice(eval(res[i].product_name.length)) + " | " + res[i].price);
                }
              });
                   // console.log("Your auction was created successfully!");
                    // re-prompt the user for if they want to bid or post
        });
}

