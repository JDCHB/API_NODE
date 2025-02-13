const express = require('express');
const router = express.Router();
const imgController = require('../controllers/Img_controller')

// Rutas para manejar imágenes
router.get('/mostrar', imgController.getAllImgs); 
router.get('/:id', imgController.getImgById); 
router.post('/crear', imgController.addImg); 
router.put('/:id', imgController.updateImg); 
router.delete('/:id', imgController.deleteImg);

module.exports = router;
