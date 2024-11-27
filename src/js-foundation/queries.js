
function verifyAccess(conexion, dni, correo_electronico) {
    return new Promise((resolve, reject) => {
        const query = 'CALL verificar_acceso(?, ?)';
        
        conexion.query(query, [dni, correo_electronico], (error, results) => {
            if (error) {
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
