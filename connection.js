const mysql = require("mysql");
const util = require('util');
// const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeeTracker_DB"
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;