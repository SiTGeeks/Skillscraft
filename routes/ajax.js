const dbUtil = require('../firebaseCollection');
const emailUtil = require('../emailUtils');
var res;

module.exports = function(app){
	app.get("/ajax", function(req, resp){
		res = resp
		handleAjax(req);
	});
}

function handleAjax(req){
	var action = getQueryActionFromRequest(req);
	var param = getQueryParamFromRequest(req);

	if(action == "getAllWorkshops"){
		getAllWorkshops();
	}else if(action == "getAllCourseAdmin"){
		getAllCourseAdmin();
	}else if(action == "getCourseDetails"){
		getCourseDetails(param);
	}else if(action == "getCheckedInUsers"){
		getCheckedInUsers();
	}else if(action == "signup"){
		signUpForWorkshop(param);
	}else if(action == "checkin"){
		checkInOut(param);
	}else if(action == "unregister"){
		unregister(param);
	}else if(action == "reminderEmail"){
		sendReminderEmail(getWorkshopIdFromURL(param));
	}else if(action == "deleteWorkshop"){
		deleteWorkshop(getWorkshopIdFromURL(param));
	}else if(action == "endWorkshop"){
		endWorkshop(getWorkshopIdFromURL(param));
	}
}

function getAllWorkshops(){
	//get all course from db
	dbUtil.getWorkshop(function(data){
		//work with data here
		res.send(data);
		res.end();
	});
}

function getCheckedInUsers(){
	//get all checked in users & details from db
	dbUtil.getCheckedInUsers(function(data){
		res.send(data);
		res.end();
	});
}

function signUpForWorkshop(userDetails){
	//add user details to users signed up for the course
	dbUtil.signUpWorkshop(userDetails, function(data){
		res.send(data);
		res.end();
	});
}

function checkInOut(authCode){
	//check in/out user
	console.log(authCode);
	dbUtil.checkInOutUser (authCode, function(success){
		res.send(success);
		res.end();
	});
	//do db function to

	// 3. return false if invalid, true if valid
}

function unregister(registrationEntry){
	var workshopId = registrationEntry['workshopId'];
	delete registrationEntry['workshopId'];
	dbUtil.unregister(workshopId,registrationEntry, function(success){
		res.send(success);
		res.end();
	});
}

function sendReminderEmail(workshopId){
	dbUtil.getAdminWorkshopWithId(workshopId, function(formattedWorkshop, registrations){
		var mailContent = emailUtil.createWorkshopReminderMail(formattedWorkshop);
		console.log("Sending reminder email to:");
		var emails = [];
		for(var i=0; i<registrations.length; i++){
			var email = registrations[i]["email"];
			emails.push(email);
		}
		emailUtil.sendMail(mailContent, emails.toString());
	});
}

function deleteWorkshop(workshopId){
	dbUtil.getAdminWorkshopWithId(workshopId, function(formattedWorkshop, registrations){
		var mailContent = emailUtil.createWorkshopCancelMail(formattedWorkshop);
		var emails = [];
		for(var i=0; i<registrations.length; i++){
			var email = registrations[i]["email"];
			emails.push(email);
		}
		if(emails.length > 0){
			emailUtil.sendMail(mailContent, emails.toString());
		}
		dbUtil.deleteWorkshop(workshopId);
	});
}

function endWorkshop(workshopId){
	dbUtil.getAdminWorkshopWithId(workshopId, function(formattedWorkshop, registrations){
		for(var i=0; i<registrations.length; i++){
			var authQR; //GENERATE QR HERE 
			var mailContent = emailUtil.createWorkshopCancelMail(authQR);
			var email = registrations[i]["email"];
			emailUtil.sendMail(mailContent, email);
		}
	});
}

function getWorkshopIdFromURL(url){
	var urlParts = url.split("/");
	var workshopId = urlParts[urlParts.length-1];
	return workshopId;
}

function getQueryActionFromRequest(req){
	return req.query.action
}

function getQueryParamFromRequest(req){
	return req.query.param
}