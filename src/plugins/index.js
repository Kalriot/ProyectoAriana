const app = require('./express.plugin'); // Importar instancia de express
const { connect, endConnection } = require('./get-conexion.plugin'); // Conexión a BD

module.exports = { connect, endConnection ,app, };
