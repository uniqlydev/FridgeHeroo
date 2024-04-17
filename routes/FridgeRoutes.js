const express = require('express')
const router = express.Router()
const userFridgeController = require('../controllers/UserFridgeController')

router.get('/getFridge', userFridgeController.retrieveUserFridge)
router.post('/deduct', userFridgeController.deductQuantity)

module.exports = router