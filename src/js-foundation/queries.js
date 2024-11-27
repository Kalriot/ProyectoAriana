const { connect } = require('../plugins/get-conexion.plugin'); // Importa el método para obtener la conexión

async function verifyAccess(dni, correo_electronico) {
    return new Promise((resolve, reject) => {
        const connection = connect();  // Obtiene la conexión

        // Verificar si la conexión está abierta antes de ejecutar la consulta
        if (connection.state === 'disconnected') {
            console.log("La conexión está cerrada. Intentando reconectar...");
            // Intentamos reconectar
            connection.connect(err => {
                if (err) {
                    console.error('Error al reconectar con la base de datos:', err);
                    return reject(err);  // Si no puede reconectar, rechazamos la promesa
                }
                console.log("Reconectado a la base de datos.");
            });
        }

        const query = 'CALL verificar_acceso(?, ?)';  // Procedimiento almacenado

        // Ejecutar la consulta en la conexión abierta
        connection.query(query, [dni, correo_electronico], (error, results) => {
            if (error) {
                console.error('Error en la consulta:', error);
                return reject(error);  // Si ocurre un error, rechazamos la promesa
            }

            const resultado = results[0] && results[0][0] && results[0][0].resultado;
            const estudiante_id = results[0] && results[0][0] && results[0][0].estudiante_id;

            // Verificar si `resultado` es 1 y retornar el `id_estudiante`
            if (resultado === 1) {
                resolve({
                    acceso_permitido: true,
                    id_estudiante: estudiante_id
                });
            } else {
                resolve({ acceso_permitido: false });
            }
        });
    });
}

module.exports = { verifyAccess };
