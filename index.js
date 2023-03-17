const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Root',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const initPromptUser = () => {
    return inquirer.prompt([
        {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: 
        [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    }
])

    .then((data) => { 
        console.log(data);
        switch(data.userChoice) {
            case "View All Employees":
                viewAllEmployees();
            break;

            case "Add Employee":
                addEmployee();
            break;

            case "Update Employee Role":
                updateEmployeeRole();
            break;

            case "View All Roles":
                viewAllRoles();
            break;

            case "Add Role":
                addRole();
            break;

            case "View All Departments":
                viewAllDepartments();
            break;

            case "Add Department":
                addDepartment();
            break;

            case "Quit":
                console.log("Toodaloo")
                process.exit()
        }


    })
}

const viewAllEmployees = () => {
    console.log('You selected view employees')
        db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)", (err, data) => {
            err ? console.log(err) : console.log("\n");
            console.table(data);

        })


    initPromptUser();
}


const addEmployee = () => {
    console.log("You selected add new employee")
        db.query("SELECT id AS value, title AS name FROM role", (err, data) => {
            err ? console.log(err) : console.log(data);
            db.query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee WHERE manager_id IS null', (err, managerData) => {
                err ? console.log(err) : console.log(managerData)
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the employees first name?"
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employees last name?"
                    },
                    {
                        type: "list",
                        name: "role_id",
                        message: "What is the employee's role?",
                        choices: data
                    },
                    {
                        type: "list",
                        name: "manager_id",
                        message: "Who is the employee's manager?",
                        choices: managerData
                    }
                ])
                .then(({ first_name, last_name, role_id, manager_id }) => {
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`, (err, data) => { err ? console.log(err) : console.log("New employee created");
                    initPromptUser();
                })
                })
            })
                    
        })
}


const updateEmployeeRole = () => {


    initPromptUser()
}

const viewAllRoles = () => {
    console.log("You selected view roles")
        db.query("SELECT * FROM role", (err, data) => {
            err ? console.log(err) : console.log("\n");
            console.table(data);
        })

    initPromptUser()
}

const addRole = () => {
    db.query("SELECT id AS value, name FROM department", (err, data) => {
        err ? console.log(err) : console.log("\n");
        console.table(data);
        inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does this role belong to?",
                choices: data
            }
        ])
        .then(({ title, salary, department_id }) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`, (err, data) => {
                err ? console.log(err) : console.log("New role created");
                initPromptUser();
            })
        })
    })
    }


const viewAllDepartments = () => {
    console.log("You selected view database")
        db.query("SELECT * FROM department", (err, data) => {
            err ? console.log(err) : console.log("\n");
            console.table(data);
        })

    initPromptUser()
}

const addDepartment = () => {
    inquirer
    .prompt([
    {
        type: "input",
        name: "name",
        message: "What is the name of the department?"
    },
])
    .then(({ name }) => {
        db.query(`INSERT INTO department (name) VALUES ("${name}")`, (err, data) => {
            err ? console.log(err) : console.log("New department created");
            initPromptUser();
        })
    
    })
}
initPromptUser();