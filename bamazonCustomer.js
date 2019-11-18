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


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();

});


function start() {
    // showing the full inventory 
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //   Console logging the table here. 
        for (i = 0; i < res.length; i++) {
            // creating this variable so we can use it to compare to the user input later. 
            var inventory = res.length;
            console.log("\n" +
                "item: " + res[i].item_id + "\n" +
                "product name: " + res[i].product_name + "\n" +
                "department: " + res[i].department_name + "\n" +
                "price: " + res[i].price + "\n" +
                "stock_quantity: " + res[i].stock_quantity + "\n");
        }
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
                        }
                        units();
                        function units() {
                            inquirer.prompt([
                                {
                                    type: "input",
                                    message: "How many cards would you like to purchase?",
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
                                        connection.query("UPDATE products SET ? WHERE ?",
                                            [
                                                {
                                                    stock_quantity: stock
                                                },
                                                {
                                                    stock_quantity: newStock
                                                }

                                            ],
                                            function (err, res) {
                                                if (err) throw err;
                                                console.log("now we only have " + newStock + " cards left!");

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

// function units() {

//     inquirer.prompt([
//         {
//             type: "input",
//             message: "How many cards would you like to purchase?",
//             name: "unitNumber"
//         }
//     ]).then(function (answers) {
//         var userInput = answers.unitNumber;
//         console.log("here's how many you ordered: " + userInput)

//         if (userInput > res[i].stock_quantity) {

//             connection.query("SELECT * FROM products", function (err, res) {
//                 if (err) throw err;
//                 //   Console logging the table here. 
//                 console.log(
//                     "\n" + "item: " + res[i].item_id + "\n" +
//                     "product name: " + res[i].product_name + "\n" +
//                     "department: " + res[i].department_name + "\n" +
//                     "price: " + res[i].price + "\n" +
//                     "stock_quantity: " + res[i].stock_quantity + "\n"
//                 )


//                 inquirer.prompt([
//                     {
//                         type: "input",
//                         message: "Sorry. We don't have that many to sell.  How many cards would you actually like to buy?",
//                         name: "buyWhat"
//                     }
//                 ]).then(function (answers) {
//                     var userInput = answers.buyWhat;
//                     var userInput = answers.buyWhat;

//                     console.log("Your ID number is: " + userInput);
//                     connection.query("SELECT * FROM products WHERE ?",
//                         {
//                             item_id: userInput
//                         },
//                         function (err, res) {
//                             if (err) throw err;
//                             // console.log(res);
//                             for (i = 0; i < res.length; i++) {
//                                 console.log(
//                                     "\n" +
//                                     "item: " + res[i].item_id + "\n" +
//                                     "product name: " + res[i].product_name + "\n" +
//                                     "department: " + res[i].department_name + "\n" +
//                                     "price: " + res[i].price + "\n" +
//                                     "stock_quantity: " + res[i].stock_quantity + "\n"
//                                 )
//                             }

//                         });

//                     console.log("here's what the user selected: " + userInput)
//                     connection.end();
//                 });
//             });
//         };
//     });

// }




