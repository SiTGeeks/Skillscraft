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
	}else if(action == "getCourseParticipants"){
		getCourseParticipants(param);
	}else if(action == "checkin"){
		checkInOut(param);
	}else if(action == "unregister"){
		unregister(param);
	}else if(action == "endWorkshop"){
		sendReminderEmail(getWorkshopIdFromHost(req));
	}else if(action == "deleteWorkshop"){
		deleteWorkshop(getWorkshopIdFromHost(req));
	}else if(action == "reminderEmail"){
		endWorkshop(getWorkshopIdFromHost(req));
	}
}

function getAllWorkshops(){
	//get all course from db
	workshopPromise = dbUtil.getWorkshop(function(data){
		//work with data here
		res.send(data);
		res.end;
	});
}

function getCheckedInUsers(){
	//get all checked in users & details from db

}

function signUpForWorkshop(userDetails){
	//add user details to users signed up for the course
	dbUtil.signUpWorkshop(userDetails, function(data){
		res.send(data);
		res.end;
	});
}

function getCourseParticipants(courseIdentity){
	//get all users interested in a course
}

function checkInOut(authCode){
	//check in/out user
	dbUtil.checkInOut(authCode, function(success){
		res.send(success);
		res.end;
	});
	//do db function to

	// 3. return false if invalid, true if valid
}

function unregister(registrationEntry){
	var workshopId = registrationEntry['workshopId'];
	delete registrationEntry['workshopId'];
	dbUtil.unregister(workshopId,registrationEntry, function(success){
		res.send(success);
		res.end;
	});
}

function sendReminderEmail(workshopId){
	dbUtil.getAdminWorkshopWithId(workshopId, function(formattedWorkshop, registrations){
		var mailContent = emailUtil.createWorkshopReminderMail(formattedWorkshop);
		for(var i=0; i<registrations.length; i++){
			var email = registrations[i]["email"];
			emailUtil.sendMail(mailContent, email);
		}
	});
}

function deleteWorkshop(workshopId){
	dbUtil.getAdminWorkshopWithId(workshopId, function(formattedWorkshop, registrations){
		var mailContent = emailUtil.createWorkshopCancelMail(formattedWorkshop);
		for(var i=0; i<registrations.length; i++){
			var email = registrations[i]["email"];
			emailUtil.sendMail(mailContent, email);
		}
	});
}

function endWorksho(workshopId){
	//TODO
	dbUtil.getAdminWorkshopWithId(workshopId, function(formattedWorkshop, registrations){
		var mailContent = emailUtil.createWorkshopCancelMail(formattedWorkshop);
		for(var i=0; i<registrations.length; i++){
			var email = registrations[i]["email"];
			emailUtil.sendMail(mailContent, email);
		}
	});
}

function getWorkshopIdRequest(req){
	var host = req.headers.host;
	var hostParts = host.split("/");
	var workshopId = hostParts[hostParts.length-1];
	return workshopId;
}

function getQueryActionFromRequest(req){
	return req.query.action
}

function getQueryParamFromRequest(req){
	return req.query.param
}