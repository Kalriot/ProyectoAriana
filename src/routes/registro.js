// src/routes/registro.js
const express = require('express');
const router = express.Router();
const { verifyAccess } = require('../js-foundation/queries'); 
const { connect } = require('../plugins'); 

const conexion = connect();

router.get('/', (req, res) => {
    res.render('registro'); 
});

router.post('/validar', async (req, res) => {
    let { correo, contrasena } = req.body;

    if (correo.includes('@')) {
        correo = correo.split('@')[0];
    }
    correo += '@unmsm.edu.pe';
    try {
        const accesoPermitido = await verifyAccess(conexion, contrasena, correo);
        
        if (accesoPermitido.acceso_permitido) {
            const idEstudiante = accesoPermitido.id_estudiante;
            res.redirect(`/denuncia?id_estudiante=${idEstudiante}`);
        } else {
            res.send('Acceso denegado');
        }
    } catch (error) {
        console.error('Error en la verificación de acceso:', error);
        res.status(500).send('Error al verificar acceso');
    }
});

module.exports = router;