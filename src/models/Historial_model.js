const connection = require('../configuration/DB_config');
const axios = require('axios');

const FASTAPI_WEBHOOK_URL = 'http://127.0.0.1:8000/webhook/ubicacion';

class Historial_Ubicacion {
    // Obtener todo el historial de ubicaciones
    async getAllHistorial() {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM historial_ubicaciones');
            return rows;
        } catch (error) {
            console.error('❌ Error al obtener el historial:', error);
            throw new Error('Error al obtener el historial');
        }
    }

    // Obtener historial por ID
    async getHistorialById(id) {
        try {
            const [rows] = await connection.promise().query(
                'SELECT * FROM historial_ubicaciones WHERE id = ?',
                [id]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error('❌ Error al obtener historial por ID:', error);
            throw new Error('Error al obtener historial por ID');
        }
    }

    // Crear un nuevo historial
    async crearHistorial(usuario_id, latitud, longitud, direccion) {
        try {
            const query = `INSERT INTO historial_ubicaciones (usuario_id, latitud, longitud, direccion, estado, created_at, updated_at) 
                           VALUES (?, ?, ?, ?, 1, NOW(), NOW())`;
            await connection.execute(query, [usuario_id, latitud, longitud, direccion]);
            return { message: 'Historial creado con éxito' };
        } catch (error) {
            console.error('❌ Error al insertar historial:', error);
            throw new Error('Error al guardar el historial');
        }
    }

    // Actualizar historial si existe, de lo contrario, insertar
    async actualizarHistorial(usuario_id, latitud, longitud, direccion) {
        try {
            const [result] = await connection.promise().query(
                'SELECT id FROM historial_ubicaciones WHERE usuario_id = ? AND estado = 1',
                [usuario_id]
            );

            if (result.length > 0) {
                await connection.promise().query(
                    `UPDATE historial_ubicaciones 
                     SET latitud = ?, longitud = ?, direccion = ?, updated_at = NOW() 
                     WHERE usuario_id = ? AND estado = 1`,
                    [latitud, longitud, direccion, usuario_id]
                );
            } else {
                await this.crearHistorial(usuario_id, latitud, longitud, direccion);
            }

            // Sincronizar con FastAPI
            await axios.post(FASTAPI_WEBHOOK_URL, {
                usuario_id,
                latitud,
                longitud,
                direccion,
                timestamp: new Date().toISOString()
            });

            return { message: 'Ubicación sincronizada con éxito' };
        } catch (error) {
            console.error('❌ Error al actualizar historial:', error);
            throw new Error('Error al actualizar historial');
        }
    }

    // Obtener ubicaciones por usuario
    async obtenerUbicacionPorUsuario(usuario_id) {
        try {
            const [result] = await connection.promise().query(
                'SELECT id, latitud, longitud, direccion, created_at, updated_at, estado FROM historial_ubicaciones WHERE usuario_id = ? ORDER BY updated_at DESC',
                [usuario_id]
            );

            if (result.length === 0) {
                return { message: 'No se encontraron ubicaciones para este usuario' };
            }
            return result;
        } catch (error) {
            console.error('❌ Error al obtener ubicaciones:', error);
            throw new Error('Error al obtener ubicaciones');
        }
    }

    // Desactivar la ubicación de un usuario
    async desactivarUbicacion(usuario_id) {
        try {
            const [result] = await connection.promise().query(
                'UPDATE historial_ubicaciones SET estado = 0, updated_at = NOW() WHERE usuario_id = ? AND estado = 1',
                [usuario_id]
            );

            if (result.affectedRows > 0) {
                return { message: 'Ubicación desactivada correctamente' };
            } else {
                return { message: 'No se encontró una ubicación activa para desactivar' };
            }
        } catch (error) {
            console.error('❌ Error al desactivar ubicación:', error);
            throw new Error('Error al desactivar la ubicación');
        }
    }
}

module.exports = new Historial_Ubicacion();
