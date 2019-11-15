var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
 
// instantiate. Come back to this table. 
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
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
        });
      }