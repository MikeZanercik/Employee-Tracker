const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeeTracker_DB"
});

connection.connect(function(err){
    if (err) throw err;
    start();
})

function start(){
    inquirer   
        .prompt({
            name: "addViewUpdate",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Role", "View Employees", "Update Employee Role"]
        })
        .then(function(answer){
            if (answer.addViewUpdate === "Add Department"){
                addDepartment();
            }
            if (answer.addViewUpdate === "Add Role"){
                addRole();
            }
            if (answer.addViewUpdate === "Add Employee"){
                addEmployee();
            }
            if (answer.addViewUpdate === "View Department"){
                viewDepartment();
            }
            if (answer.addViewUpdate === "View Role"){
                viewRole();
            }
            if (answer.addViewUpdate === "View Employees"){
                viewEmployees();
            }
            if (answer.addViewUpdate === "Update Employee Role"){
                updateEmployeeRole();
            }
        })
}

function addDepartment() {
    inquirer
        .prompt([
            {
            name: "addDepartment",
            type: "input",
            message: "What department would you like to add?"
            }
        ])
        .then (function(answer){
            connection.query("INSERT INTO department SET ?",
            {
                name: answer.addDepartment
            },
            function (err) {
                if (err) throw err;
                console.log("You successfully added a department")
                // console.table(answer.addDepartment);
                start();
            }
            );
        })
};

function addRole() {
    inquirer
        .prompt([
            {
            name: "addRole",
            type: "input",
            message: "What role would you like to add?"
            },
            {
                name:"addRoleSal",
                type: "input",
                message: "What is their salary?"
            },
            {
                name: "addRoleDepartment_id",
                type: "input",
                message: "What is their department id?"
            }
        ])
        .then (function(answer){
            connection.query("INSERT INTO role SET ?",
            {
                title: answer.addRole,
                salary: answer.addRoleSal,
                department_id: answer.addRoleDepartment_id
            },
            function (err) {
                if (err) throw err;
                console.log("You successfully added a role")
                start();
            }
            );
        })
};



function addEmployee() {
    inquirer
        .prompt([
            {
            name: "addEmployeeFirst",
            type: "input",
            message: "What is the employees first name?"
            },
            {
                name:"addEmployeeLast",
                type: "input",
                message: "What is the employees last name?"
            },
            {
                name: "addRoleid",
                type: "input",
                message: "What is their role id?"
            },
            {
                name: "addManagerid",
                type: "input",
                message: "What is their manager id?"
            }
        ])
        .then (function(answer){
            connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.addEmployeeFirst,
                last_name: answer.addEmployeeLast,
                role_id: answer.addRoleid,
                manager_id: answer.addManagerid
            },
            function (err) {
                if (err) throw err;
                console.log("You successfully added an employee")
                start();
            }
            );
        })
};

returnDepartmentList();
function returnDepartmentList(){
    var sqlStr = "SELECT * FROM department"
    connection.query(sqlStr, function(err, res){
        if (err) throw err,
        console.log(res)
        // console.log(console);
    })

}
// console.log(process)
function viewDepartment() {
   returnDepartmentList();
    inquirer
        .prompt([
            {
            name: "viewDepartment",
            type: "list",
            choices: ["operations"],
            message: "What department would you like to view?"
            }
        ])
        .then (function(answer){
            connection.query("SELECT * FROM department",
            {
                name: answer.viewDepartment,
            },
            function (err) {
                if (err) throw err;
                console.log("You successfully added an employee")
                start();
            }
            );
        })
};

// viewRole();

// viewEmployees();

// updateEmployeeRole();