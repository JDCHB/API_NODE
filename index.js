const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const imgRoutes = require('./src/routes/imgRoutes');
const historialroutes = require('./src/routes/Historial_routes');

const app = express();
const PORT = 3000;
app.use(cors());

app.use(bodyParser.json());

app.use('/imagenes', imgRoutes);
app.use('/historial', historialroutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});