const QRCode = require('../models/QRMODEL');

class QRCodeController {
    static async generateQRCode(req, res) {
        try {
            const { data } = req.body;
            const qrCodeImage = await QRCode.generateQRCode(data);
            return res.status(200).json({ qrCodeImage });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = QRCodeController;
