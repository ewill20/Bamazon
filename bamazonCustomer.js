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

prompt.start();

    // Retrieves the information inputted by the user //
    prompt.get(options, function(err, res) {

    // This dictates what should be done based on user input //
    if(res.options === 1) {
        viewProductSales();
    } else if(res.eOptions === 2) {
        createDepartment();
    } else {
        console.log("You picked an invalid option!");
        connection.end();
    }
});

// Function that runs when the user chooses option 1 //
var viewProductSales = function() {

    // Creates a table for the data to be stored and displayed via Node //
    var Table = new table ({
        head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales', 'Total Profit'],
        style: {
            head: ['blue'],
            compact: false,
            colAligns: ['center'],
        }
    });
    console.log(' ');
    console.log(colors.black.bgWhite.underline('Product Sales by Department'));

    // Connection to the mySql database in order to grab the information from the alias table called totalProfits.  It contains all the information and calculates profit based on sale price and overhead //
    connection.query('SELECT * FROM totalProfits', function(err, res) {
        if(err) console.log("Error " + err);

        // For loop for data pulled from totalProfits database and pushes it into the Node table //
        for(var i = 0; i < res.length; i++) {
            table.push([res[i].DepartmentID, res[i].DepartmentName, res[i].OverheadCosts, res[i].TotalSales, res[i].TotalProfit]);
        }
        console.log(' ');
        console.log(table.toString());
        connection.end();
    })
};

// Function that runs when the user selects option 2 //
var createDepartment = function() {

    // Creates the questions to be prompted when option 2 is selected - total sales is calculated based on sales the user can disregard this as well //
    var newDepartment = {
        properties: {
            newDepartmentName: { description: colors.orange("Please enter the name of the department you would like to add.")
            },
            newOverhead: { description: colors.orange("What are the overhead costs for this department?")
            },
        }
    }

    prompt.start();
    
    prompt.get(newDepartment, function(err, res) {

        var newDepartmentInfo = {
            deptName: res.newDeptName,
            overheadNew: res.newOverhead,
            autoTotalSales: 0,
        };

        newDept.push(newDepartmentInfo);

        connection.query("INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES(?, ?, ?);", [newDepartment[0].deptName, newDepartment[0].overheadNew, newDepartment[0].autoTotalSales], function(err, result) {
            if(err) {
                console.log('Error ' + err);
                connection.end();
            } else {
                console.log(' ');
                console.log(colors.blue.underline('New Department Successfully Created!'));
                console.log(' ');
                connection.end();
            }
        })
    })
};