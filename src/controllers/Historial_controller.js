const axios = require('axios'); // Para enviar webhooks a FastAPI
const Historial_Ubicacion = require('../models/historial_model'); 


exports.create = async (req, res) => {
    try {
        const { id_usuario, latitud, longitud, lugar } = req.body;
        const id = await Historial_Ubicacion.create(id_usuario, latitud, longitud, lugar);
        res.status(201).json({ id, message: 'Registro creado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el registro' });
    }
};

// Obtener todos los registros
exports.findAll = async (req, res) => {
    try {
        const registros = await Historial_Ubicacion.findAll();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
};

// Obtener un registro por ID
exports.findOne = async (req, res) => {
    try {
        const registro = await Historial_Ubicacion.findOne(req.params.id);
        if (registro) {
            res.status(200).json(registro);
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el registro' });
    }
};

// Actualizar un registro
exports.update = async (req, res) => {
    try {
        const { id_usuario, latitud, longitud, lugar, estado } = req.body;
        const affectedRows = await Historial_Ubicacion.update(req.params.id, id_usuario, latitud, longitud, lugar, estado);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Registro actualizado' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el registro' });
    }
};

// Eliminar un registro
exports.delete = async (req, res) => {
    try {
        const affectedRows = await Historial_Ubicacion.remove(req.params.id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Registro eliminado' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};