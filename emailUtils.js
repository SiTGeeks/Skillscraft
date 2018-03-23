const nodeMailer = require('nodemailer');

module.exports = {
	createNewMemberMail: function(authQR){
		return {
			subject: "Welcome to skillcraft",
			html:
				'<p>This is <b>your</b> QRcode: </p>' +
	            '<p><img src="cid:qrcode"/></p>',
	        attachments: [{
                filename: 'qrcode.png',
                content: QRcode,
                cid: 'qrcode'
            }]
		};
	},

	createWorkshopCancelMail: function(workshopDetails){
		return {
			subject: "Welcome to skillcraft",
			html:
				'<p>The following workshop has been cancelled:</p>'+
				'<p>Workshop: ' + workshopDetails['name'] + '</p>'+
				'<p>Location: ' + workshopDetails['location'] + '</p>'+
				'<p>Date: ' + workshopDetails['date'] + '</p>'+
				'<p>Time: ' + workshopDetails['time'] + '</p>'+
				'<p>Sorry for any inconvinience caused, hope to see you in the near future.</p>',
		};
	},

	createWorkshopReminderMail: function(workshopDetails){
		return {
			subject: "Welcome to skillcraft",
			html:
				'<p>This is a reminder for the workshop you have signed up interest for:</p>'+
				'<p>Workshop: ' + workshopDetails['name'] + '</p>'+
				'<p>Location: ' + workshopDetails['location'] + '</p>'+
				'<p>Date: ' + workshopDetails['date'] + '</p>'+
				'<p>Time: ' + workshopDetails['time'] + '</p>'+
				'<p>See you there!</p>',
		};
	},

	createWorkshopRegistrationMail: function(workshopDetails){
		return {
			subject: "Welcome to skillcraft",
			html:
				'<p>Thank you for showing interest in the workshop:</p>'+
				'<p>Workshop: ' + workshopDetails['name'] + '</p>'+
				'<p>Location: ' + workshopDetails['location'] + '</p>'+
				'<p>Date: ' + workshopDetails['date'] + '</p>'+
				'<p>Time: ' + workshopDetails['time'] + '</p>'+
				'<p>See you there!</p>'
		};
	},

	sendMail: function(mail, address){
		mail['from'] = '"SkillCraft" <sc.test2018@gmail.com>';
		mail['to'] = address;
		transporter = createTransporter();
		transporter.sendMail(mail, (error, info) => {
			if(error){
				console.log('Error occurred while sending e-mail:');
	            console.log(error.message);	
			}
			//return process.exit(1);
		});
		transporter.close();
	}
}

function createTransporter(){
	return nodeMailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,// true for 465, false for other ports
            auth: {
                user: 'sc.test2018@gmail.com',
                pass: 'skillcraft'
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        }
    );
}