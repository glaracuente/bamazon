var mysql = require("mysql");
var inquirer = require("inquirer");
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
                    return viewProductSales()
                case "B":
                    return createNewDepartment()
                default:
                    break;
            }

        });
}

function viewProductSales() {
    var query = "select d.department_id,d.department_name,d.over_head_costs,SUM(p.product_sales) AS product_sales,(SUM(p.product_sales) - d.over_head_costs) AS total_profit from departments as d LEFT JOIN products as p ON d.department_name = p.department_name GROUP BY d.department_id,d.department_name;";

    connection.query(query, function (err, res) {
        if (err) throw err;
        var table = new Table({head:['department_id','department_name','over_head_costs','product_sales','total_profit']});
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]);
        }
        console.log(table.toString());
        connection.end()
    });



}

function createNewDepartment() {
    no
    console.log("Please fill out new department info:\n")

    inquirer.prompt([
        {
            name: "department_name",
            type: "input",
            message: "Department Name: ",
            validate: function (value) {
                if (isNaN(value) === true && value.length > 2) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "over_head_costs",
            type: "input",
            message: "Overhead Costs: ",
            validate: function (value) {
                if (isNaN(value) === false && value != "") {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            var query = "INSERT INTO departments (department_name, over_head_costs) VALUES ('" +
                answer.department_name + "', '" + answer.over_head_costs + "')";

            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("Adding new department '" + answer.department_name + "'...\n")
                connection.end()
            });
        });
}