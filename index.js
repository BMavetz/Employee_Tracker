const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');
const {allDept, allRoles, allEmployees} = require('./db/queryFunctions');
const options = ['View all departments', 'View all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'];

function runApp(){

    inquirer.prompt([
        {
            type:"list",
            name:"userview",
            message:"What you would like to do?",
            choices:options
        }
    ])
    .then((ans)=>{
        console.log(ans);
        switch (ans.userview){
            case options[0]:
                allDept();
                break;
            case options[1]:
                allRoles();
            break;
            case options[2]:
                allEmployees();
                break;
            // case options[3]:
            //     allDept();
            // break;
                default:
            }
        })
        
    }

    runApp();
   