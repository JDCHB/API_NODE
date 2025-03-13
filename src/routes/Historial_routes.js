const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historial_controller');

router.post('/', historialController.create);       // Crear un nuevo registro
router.get('/', historialController.findAll);      // Obtener todos los registros
router.get('/:id', historialController.findOne);  // Obtener un registro por ID
router.put('/:id', historialController.update);   // Actualizar un registro
router.delete('/:id', historialController.delete); // Eliminar un registro




module.exports = router;
