const dbUtil = require('../firebaseCollection');

module.exports = function(app){
	app.get("/ajax", function(req, res){
		ajaxReply = handleAjax(req.query.action,req.query.param);
		res.json(ajaxReply);
		res.end();
	});
}

function handleAjax(action, param){
	reply = "";
	
	if(action == "getAllWorkshops"){
		reply = getAllWorkshops();
	}else if(action == "getAllCourseAdmin"){
		reply = getAllCourseAdmin();
	}else if(action == "getCourseDetails"){
		reply = getCourseDetails(param);
	}else if(action == "getCheckedInUsers"){
		reply = getCheckedInUsers();
	}else if(action == "signup"){
		reply = signUpForCourse(param);
	}else if(action == "getCourseParticipants"){
		reply = getCourseParticipants(param);
	}

	return reply;
}

function getAllWorkshops(){
	//get all course from db
	var workshops = dbUtil.getWorkshop().then(result => {
  		console.log("result: "+ result);
  		resolve( result);
	});
	console.log(workshops);

	return workshops;
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

function signUpForCourse(userDetails){
	//add user details to users signed up for the course
}

function getCourseParticipants(courseIdentity){
	//get all users interested in a course
}

