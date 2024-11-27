

const mysql = require('mysql2');

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: 'blsj1wqmfmkypexcxtvj-mysql.services.clever-cloud.com',
    user: 'uyean69divikr5u4',
    password: 'OS3aXufqHwFbTrhzTrPj',
    database: 'blsj1wqmfmkypexcxtvj',
    waitForConnections: true, // Esperar conexiones si el pool está lleno
    connectionLimit: 10,      // Número máximo de conexiones en el pool
    queueLimit: 0             // Sin límite en la cola de espera
});

// Función para obtener una conexión del pool
function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err); // Si hay un error, rechazar la promesa
            }
            resolve(connection); // Si la conexión se obtiene correctamente, resolver la promesa
        });
    });
}

// Función para cerrar todas las conexiones del pool
function endPool() {
    pool.end(err => {
        if (err) {
            console.error('Error al cerrar el pool de conexiones:', err);
        } else {
            console.log('Pool de conexiones cerrado');
        }
    });
}

module.exports = {
    getConnection,
    endPool
};
