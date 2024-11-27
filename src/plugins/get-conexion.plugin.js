const mysql = require('mysql2');


let connection;

let pool;

function connect() {
    if (!pool) {
        pool = mysql.createPool({
            host: '44.227.217.144',  // Cambiar por la IP pública de tu base de datos
            user: 'u971737508_Tuturu',
            password: 'Paquitosaurio31245',
            database: 'u971737508_SistemaDenunci',
            port: 3306,
            connectionLimit: 10, // Límite de conexiones concurrentes
            connectTimeout: 10000, // Timeout de conexión (10 segundos)
        });
        console.log("Conexión al pool de MySQL establecida.");
    }

    return pool;
}
function endConnection() {
    if (pool) {
        pool.end((err) => {
            if (err) {
                console.error('Error al cerrar las conexiones del pool:', err);
            } else {
                console.log('Conexiones del pool cerradas.');
            }
        });
    }
}

module.exports = {
    connect,
    endConnection
};