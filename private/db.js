const Pool = require("pg").Pool;

const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TSE',
    password: '1234',
    port: 5432,
})

connection.connect(function(err){
    if (err) {
        console.log(err);
        return;
    }
    console.log(" connection established");
})

module.exports = connection;