var mysql = require("mysql");
var prompt = require("prompt");
var table = ("cli-tables");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Bamazon',
});

var newDept = [];

connection.connect();

var options = {
    properties: {
        eOptions: {
            description: colors.blue('Key in one of the following options: 1) View Product Sales by Department 2) Create New Department')
        },
    },
};