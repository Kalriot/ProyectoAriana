const app = require('./express.plugin'); // Importar instancia de express
const { connect, endConnection } = require('./get-conexion.plugin'); // Conexión a BD no tocar esta cosa es un sufrimiento

module.exports = { connect, endConnection ,app, };
