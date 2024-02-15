const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.get('/', (req, res) => {
    res.send('Hello from the back!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
