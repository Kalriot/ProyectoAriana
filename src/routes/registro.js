// src/routes/registro.js
const express = require('express');
const router = express.Router();
const { verifyAccess } = require('../js-foundation/queries'); 
const { connect } = require('../plugins'); 
const multer = require('multer'); 

const upload = multer();  

const conexion = connect();

router.get('/', (req, res) => {
    res.render('registro'); 
});


router.post('/validar', upload.none(), async (req, res) => {
    let { correo, contrasena } = req.body;

    // Verificar si el correo es válido (agregar el dominio si no está presente)
    if (correo.includes('@')) {
        correo = correo.split('@')[0];  // Aseguramos que solo tomamos la parte antes del @
    }
    correo += '@unmsm.edu.pe';  // Añadimos el dominio institucional

    try {
        // Verificar las credenciales con la base de datos
        const accesoPermitido = await verifyAccess(conexion, contrasena, correo);
        
        if (accesoPermitido.acceso_permitido) {
            // Si el acceso es permitido, redirigir al usuario a la página de denuncia
            const idEstudiante = accesoPermitido.id_estudiante;
            res.redirect(`/denuncia?id_estudiante=${idEstudiante}`);
        } else {
            // Si no es permitido, mostrar mensaje de error
            res.render('registro', { error: 'Acceso denegado. Verifique sus credenciales.' });
        }
    } catch (error) {
        console.error('Error en la verificación de acceso:', error);
        res.status(500).render('registro', { error: 'Error al verificar acceso. Intente nuevamente más tarde.' });
    }
});
module.exports = router;