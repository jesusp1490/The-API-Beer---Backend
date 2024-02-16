const express = require('express');
const router = express.Router();
const beerController = require('../controllers/beerControllers');
const { uploadImageToCloudinary } = require('../../middleware/uploadFile');

// Rutas para las cervezas
router.get('/', beerController.getAllBeers);
router.get('/:id', beerController.getBeerById);
router.post('/', uploadImageToCloudinary, beerController.addBeerWithImage); 
router.put('/:id', beerController.updateBeer);
router.delete('/:id', beerController.deleteBeer);

module.exports = router;
