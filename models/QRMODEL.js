const qr = require('qrcode');

class QRCode {
    static async generateQRCode(data) {
        try {
            // Generate QR code
            const qrCodeImage = await qr.toDataURL(data);
            return qrCodeImage;
        } catch (error) {
            throw new Error('Error generating QR code');
        }
    }
}

module.exports = QRCode;
