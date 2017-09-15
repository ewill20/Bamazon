var mysql = require("mysql");
var prompt = require("prompt");
var table = ("cli-tables");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Bamazon',
});

var inventoryUpdate = [];
var addedProduct = [];

connection.connect();

var managerOptions = {
    properties: {
        mgrOptions: {
            description: colors.blue("Key in one of the following options: 1) View Products For Sale 2) View Low Inventory 3) Add Inventory 4) Add New Product")
        },
    },
};

prompt.start();

prompt.get(mgrOptions, function(err, res) {
    if(res.mgrOptions === 1) {
        viewProducts();
    } else if(res.mgrOptions === 2) {
        viewInventory();
    } else if(res.mgrOptions === 3) {
        addInventory();
    } else if(res.mgrOptions === 4) {
        addNewProduct();
    } else {
        console.log('You Picked An Invalid Option');
        connection.end();
    }
});

var viewProducts = function() {

    connection.query('SELECT * FROM products', function(err, res) {
        console.log(' ');
        console.log('Products For Sale');
        console.log(' ');

        var Table = new table({
            head: ['Item ID#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],

            }
        });

        for(var i = 0; i < res.length; i++){
            table.push([res[i].ItemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]);
        }

        console.log(table.toString());
        connection.end();
    })
};

var viewInventory = function() {

    connection.query('SELECT * FROM Products WHERE StockQuantity < 5', function(err, res) {
        console.log(' ');
        console.log('Items With Low Inventory');
        console.log(' ');

        var Table = new table({
            head: ["Item ID#", "Product Name", "Department Name", "Price", "Stock Quantity"],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],
            }
        });

        for(var i = 0; i < res.length; i++) {
            table.push([res[i].ItemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]);
        }

        console.log(table.toString());
        connection.end();
    })
};

var addInventory = function() {

    var addInvt = {
        properties: {
            inventoryID: {
                description: colors.red('What is the ID number of the product you want to add invetory for?')
            },
            inventoryAmount: {
                description: colors.red('How many items do you want to add to the inventory?')
            }
        },
    };

    prompt.start();
    
    prompt.get(addInvt, function(err, res) {

        var inventoryAdded = {
            inventoryAmount: res.inventoryAmount,
            inventoryID: res.inventoryID,
        }

        inventoryUpdate.push(inventoryAdded);

        connection.query('UPDATE Products SET StockQuantity = (StockQuantity + ?) WHERE ItemID = ?;', [inventoryUpdate[0].inventoryAmount, inventoryUpdate[0].inventoryID], function(err, result) {

            if(err) console.log('Error ' + err);

            connection.query('SELECT * FROM Products WHERE ItemID = ?', inventoryUpdate[0].inventoryID, function(err, resOne) {
                console.log(' ');
                console.log(' The new update stock quantity for ID# ' + inventoryUpdate[0].inventoryID + ' is ' + resOne[0].StockQuantity);
                console.log(' ');
                connection.end();
            })
        })
    })
};

var addNewProduct = function() {

    var newProduct = {
        properties: {
            newIdNumber: { description: colors.green("Please enter a unique 5-digit item ID#")},
            newItemName: { description: colors.green("Please enter the name of the product you wish to add")},
            newItemDepartment: { description: colors.green("What department does this item belong to?")},
            newItemPrice: { description: colors.green("Please enter the price of the item in the following format '00.00'")},
            newStockQuantity: { description: colors.green("Please enter a stock quantity for this item")},
        }
    }

    prompt.start();

    prompt.get(newProduct, function(err, res) {

        var newItem = {
            newIdNumber: res.newIdNumber,
            newItemName: res.newItemName,
            newItemDepartment: res.newItemDepartment,
            newItemPrice: res.newItemPrice,
            newStockQuantity: res.newStockQuantity,
        };

        addedProduct.push(newItem);

        connection.query('INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (?, ?, ?, ?, ?);', [addedProduct[0].newIdNumber, addedProduct[0].newItemName, addedProduct[0].newItemDepartment, addedProduct[0].newItemPrice, addedProduct[0].newStockQuantity], function(err, result) {

            if(err) console.log('Error ' + err);

            console.log("New item successfully added to inventory");
            console.log(' ');
            console.log('Item ID#: ' + addedProduct[0].newIdNumber);
            console.log('Item name: ' + addedProduct[0].newItemName);
            console.log('Department: ' + addedProduct[0].newItemDepartment);
            console.log('Price: $' + addedProduct[0].newItemPrice);
            console.log('Stock Quantity: ' + addedProduct[0].newStockQuantity);

            connection.end();
        })
    })
};