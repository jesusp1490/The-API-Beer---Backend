const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    country: { type: String, required: true },
    ingredients: { type: String },
    price: { type: Number },
    description: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Beer', beerSchema);
