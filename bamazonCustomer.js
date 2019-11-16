var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('cli-table3');

// // instantiate. Come back to this table. 
// var table = new Table({
//     head: ['TH 1 label', 'TH 2 label']
//   , colWidths: [100, 200]
// });

// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     ['First value', 'Second value']
//   , ['First value', 'Second value']
// );

// console.log(table.toString());

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Voltaire279G",
    database: "bamazon_db"
});


// PUT SWITCH HERE. 

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();

});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //   Console logging the tabl here. 
        console.log(res);

        // here's my inquirer. 
        inquirer.prompt([
            {
                type: "input",
                message: "What is the id of the product you would like to buy?",
                name: "buyWhat"
            }
        ]).then(function (answers) {
            var userInput = answers.buyWhat;

            console.log("here's what the user selected: " + userInput);
            connection.query("SELECT * FROM products WHERE ?",
            {
                item_id: userInput
            },
            function (err, res) {
                if (err) throw err;
                // console.log(res);
                for (i = 0; i < res.length; i++) {
                    console.log(
                        "item: " + res[i].item_id + "\n" +
                        "product name: " + res[i].product_name + "\n" +
                        "department: " + res[i].department_name + "\n" +
                        "price: " + res[i].price + "\n" +
                        "stock_quantity: " + res[i].stock_quantity + "\n" 
                    )
                }

            });
            units();

        });
    });
}

function units() {

    
    inquirer.prompt([
        {
            type: "input",
            message: "How many cards would you like to purchase?",
            name: "unitNumber"
        }
    ]).then(function (answers) {
        var userInput = answers.unitNumber;
        console.log("here's how many you ordered: " + userInput)
        if (userInput > 10) {

            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                //   Console logging the table here. 
                console.log(res);

                // here's my inquirer. 
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Sorry. We don't have that many to sell.  How many cards would you actually like to buy?",
                        name: "buyWhat"
                    }
                ]).then(function (answers) {
                    var userInput = answers.buyWhat;

                    console.log("here's what the user selected: " + userInput)
                    connection.end();
                });
            });
        };
    });
    
}




