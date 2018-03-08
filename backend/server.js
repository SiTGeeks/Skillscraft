const express = require('express');
const crypto = require('crypto');
const qr = require('qr-image');
const nodemailer = require('nodemailer');
const app = express();

//res object represents the HTTP response that an Express app sends when it gets an HTTP request
//get from https://expressjs.com/en/4x/api.html#res

app.get('/crypto', function(req, res)){
    //generation of crypto
    let token = crypto.randomBytes(32).toString('base64');
    //debug
    console.log(token);
    //send to browser
    res.send(token);
};

app.get('/email', function (req, res) {
	// Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,// true for 465, false for other ports
            auth: {
                user: '<some user name>@gmail.com',
                pass: '<some pass>'
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        }
    );
	
	//Generation of secure token
	let token = crypto.randomBytes(32).toString('base64');
    /*
    Do some check with db to ensure doesn't exist else re-generate
    */

    //convert to QRCode
	let QRcode = qr.imageSync(token, { type: 'png' });

    // Message object
    let message = {
        // Comma separated list of recipients
        to: '<Some recipients>',

        // Subject of the message
        subject: '<Some subject>',

        // plaintext body
        text: 'QRCode generated',

        // HTML body
        html:
            '<p>This is <b>your</b> QRcode: </p>' +
            '<p><img src="cid:qrcode"/></p>',

		// An array of attachments
        attachments: [
            {
                filename: 'qrcode.png',
                content: QRcode,
                cid: 'qrcode' // should be as unique as possible
            }
        ]
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }
        // only needed when using pooled connections
        transporter.close();
	});
	res.send("Done!");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
