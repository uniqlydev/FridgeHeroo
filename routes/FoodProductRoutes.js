const express = require('express');
const router = express.Router();
const FoodProductsController = require('../controllers/FoodProductsController');

router.post('/add', FoodProductsController.addProduct);

module.exports = router;