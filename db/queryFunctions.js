const db = require('./connection');

function allDept(){
    db.query('SELECT * FROM department', function(err, results){
        console.table(results)
    });
}

module.exports = {
    allDept
}