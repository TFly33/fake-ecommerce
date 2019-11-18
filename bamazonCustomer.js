var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');

// instantiate. Come back to this table. 
// var table = new Table({
//     head: ['Item ID', "Product Name", "Category", "Price", "Stock"]
//     , colWidths: [20, 25]
// });

// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     ['First value', 'Second value']
//     , ['First value', 'Second value']
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


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();

});


function start() {
    // showing the full inventory 
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // instantiate. Come back to this table. 
        var table = new Table({
            head: ['Item ID', "Product Name", "Category", "Price", "Stock"]
        });

        var inventory = res.length;
        //   Console logging the table here. 
        for (i = 0; i < res.length; i++) {
            // creating this variable so we can use it to compare to the user input later. 
            var array = [
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
            ];
            table.push(array);
            // console.log("\n" +
            //     "item: " + res[i].item_id + "\n" +
            //     "product name: " + res[i].product_name + "\n" +
            //     "department: " + res[i].department_name + "\n" +
            //     "price: " + res[i].price + "\n" +
            //     "stock_quantity: " + res[i].stock_quantity + "\n");
        }
        console.log(table.toString());
        inquirer.prompt([
            {
                type: "input",
                message: "What is the id of the product you would like to buy?",
                name: "buyWhat"
            }
        ]).then(function (answers) {
            var userInput = answers.buyWhat;
            console.log("here's what the user selected: " + userInput);
            // If the userInput ID is larger than the length, it means it doesn't match an ID. Easy way of solving that problem. 
            if (userInput > inventory) {
                console.log(
                    "That doesn't match any id! We can only sell you what we have!"
                );
                // We'll just restart everything if they give a fake id. 
                start();
            }
            else {
                connection.query("SELECT * FROM products WHERE ?",
                    {
                        item_id: userInput
                    },
                    function (err, res) {
                        if (err) throw err;
                        // console.log(res);
                        for (i = 0; i < res.length; i++) {
                            console.log(
                                "\n" +
                                "item: " + res[i].item_id + "\n" +
                                "product name: " + res[i].product_name + "\n" +
                                "department: " + res[i].department_name + "\n" +
                                "price: " + res[i].price + "\n" +
                                "stock_quantity: " + res[i].stock_quantity + "\n"
                            );
                            var stock = res[i].stock_quantity;
                            var price = res[i].price;
                            var itemID = res[i].item_id;
                        }
                        units();
                        function units() {
                            inquirer.prompt([
                                {
                                    type: "input",
                                    message: "How many cards would you like to purchase? We have " + stock + " total. " + "They're $" + price + " each.",
                                    name: "unitNumber"
                                }
                            ]).then(function (answers) {
                                var stockNumber = answers.unitNumber;
                                if (stockNumber > stock) {
                                    console.log("We don't have that many to sell!");
                                    units();
                                }
                                else {
                                    console.log("You bought " + stockNumber + " cards!");
                                    editCount();
                                    function editCount() {
                                        var newStock = stock - stockNumber;
                                        var paid = stockNumber * price;
                                        connection.query("UPDATE products SET ? WHERE ?",
                                            [
                                                {
                                                    stock_quantity: newStock
                                                },
                                                {
                                                    item_id: itemID
                                                }

                                            ],
                                            function (err, res) {
                                                if (err) throw err;
                                                console.log("now we only have " + newStock + " cards left!");
                                                console.log("you paid $" + paid + ". Thanks for shopping!");
                                                // BEYOND THIS POINT IS NOT WORKING PROPERLY BECAUSE THE TABLE ISN'T UPDATING. 
                                               start();
                                            }

                                        )
                                    };
                                };

                            });

                        }

                    }
                );

            }

        });
    });
}






