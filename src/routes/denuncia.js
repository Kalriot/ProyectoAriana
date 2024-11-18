const express = require('express');
const router = express.Router();
const { connect } = require('../plugins'); 
const multer = require('multer'); 

const conexion = connect();
const upload = multer(); 

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    const idEstudiante = req.query.id_estudiante;
    const success = req.query.success;

    if (!idEstudiante) {
        return res.status(400).send("ID de estudiante no proporcionado");
    }

    const query = 'SELECT id_estudiante, nombre, codigo, facultad, eap, dni, correo_electronico FROM estudiantes WHERE id_estudiante = ?';
    
    conexion.query(query, [idEstudiante], (error, results) => {
        if (error) {
            console.error('Error al obtener datos del estudiante:', error);
            return res.status(500).send('Error al obtener datos del estudiante');
        }

        if (results.length > 0) {
            res.render('denuncia', { ...results[0], success });
        } else {
            res.status(404).send('Estudiante no encontrado');
        }
    });
});
router.post('/guardar-denuncia', upload.none(), (req, res) => {
    const { id_estudiante, fecha_incidente, lugar, referencia, descripcion, telefono } = req.body;

    // Verifica los datos recibidos en el servidor
    if (!id_estudiante || !fecha_incidente || !lugar || !descripcion || !telefono) {
        console.error('Datos faltantes:', { id_estudiante, fecha_incidente, lugar, descripcion, telefono });
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO denuncias 
        (fecha_incidente, lugar_incidente, referencia, descripcion, telefono, id_estudiante)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexion.query(query, [fecha_incidente, lugar, referencia, descripcion, telefono, id_estudiante], (error, results) => {
        if (error) {
            console.error('Error al guardar la denuncia:', error.message); 
            return res.status(500).json({ success: false, message: `Error al guardar la denuncia: ${error.message}` });
        } else {
            const codigoSeguimiento = `DEN-${results.insertId}`; 
            res.json({ success: true, codigoSeguimiento });
        }
    });
});



module.exports = router;
