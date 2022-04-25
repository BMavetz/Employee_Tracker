const inquirer = require('inquirer');
require('dotenv').config();
const {allDept} = require('./db/queryFunctions');

function runApp(){

    inquirer.prompt([
        {
            type:"list",
            name:"userview",
            message:"Choose what you would like to see",
            choices:["All_Dept", "All_Roles"]
        }
    ])
    .then((ans)=>{
        console.log(ans);
        switch (ans.userview){
            case 'All_Dept':
                allDept();
                break;
            default:
                break;
            }
        })
        
    }

    runApp();