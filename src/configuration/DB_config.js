const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_node',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Exportar la conexión con soporte para promesas
module.exports = connection.promise();
