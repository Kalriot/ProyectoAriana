// src/app.js
const { app, connect, endConnection } = require('./plugins');
const registroRoutes = require('./routes/registro'); 
const denunciaRoutes = require('./routes/denuncia'); 

// Configuración del motor de vistas
app.set('view engine', 'ejs');

// Conectar a la base de datos
const conexion = connect(); 

// Montar las rutas en `app`
app.use('/', registroRoutes);         
app.use('/denuncia', denunciaRoutes); 

// Iniciar el servidor
const PORT = process.env.PORT || 3000;  // Usa el puerto proporcionado por Render
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

process.on('exit', endConnection);
