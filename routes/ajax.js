const dbUtil = require('../firebaseCollection');
var res;

module.exports = function(app){
	app.get("/ajax", function(req, resp){
		res = resp
		handleAjax(req.query.action,req.query.param);
	});
}

function handleAjax(action, param){
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
	dbUtil.signUpWorkshop(userDetails)
}

function getCourseParticipants(courseIdentity){
	//get all users interested in a course
}

function checkInOut(authCode){
	//check in/out user
	checkInOut = dbUtil.checkInOut(authCode, function(success){
		res.send(success);
		res.end;
	});
	//do db function to

	// 3. return false if invalid, true if valid
}

function unregister(registrationEntry){
	console.log(registrationEntry);
	dbUtil.unregister(registrationEntry, function(success){
		res.send(success);
		res.end;
	});
}