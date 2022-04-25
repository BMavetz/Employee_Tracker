const db = require('./connection');

function allDept(){
    db.query('SELECT * FROM department', function(err, results){
        console.log(results)
    });
}

module.exports = {
    allDept
}