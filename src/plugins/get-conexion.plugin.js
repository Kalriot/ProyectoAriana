const mysql = require('mysql2');


let connection;

function connect() {
    if (!connection) {
        connection = mysql.createConnection({
            host: 'blsj1wqmfmkypexcxtvj-mysql.services.clever-cloud.com',
            user: 'uyean69divikr5u4',
            password: 'OS3aXufqHwFbTrhzTrPj',
            database: 'blsj1wqmfmkypexcxtvj',
        });
        connection.connect(err => {
            if (err) {
                console.error('Error  al conectar con la base de datos:', err);
            } else {
                console.log('Conectado a la base de datos');
            }
        });
    }
    return connection;
}
function endConnection() {
    if (connection) {
        connection.end(err => {
            if (err) {
                console.error('Error al cerrar la conexión:', err);
            } else {
                console.log('Conexión cerrada');
            }
        });
    }
}

module.exports = {
    connect,
    endConnection
};