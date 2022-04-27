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
            pageSize: 8,
            name:"userview",
            message:"What you would like to do?",
            choices: options
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
                addDept();
                break;
            case options[4]:
                mapDept();
                break;
            case options[5]:
                mapRole();
                break;
            case options[6]:
                
                break;    
            case options[7]:
                process.exit();
            
                default:
            }
        })
        
    }
function mapDept(){
 db.query('SELECT * FROM department', function(err, results){
    const dept_n = results.map(function(item){
        return item.dept_name;
    });
    const deptLen = dept_n.length;
    getRole(dept_n, deptLen);

});
}

function mapRole(){
    db.query('SELECT * FROM job_role', function(err, results){
       const roles = results.map(function(item){
           return item.title;
       });
       roles;
       const roleLen = roles.length;
       mapEmpl(roles, roleLen);
   });
   }

function mapEmpl(roles, roleLen){
    db.query('SELECT * FROM employee', function(err, results){
       const empl = results.map(function(item){
            //console.log(item.first_name + ' ' + item.last_name); 
        return item.first_name + ' ' + item.last_name;
       });
       empl.push('None');
       const emplLen = empl.length;
       getEmpl(roles, roleLen, empl, emplLen)
    //    roles.push('none');
    //    const roleLen = roles.length;
    //    getEmpl(roles, roleLen);
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

function addDept(){
    inquirer.prompt([
        {
            type:"input",
            name:"deptName",
            message:"Please enter the name of the department you would like to add: "
        }
    ])
    .then((ans)=>{
        console.log(ans.deptName);
    db.query('INSERT INTO department (dept_name) VALUES (?)', ans.deptName, function(err, results){
        console.log(results);
        runApp();
    })
})
}

function getRole(dept, length){
         inquirer.prompt([
            {
                type:"input",
                name:"roleName",
                message:"Please enter the name of the role you would like to add: "
            },
            {
                type:"input",
                name:"salary",
                message:"Please enter the salary for this role: "
            },
            {
                type:"list",
                name:"deptName",
                pageSize: length,
                message:"Please enter the name of the department you would like to add: ",
                choices: dept                
            }
        ])
        .then((ans)=>{
            console.log(ans);
            db.query('select id from department where dept_name = (?)', ans.deptName, function(err, results){
                    console.log(results[0].id);
                    const id = results[0].id;
                    addRole(ans.roleName, ans.salary, id);
            });
    })
    }

    function addRole(roleName, salary, id){
        db.query('INSERT INTO job_role (title, salary, dept_id) VALUES (?, ?, ?)', [roleName, salary, id], function(err, results){
            console.log(results);
            runApp();
        })
    }

    function getEmpl(roles, roleLen, empl, emplLen){
        inquirer.prompt([
           {
               type:"input",
               name:"firstName",
               message:"Please enter the first name of the employee: "
           },
           {
               type:"input",
               name:"lastName",
               message:"Please enter the last name of the employee: "
           },
           {
               type:"list",
               name:"roleName",
               pageSize: roleLen,
               message:"Please select the role of the employee: ",
               choices: roles                
           },
           {
            type:"list",
            name:"Manager",
            pageSize: emplLen,
            message:"Please select the manager of the employee.  Select \"none\" if they do not have a manger: ",
            choices: empl                
        }
       ])
       .then((ans)=>{
           console.log(ans);
           db.query('select id from job_role where title = (?)', ans.roleName, function(err, results){
                   console.log(results);
                   const roleID = results[0].id;
                   db.query('SELECT id FROM employee WHERE concat(first_name,\' \',last_name) = (?)', ans.Manager, function(err, results){
                    console.log(results);
                    var mgrID;
                    if(results.length === 0){
                        mgrID = null;
                        console.log(mgrID);
                    }else{
                    mgrID = results[0].id;
                    console.log(roleID);
                    console.log(mgrID);
                    }
                    addEmpl();            });
           });
   })
   }

function addEmpl(){
    console.log('hello');
}

runApp();
   