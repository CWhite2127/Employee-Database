const { prompt } = require('inquirer');
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

const userOptions = {
    "View all departments": () => {
        console.log("You selected view database")
        db.query("SELECT * FROM department", (err, data) => {
            err ? console.log(err) : console.log("\n");
            console.table(data);
        });
    init();
    },
    
    "Add a department": () => {
        console.log("Added new department");
        init();
    },

    "View Roles": () => {
        console.log("You selected view roles")
        db.query("SELECT * FROM role", (err, data) => {
            err ? console.log
        })
    }

}




const init = async () => {
    const answer = await prompt(initPromptUser);
    options[answer.userChoice]();
}

const initPromptUser = [
    {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: Object.keys(userOptions)
    }
]