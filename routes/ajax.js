const dbUtil = require('../firebaseCollection');
var res;

module.exports = function(app){
	app.get("/ajax", function(req, resp){
		res = resp
		ajaxReply = handleAjax(req.query.action,req.query.param);
	});
}

function handleAjax(action, param,res){
	reply = "";
	
	if(action == "getAllWorkshops"){
		getAllWorkshops();
	}else if(action == "getAllCourseAdmin"){
		reply = getAllCourseAdmin();
	}else if(action == "getCourseDetails"){
		reply = getCourseDetails(param);
	}else if(action == "getCheckedInUsers"){
		reply = getCheckedInUsers();
	}else if(action == "signup"){
		signUpForWorkshop(param);
	}else if(action == "getCourseParticipants"){
		reply = getCourseParticipants(param);
	}else if(action == "checkin"){
		checkInOut(param);
	}

	return reply;
}

function getAllWorkshops(){
	//get all course from db
	workshopPromise = dbUtil.getWorkshop(function(data){
		//work with data here
		res.send(data);
		res.end;
	});
}

function getAllCourseAdmin(){
	//get all course from db
}

function getCourse(courseIdentity){
	//get specific course from db
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
	dbUtil.checkInOut(authCode);
	//do db function to
	// 1. check if user is alr check in
	// 2. if yes, remove. if no. add in.
}