const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const beerRoutes = require('./src/api/routes/beerRoutes');
const dotenv = require('dotenv');
const connectDB = require('./src/utils/db');
dotenv.config();
const app = express();


// Middleware para analizar el cuerpo de las solicitudes entrantes
app.use(bodyParser.json());

// Conexión a MongoDB
connectDB();

// Rutas de la API de cervezas
app.use('/api/beers', beerRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
