const Beer = require('../models/Beer');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Definir el esquema de validación para una cerveza
const beerSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    country: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().uri() // Actualizado para incluir la URL de la imagen
});

// Obtener todas las cervezas
router.getAllBeers = async (req, res) => {
    try {
        const beers = await Beer.find();
        res.json(beers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una cerveza por su ID
router.getBeerById = async (req, res) => {
    try {
        const beer = await Beer.findById(req.params.id);
        if (!beer) {
            return res.status(404).json({ message: 'Cerveza no encontrada' });
        }
        res.json(beer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Agregar una nueva cerveza con imagen
router.addBeerWithImage = async (req, res) => {
    const { error } = beerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const beer = new Beer({
        name: req.body.name,
        category: req.body.category,
        country: req.body.country,
        ingredients: req.body.ingredients,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl // Actualizado para incluir la URL de la imagen
    });

    try {
        const newBeer = await beer.save();
        res.status(201).json(newBeer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una cerveza existente
router.updateBeer = async (req, res) => {
    try {
        const beer = await Beer.findById(req.params.id);
        if (!beer) {
            return res.status(404).json({ message: 'Cerveza no encontrada' });
        }

        const { error } = beerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        beer.set(req.body);
        const updatedBeer = await beer.save();
        res.json(updatedBeer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una cerveza existente
router.deleteBeer = async (req, res) => {
    try {
        const beer = await Beer.findById(req.params.id);
        if (!beer) {
            return res.status(404).json({ message: 'Cerveza no encontrada' });
        }
        await beer.remove();
        res.json({ message: 'Cerveza eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = router;
