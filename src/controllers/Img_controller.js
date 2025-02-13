const Img = require('../models/Img_model');

module.exports = {
    getAllImgs: (req, res) => {
        Img.getAllImgs((err, result) => {
            if (err) {
                res.status(500).send({ message: err.message || 'Error al obtener las imágenes' });
            } else {
                res.status(200).json(result);
            }
        });
    },

    getImgById: (req, res) => {
        const { id } = req.params;
        Img.getImgById(id, (err, result) => {
            if (err) {
                res.status(500).send({ message: err.message || `Error obteniendo la imagen con ID ${id}` });
            } else {
                res.status(200).json(result);
            }
        });
    },

    addImg: (req, res) => {
        const { imagen, descripcion } = req.body;
        Img.addImg(imagen, descripcion, (err, result) => {
            if (err) {
                res.status(500).send({ message: err.message || 'Error al agregar la imagen' });
            } else {
                res.status(201).json(result);
            }
        });
    },

    updateImg: (req, res) => {
        const { id } = req.params;
        const { imagen, descripcion, estado } = req.body;

        Img.updateImg(id, imagen, descripcion, estado, (err, result) => {
            if (err) {
                res.status(500).send({ message: err.message || 'Error al actualizar la imagen' });
            } else {
                res.status(200).json(result);
            }
        });
    },

    deleteImg: (req, res) => {
        const { id } = req.params;
        Img.deleteImg(id, (err, result) => {
            if (err) {
                res.status(500).send({ message: err.message || `Error eliminando la imagen con ID ${id}` });
            } else {
                res.status(200).json({ message: `Imagen con ID ${id} eliminada` });
            }
        });
    }
};
