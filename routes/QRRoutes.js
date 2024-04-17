const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const QRCodeController = require('../controllers/QRCodeController');

router.post('/generate-qrcode', [
    body('data').notEmpty().withMessage('Data is required'),
], QRCodeController.generateQRCode);

module.exports = router;
