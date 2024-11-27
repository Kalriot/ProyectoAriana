const { connect } = require('../plugins/get-conexion.plugin'); // Asegúrate de que este sea el correcto

async function verifyAccess(dni, correo_electronico) {
    return new Promise((resolve, reject) => {
        let connection = connect(); // Obtén la conexión

        // Verificar si la conexión está cerrada, y reconectar si es necesario
        if (connection.state === 'disconnected') {
            console.log("La conexión está cerrada. Intentando reconectar...");
            connection = connect(); // Reconectar
        }

        const query = 'CALL verificar_acceso(?, ?)';
        
        connection.query(query, [dni, correo_electronico], (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                return reject(error);
            }

            const resultado = results[0] && results[0][0] && results[0][0].resultado;
            const estudiante_id = results[0] && results[0][0] && results[0][0].estudiante_id;

            // Verificar si `resultado` es 1 y obtener `id_estudiante`
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
