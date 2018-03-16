const qr = require('qr-image');

module.export = {
	generateQR: function(authCode){
		var QRcode = qr.imageSync(token, { type: 'png' });
		return QRcode;
	}
}