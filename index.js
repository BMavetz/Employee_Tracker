const mysql = require('mysql2');
//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Rangers04',
        database: ''
    },
    console.log(`connected to the ${db.databse} databse`)
);
db.query('SELECT id,first_name FROM students', function(err, results){
    res.json(results)
});