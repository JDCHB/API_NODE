const express = require('express');
const router = express.Router();

const historialController = require('../controllers/Historial_controller');

router.get('/historial', historialController.obtenerHistorial);
router.get('/:usuario_id', historialController.obtenerHistorialPorUsuario);
router.post('/historial', historialController.actualizarHistorial);
router.put('/historial', historialController.desactivarUbicacion);
router.post('/crear', historialController.crearHistorial);

module.exports = router;