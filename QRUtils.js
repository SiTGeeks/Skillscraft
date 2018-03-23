const qr = require('qr-image');

module.exports = {
	generateQR: function(authCode){
		var QRcode = qr.imageSync(token, { type: 'png' });
		return QRcode;
	}
}