const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');
const {allDept} = require('./db/queryFunctions');
const options = ['View all departments', 'View all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'];

function runApp(){

    inquirer.prompt([
        {
            type:"list",
            name:"userview",
            message:"Choose what you would like to see",
            choices:options
        }
    ])
    .then((ans)=>{
        console.log(ans);
        switch (ans.userview){
            case options[0]:
                allDept();
                break;
            default:
                break;
            }
        })
        
    }

    runApp();