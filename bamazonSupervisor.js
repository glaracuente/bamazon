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
    console.log("bAmazon Supervisor Portal\n");
    console.log("-----------------------------------\n");

    console.log("A) View Product Sales by Department\n");
    console.log("B) Create New Department\n");

    promptUser()
});

function promptUser() {
    inquirer.prompt([
        {
            name: "optionLetter",
            type: "input",
            message: "Please choose an option: ",
            validate: function (value) {
                if (["A", "B"].indexOf(value.toUpperCase()) !== -1) {
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
                    viewProductSales()
                    return connection.end()
                case "B":
                    createNewDepartment()
                    return connection.end()
                default:
                    break;
            }

        });
}

function viewProductSales() {
    console.log("view product sales")
}

function createNewDepartment(){
    console.log("create new department")
}