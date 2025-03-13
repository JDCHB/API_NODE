const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'db_node', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error de conexión a la base de datos:', err);
    } else {
        console.log('✅ Conectado a la base de datos');
        connection.release(); // Liberar la conexión
    }
});

module.exports = pool.promise(); // Permite usar async/await
