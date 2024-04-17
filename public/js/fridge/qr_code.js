document.addEventListener('DOMContentLoaded', async function() {
    // Generate QR code
    const qrCodeData = "hello";
    const qrCodeImage = await generateQRCode(qrCodeData);

    // Display QR code
    const qrCodeImgElement = document.getElementById('qr_code');
    qrCodeImgElement.src = qrCodeImage;

    // Handle QR code scan
    qrCodeImgElement.addEventListener('click', function() {
        // Redirect to /confirm with itemname and quantity query parameters
        const item = document.getElementById('item').innerText;
        const quantity = document.getElementById('quantity').innerText; // Replace '10' with the actual quantity variable
        window.location.href = `/confirm?itemname=${encodeURIComponent(item)}&quantity=${quantity}`;
    });
});

// Generate QR Code
async function generateQRCode(data) {
    // For simplicity, let's use a simple QR code generator library
    // You can replace this with your preferred QR code generation method
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=200x200`;
    return qrCodeUrl;
}
