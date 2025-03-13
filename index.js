const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const historialRoutes = require('./src/routes/Historial_routes');
const imgRoutes = require('./src/routes/imgRoutes');

const app = express();
const PORT = 3000;

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

app.use(bodyParser.json());

// Rutas
app.use('/historial', historialRoutes);
app.use('/imagenes', imgRoutes);
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});





