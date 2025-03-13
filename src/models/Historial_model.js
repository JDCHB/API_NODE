const db = require('../configuration/DB_config');

// Crear un nuevo registro
const create = async (id_usuario, latitud, longitud, lugar) => {
    const [result] = await db.execute(
        'INSERT INTO historial_ubicaciones (id_usuario, latitud, longitud, lugar) VALUES (?, ?, ?, ?)',
        [id_usuario, latitud, longitud, lugar]
    );
    return result.insertId;
};

// Obtener todos los registros
const findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM historial_ubicaciones');
    return rows;
};

// Obtener un registro por ID
const findOne = async (id) => {
    const [rows] = await db.execute('SELECT * FROM historial_ubicaciones WHERE id = ?', [id]);
    return rows[0];
};

// Actualizar un registro
const update = async (id, id_usuario, latitud, longitud, lugar, estado) => {
    const [result] = await db.execute(
        'UPDATE historial_ubicaciones SET id_usuario = ?, latitud = ?, longitud = ?, lugar = ?, estado = ? WHERE id = ?',
        [id_usuario, latitud, longitud, lugar, estado, id]
    );
    return result.affectedRows;
};

// Eliminar un registro
const remove = async (id) => {
    const [result] = await db.execute('DELETE FROM historial_ubicaciones WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
