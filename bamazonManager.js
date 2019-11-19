var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');

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
    intro();

});

function intro() {
    // prompt pops up. 
    inquirer.prompt([
        {
            type: "list",
            message: "Mr. Manager, what would you like to do?",
            choices: ["View Products For Sale", "View Low Invetory", "Add to Inventory", "Add New Product"],
            name: "managerChoice"
        }
    ]).then(function (answers) {

        if (answers.managerChoice === "View Products For Sale") {
            console.log("Running view")
            view();
        }
        if (answers.managerChoice === "View Low Invetory") {
            console.log("Running View Low Inventory")
            low();
        }
        if (answers.managerChoice === "Add to Inventory") {
            console.log("Running view")
            add();
        }
        if (answers.managerChoice === "Add New Product") {
            console.log("Running view")
            newProduct();
        }
    });
}

function view() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // instantiate. Come back to this table. 
        var table = new Table({
            head: ['Item ID', "Product Name", "Category", "Price", "Stock"]
        });

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
        }
        console.log(table.toString());
    });
}

function low() {
    console.log("Here are the cards we're running low on.")
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",
        function (err, res) {
            if (err) throw err;
            var table = new Table({
                head: ['Item ID', "Product Name", "Category", "Price", "Stock"]
            });
            // console.log(res);
            for (i = 0; i < res.length; i++) {
                var array = [
                    res[i].item_id,
                    res[i].product_name,
                    res[i].department_name,
                    res[i].price,
                    res[i].stock_quantity
                ];
                table.push(array);
            };
            console.log(table.toString());
        }
    )
}

function add() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // instantiate. Come back to this table. 
        var table = new Table({
            head: ['Item ID', "Product Name", "Category", "Price", "Stock"]
        });

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
            var cardName = res[i].product_name;
        }
        console.log(table.toString());
        console.log("Here's what we have now.");
    });
    console.log("----------------");
    inquirer.prompt([
        {
            message: "Adding to which product name?",
            name: "productName",
            type: "input"
        },
        {
            message: "How many total cards do we have now?",
            name: "add",
            type: "input"
        }
    ]).then(function (answers) {
        console.log("Thank's for adding a new Product. here are the details: ");
        console.log(answers.add);
        console.log(answers.productName);
        var quantity = answers.add;
        var product = answers.productName;
        // Now need to insert the new variable. 
        connection.query(
            "UPDATE products SET ? WHERE ?",
            // WHY ISN'T THIS WORKING? 
            {
                stock_quantity: quantity
            },
            {
                product_name: product
            },
            function (err, res) {
                if (err) throw err;
                console.log("-----------------------")
                console.log("Thanks!");
            }
            // end of start function. 
        );
    });


}

function newProduct() {

}
// inquirer.prompt([
//     {
//         type: "input",
//         message: "What is the id of the product you would like to buy?",
//         choices: ["View Products For Sale", "View Low Invetory", "Add to Inventory", "Add New Product"],
//         name: "buyWhat"
//     }
// ]).then(function (answers) {
//     var userInput = answers.buyWhat;
//     console.log("here's what the user selected: " + userInput);
//     // If the userInput ID is larger than the length, it means it doesn't match an ID. Easy way of solving that problem. 
//     if (userInput > inventory) {
//         console.log(
//             "That doesn't match any id! We can only sell you what we have!"
//         );
//         // We'll just restart everything if they give a fake id. 
//         start();
//     }
//     else {
//         connection.query("SELECT * FROM products WHERE ?",
//             {
//                 item_id: userInput
//             },
//             function (err, res) {
//                 if (err) throw err;
//                 var table2 = new Table({
//                     head: ['Item ID', "Product Name", "Category", "Price", "Stock"]
//                 });
//                 // console.log(res);
//                 for (i = 0; i < res.length; i++) {
//                     var array2 = [
//                         res[i].item_id,
//                         res[i].product_name,
//                         res[i].department_name,
//                         res[i].price,
//                         res[i].stock_quantity
//                     ];
//                     table2.push(array2);
//                     var stock = res[i].stock_quantity;
//                     var price = res[i].price;
//                     var itemID = res[i].item_id;
//                 };
//                 console.log(table2.toString());
//                 units();
//                 function units() {
//                     inquirer.prompt([
//                         {
//                             type: "input",
//                             message: "How many cards would you like to purchase? We have " + stock + " total. " + "They're $" + price + " each.",
//                             name: "unitNumber"
//                         }
//                     ]).then(function (answers) {
//                         var stockNumber = answers.unitNumber;
//                         if (stockNumber > stock) {
//                             console.log("We don't have that many to sell!");
//                             units();
//                         }
//                         else {
//                             console.log("You bought " + stockNumber + " cards!");
//                             editCount();
//                             function editCount() {
//                                 var newStock = stock - stockNumber;
//                                 var paid = stockNumber * price;
//                                 connection.query("UPDATE products SET ? WHERE ?",
//                                     [
//                                         {
//                                             stock_quantity: newStock
//                                         },
//                                         {
//                                             item_id: itemID
//                                         }

//                                     ],
//                                     function (err, res) {
//                                         if (err) throw err;
//                                         console.log("-----------------------")
//                                         console.log("Now we only have " + newStock + " cards left!");
//                                         console.log("-----------------------")
//                                         console.log("You paid $" + paid + ". Thanks for shopping!");
//                                         console.log("-----------------------")

//                                         inquirer.prompt([
//                                             {
//                                                 type: "list",
//                                                 message: "Want to keep shopping or call it a day?",
//                                                 choices: ["Keep shopping!", "Quit. I'm tired of your store."],
//                                                 name: "shopOrQuit"
//                                             }
//                                         ]).then(function (answer) {
//                                             if (answer.shopOrQuit === "Keep shopping!") {
//                                                 start();
//                                             }
//                                             if (answer.shopOrQuit === "Quit. I'm tired of your store.") {

//                                                 console.log("Alright, thanks for stopping by!")
//                                                 connection.end();
//                                             }

//                                         });

//                                     }

//                                 )
//                             };
//                         };

//                     });

//                 }

//             }
//         );

//     }

// });
// });
// }






