const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/utils/db');
const beerRoutes = require('./src/api/routes/beerRoutes');
dotenv.config();

const app = express();

// Rutas
app.get('/', (req, res) => {
    res.send('Hello from the back!');
});

app.use('/api/beers', beerRoutes);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Importar la configuración de conexión a la base de datos
require('./src/utils/db');
connectDB();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => console.error("Error conectado a MongoDB", error));

//Manejo de errores
app.use((req, res, next) => {
    res.status(404).send("Esa ruta no existe");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

module.exports = app;