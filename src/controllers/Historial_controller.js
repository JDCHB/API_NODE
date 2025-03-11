const Historial_Ubicacion = require('../models/Historial_model'); // Importa el modelo

const historialController = {
    // Obtener todo el historial de ubicaciones
    async obtenerHistorial(req, res) {
        try {
            Historial_Ubicacion.getAllHistorial((err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(result);
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener historial' });
        }
    },

    // Obtener historial por usuario
    async obtenerHistorialPorUsuario(req, res) {
        const { usuario_id } = req.params;
        try {
            const result = await Historial_Ubicacion.obtenerUbicacionPorUsuario(usuario_id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener historial' });
        }
    },

    // Registrar o actualizar historial de ubicación
    async actualizarHistorial(req, res) {
        const { usuario_id, latitud, longitud, direccion } = req.body;
        try {
            const result = await Historial_Ubicacion.actualizarHistorial(usuario_id, latitud, longitud, direccion);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar historial' });
        }
    },

    // Desactivar ubicación activa
    async desactivarUbicacion(req, res) {
        const { usuario_id } = req.body;
        try {
            const result = await Historial_Ubicacion.desactivarUbicacion(usuario_id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error al desactivar ubicación' });
        }
    },

    // Crear historial
    async crearHistorial(req, res) {
        try {
            const { usuario_id, latitud, longitud, direccion } = req.body;

            // Validación de datos
            if (!usuario_id || !latitud || !longitud || !direccion) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            // Crear historial en la base de datos
            const result = await Historial_Ubicacion.crearHistorial(usuario_id, latitud, longitud, direccion);
            return res.status(201).json(result);
        } catch (error) {
            console.error('❌ Error al crear historial:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = historialController;
