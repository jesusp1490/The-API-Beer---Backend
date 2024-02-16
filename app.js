const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const beerRoutes = require('./src/api/routes/beerRoutes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Middleware para analizar el cuerpo de las solicitudes entrantes
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/beerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

// Rutas de la API de cervezas
app.use('/api/beers', beerRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
