const QRCode = require('qrcode')

const generateQR = async URL => (await QRCode.toDataURL(URL))

module.exports = {
    generateQR
}
