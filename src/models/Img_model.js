const connection = require('../configuration/DB_config');

class Img {
    getAllImgs(callback) {
        const query = 'SELECT * FROM imagenes';
        connection.query(query, callback);
    }

    getImgById(id, callback) {
        const query = 'SELECT * FROM imagenes WHERE id = ?';
        connection.query(query, [id], callback);
    }

    addImg(imagen, descripcion, callback) {
        const query = 'INSERT INTO imagenes (url_imagen, descripcion, estado, created_at, updated_at) VALUES (?, ?, 1, NOW(), NOW())';
        connection.query(query, [imagen, descripcion], (err, result) => {
            if (err) return callback(err, null);
            callback(null, { id: result.insertId, imagen, descripcion, estado: 1, created_at: new Date(), updated_at: new Date() });
        });
    }

    updateImg(id, imagen, descripcion, estado, callback) {
        const query = 'UPDATE imagenes SET url_imagen = ?, descripcion = ?, estado = ?, updated_at = NOW() WHERE id = ?';
        connection.query(query, [imagen, descripcion, estado, id], (err, result) => {
            if (err) return callback(err, null);
            if (result.affectedRows === 0) {
                return callback({ message: "No se encontró la imagen o los datos son iguales" }, null);
            }
            callback(null, { message: "Imagen actualizada correctamente", id, imagen, descripcion, estado });
        });
    }

    deleteImg(id, callback) {
        const query = 'DELETE FROM imagenes WHERE id = ?';
        connection.query(query, [id], callback);
    }
}

module.exports = new Img();
