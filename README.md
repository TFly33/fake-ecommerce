# fake-ecommerce

I have a video explanation of the app. It is available here: 
https://youtu.be/PHNyw9VP74w

1. Purpose.

Bamazon is a fake baseball card store. There are two separate js files, customer and manager. 

Customer is designed to: 

    A. Display the current inventory of the baseball store using a table in Terminal. 
    B. Users can purchase baseball cards using the command line prompts. 
    C. The terminal will tell the user exactly how much they spent. 
    D. A new table with updated inventory is displayed. 

Manager is designed to: 

    A. Display the current inventory of the baseball store using a table in Terminal. 
    B. Display "low inventory" products specifically in the Terminal. 
    C. Add to the existing inventory in the terminal, and update the table. 
    D. Add a new product entirely in the terminal. 

2. How it works: 
The javascript accesses a mysql database which holds the inventory. A series of inquirer prompts lead to specific functions. The functions allow the customer/manager to view and adjust the values using INSERTS, UPDATES, and SELECTS in the database without ever having to touch the mysql table where the data lives. 

3. To run the APP: 
You will need to npm install the following packages: 
mysql
inquirer
cli-table3

The command line prompt will guide you through your selections. If at any point you want to quit, the prompt will have an option.  

4. The app uses: 
Javascript
MySQL
Inquirer
CLI-Table3

"dependencies": {
mysql
inquirer
cli-table3

5. Created by Tommy Flynn for Penn Coding Bootcamp 2019 


