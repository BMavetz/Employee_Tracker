const inquirer = require('inquirer');
require('dotenv').config();
const db = require('./db/connection');
const cTable = require('console.table');
//const {allDept, allRoles, allEmployees} = require('./queryFunctions');
const options = ['View all departments', 'View all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Exit Application'];
const getRoles = 'SELECT job_role.id, title, dept_name, salary FROM job_role JOIN department ON job_role.dept_id = department.id;';

const getEmployees = 'SELECT e.id, e.first_name, e.last_name, title, dept_name, salary, CONCAT(m.first_name, \' \', m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id JOIN job_role ON e.role_id = job_role.id JOIN department ON job_role.dept_id = department.id;';
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
            case options[3]:
                mapResults();
                break;
            case options[7]:
                process.exit();
            
                default:
            }
        })
        
    }
function mapResults(){
 db.query('SELECT * FROM department', function(err, results){
    console.log(results);
    const dept_n = results.map(function(item){
        return item;
    });
    console.log(dept_n);
    console.table(dept_n);
});
}

function allDept(){
    
    db.query('SELECT * FROM department', function(err, results){
        console.table(results)
        runApp();
    })
    }

function allRoles(){
    db.query(getRoles, function(err, results){
        console.table(results);
        runApp();
        })
    }

function allEmployees(){
    db.query(getEmployees, function(err, results){
        console.table(results);
        runApp();
    })
    }
    

runApp();
   