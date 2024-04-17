const cartController = require('../controllers/CartController');
const express = require('express');
const router = express.Router();

router.post('/addToCart', cartController.addToCart);
router.post('/publishCart', cartController.publishCart);
router.get('/getOrders', cartController.getOrdersByUser);

module.exports = router;