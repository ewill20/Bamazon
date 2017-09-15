CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products (
ItemID INT NOT NULL AUTO_INCREMENT,
ProductName varchar(50) NOT NULL,
DepartmentName varchar(50) NOT NULL,
Price DECIMAL(5,2) NOT NULL,
StockQuantity int NOT NULL);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
66614,
'Oakley Juliet Sunglasses',
'Mens Accessories',
549.99,
7);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
92835,
'MacBook Pro',
'Electronics',
3299.99,
15);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
90803,
'Puma Tennis Shoes',
'Shoes',
64.99,
12);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
31000,
'Hollister Cologne',
'Cologne',
71.99,
8);

INSERT INTO Product (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
90210,
'Apple Magic Mouse',
'Electronics',
39.99,
35);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
90010,
'Underarmour Shirt',
'Clothing',
34.99,
35);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
95210,
'1967 Shelby Mustang',
'Automobiles',
65000.00,
1);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
10012,
'H&M High Heel Shoes',
'Womens Clothing',
42.99,
17);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
35654,
'Hard-sided Luggage',
'Baggage',
89.99,
9);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
89502,
'Swiss Gear Backpack',
'Baggage',
119.99,
6);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
66205,
'Electronic Screen Cleaner',
'Electronic Accessories',
19.99,
30);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
32501,
'Vintage VCR',
'Electronics',
24.99,
10);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
46555,
'"The Patriot" VHS',
'Media',
8.99,
1);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
56980,
'Sony a7rII Mirrorless Camera',
'Cameras & Lenses',
2699.99,
11);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
32140,
'Sony 24-70mm G Master Lens',
'Cameras & Lenses',
2199.99,
4);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
25888,
'Billy Reid Peacoat',
'Mens Clothing',
699.99,
2);

INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (
60001,
'Persol Sunglasses',
'Mens Accessories',
165.99,
8);

USE Bamazon;
CREATE TABLE Departments (
DepartmentId INT AUTO_INCREMENT,
PRIMARY KEY(DepartmentId),
DepartmentName varchar(50) NOT NULL,
OverheadCosts DECIMAL(11,2) NOT NULL,
TotalSales DECIMAL(11,2) NOT NULL);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Mens Accessories',
2000,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Electronics',
1250,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Shoes',
1750,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Cologne',
1500,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Clothing',
1250,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Automobiles',
5000,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Womens Clothing',
1250,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Baggage',
1000,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Electronic Accessories',
1300,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Media',
600,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Cameras & Lenses',
1800,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Mens Clothing',
1100,
0);

INSERT INTO Departments (DepartmentName, OverheadCosts, TotalSales) VALUES (
'Mens Accessories',
900,
0);

SHOW TABLES;
CREATE VIEW bamazon.TotalProfits AS SELECT DepartmentId, DepartmentName, OverheadCosts, TotalSales, TotalSales-OverheadCosts AS TotalProfit FROM Departments;























