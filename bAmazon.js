var fork = require('child_process').fork;
var inquirer = require("inquirer");

console.log("bAmazon Portal\n");
console.log("-----------------------------------\n");

console.log("A) Customer View\n");
console.log("B) Manager View\n");
console.log("C) Supervisor View\n");

promptUser()


function promptUser() {
    inquirer.prompt([
        {
            name: "optionLetter",
            type: "input",
            message: "Please choose an option: ",
            validate: function (value) {
                if (["A", "B", "C"].indexOf(value.toUpperCase()) !== -1) {
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
                    var child = fork('./bamazonCustomer.js');
                    break;
                case "B":
                    var child = fork('./bamazonManager.js');
                    break;
                case "C":
                    var child = fork('./bamazonSupervisor.js');
                    break;
                default:
                    break;
            }

        });
}
