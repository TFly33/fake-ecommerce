var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.MY_SQL_PASS,
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
            choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "managerChoice"
        }
    ]).then(function (answers) {

        if (answers.managerChoice === "View Products For Sale") {
            console.log("Running view")
            view();
        }
        if (answers.managerChoice === "View Low Inventory") {
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
        inquirer.prompt([
            {
                message: "Want to keep making changes, or call it a day?",
                name: "choice",
                choices: ["Keep making changes!", "I'm done! Get me out of here!"],
                type: "list"
            }
        ]).then(function (answer) {
            if (answer.choice === "Keep making changes!") {
                intro();
            }
            if (answer.choice === "I'm done! Get me out of here!") {
                console.log("Alright, thanks for stopping by!")
                connection.end();
            }
        });
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
            inquirer.prompt([
                {
                    message: "Want to keep making changes, or call it a day?",
                    name: "choice",
                    choices: ["Keep making changes!", "I'm done! Get me out of here!"],
                    type: "list"
                }
            ]).then(function (answer) {
                if (answer.choice === "Keep making changes!") {
                    intro();
                }
                if (answer.choice === "I'm done! Get me out of here!") {
                    console.log("Alright, thanks for stopping by!")
                    connection.end();
                }
            });
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
        }
        console.log(table.toString());
        inquirer.prompt([
            {
                message: "Adding to which product name?",
                name: "productName",
                type: "input"
            },
            {
                message: "How many cards do we have in stock now?",
                name: "add",
                type: "input"
            }
        ]).then(function (answers) {
            console.log(answers.add);
            console.log(answers.productName);
            var quantity = parseInt(answers.add);
            var product = answers.productName;
            // Now need to insert the new variable. 
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: quantity
                },
                {
                    product_name: product
                },
            ],
                function (err, res) {
                    if (err) throw err;
                    console.log("-----------------------")
                    console.log("Here's your new manager view");
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
                        inquirer.prompt([
                            {
                                message: "Want to keep making changes, or call it a day?",
                                name: "choice",
                                choices: ["Keep making changes!", "I'm done! Get me out of here!"],
                                type: "list"
                            }
                        ]).then(function (answer) {
                            if (answer.choice === "Keep making changes!") {
                                intro();
                            }
                            if (answer.choice === "I'm done! Get me out of here!") {
                                console.log("Alright, thanks for stopping by!")
                                connection.end();
                            }
                        });
                    });

                }
              
            );
        });
    });
    console.log("----------------");
}

function newProduct() {
    console.log("Alright, let's add a new product. No crappy cards in this store.");
    inquirer.prompt([
        {
            message: "Product name?",
            name: "product_name"
        },
        {
            message: "What's the category?",
            name: "category"
        },
        {
            message: "What's the price?",
            name: "price"
        },
        {
            message: "How many are in stock?",
            name: "stock"
        },
        // end of prompt syntax
    ]).then(function (answers) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answers.product_name,
                department_name: answers.category,
                price: parseInt(answers.price),
                stock_quantity: parseInt(answers.stock)
            }

        );
        console.log("Here is the updated store!");
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
            inquirer.prompt([
                {
                    message: "Want to keep making changes, or call it a day?",
                    name: "choice",
                    choices: ["Keep making changes!", "I'm done! Get me out of here!"],
                    type: "list"
                }
            ]).then(function (answer) {
                if (answer.choice === "Keep making changes!") {
                    intro();
                }
                if (answer.choice === "I'm done! Get me out of here!") {
                    console.log("Alright, thanks for stopping by!")
                    connection.end();
                }
            });
        });
    });
}


