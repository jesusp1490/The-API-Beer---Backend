const mongoose = require('mongoose');

// Definir el esquema de la cerveza
const beerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    country: { type: String, required: true },
    ingredients: { type: [String], required: true }, 
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

// Crear el modelo de la cerveza
const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
