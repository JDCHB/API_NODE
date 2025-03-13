const express = require('express');
const bodyParser = require('body-parser');
const historialRoutes = require('./src/routes/Historial_routes');
const imgRoutes = require('./src/routes/imgRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Rutas
app.use('/historial', historialRoutes);
app.use('/imagenes', imgRoutes);
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});





