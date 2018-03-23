var firebase = require('./firebaseConfig');
const database = firebase.database;

const DB_WORKSHOP = "Workshop";
const DB_USERS = "Users";
const DB_CHECKED_IN = "CheckedIn";

module.exports = {
  unregister: function(workshopId, registrationEntry, callback){
    var ref =  database.ref(DB_WORKSHOP+'/'+workshopId).child("signedUp");
    return ref.once("value",function(registrationSnapshot){
      var success = false;
      var registrationDetails = {};
      registrationSnapshot.forEach(function(registration){
        registrationDetails = registration.val();
        var nameMatch = registrationDetails["name"] == registrationEntry["name"];
        var contactMatch = registrationDetails["contact"] == registrationEntry["contact"];
        var emailMatch = registrationDetails["email"] == registrationEntry["email"];
        //match all fields and ensure only 1 entry is removed
        if(nameMatch && contactMatch && emailMatch && !success){
          ref.child(registration.key).remove();
          success = true;
        }
      });
      callback(success);
    }); 
  },

  checkInOut: function(authCode, callback){
    console.log(authCode);
    var success = true;
    // 1. check if user is alr check in
	  // 2. if yes, remove. if no. add in.
    callback(success);
  },

  //SIGN USER UP FOR COURSE
  signUpWorkshop: function(data, callback){
    let workshopId = data.workshopId
    //Get workshop
    return database.ref(DB_WORKSHOP + '/' + workshopId).once("value", function(workshopSnapshot) {
      workshop = workshopSnapshot.val();
      //Remove workshopid
      data.workshopId = null;
      if(workshop.signedUp === undefined)
      {
         //Add to list
         workshop.signedUp = [data];
       }else{
         //Alr have sign ups add to list
          workshop.signedUp.push(data);
       }
       //Update db
       database.ref(DB_WORKSHOP + '/' + workshopId).update(workshop).then(function(result) {
         callback(true);
       }, function(error) {
         callback(error);
       });
     });
  },
  
  //LOOK FOR COURSE WITH ID 
  getWorkshopWithId: function(id, callback){
    var ref = database.ref(DB_WORKSHOP).child(id);
    return ref.once('value', function(workshopSnapshot) {
      //success callback
      var workshopDetails = workshopSnapshot.val();
      var formattedWorkshop = {};
      if(workshopDetails){
        formattedWorkshop = {
          "title": workshopDetails.workshopName,
          "desc": workshopDetails.workshopDescription,
          "occupied": workshopDetails.workshopOccupied,
          "vacancy": workshopDetails.workshopVacancy,
          "location": workshopDetails.workshopLocation,
          "image": workshopDetails.workshopImage,
          "date": workshopDetails.workshopDate,
          "time": workshopDetails.workshopTiming,
          "level": workshopDetails.workshopLevel,
          "id":workshopSnapshot.key
        };
      }
      callback(formattedWorkshop);
    });
  },

  getAdminWorkshopWithId: function(id, callback){
    var ref = database.ref(DB_WORKSHOP+'/'+id);
    return ref.once('value', function(workshopSnapshot) {
      //success callback
      var workshopDetails = workshopSnapshot.val();
      var formattedWorkshop = {};
      if(workshopDetails){
        formattedWorkshop = {
          "title": workshopDetails.workshopName,
          "desc": workshopDetails.workshopDescription,
          "occupied": workshopDetails.workshopOccupied,
          "vacancy": workshopDetails.workshopVacancy,
          "location": workshopDetails.workshopLocation,
          "image": workshopDetails.workshopImage,
          "date": workshopDetails.workshopDate,
          "time": workshopDetails.workshopTiming,
          "id":workshopSnapshot.key,
        };
        var registrationsSnapshot = workshopDetails.signedUp;
        var registrations = [];
        if(registrationsSnapshot){
          registrationsSnapshot.forEach(reg=>{
            registrations.push(reg);
          });  
        }
      }
      callback(formattedWorkshop, registrations);
    });
  },
  //READ WORKSHOPS FROM FIREBASE
  getWorkshop: function (callback){
  	//Get all workshop info
    var ref = database.ref(DB_WORKSHOP);
    return ref.once('value', function(workshopsSnapshot) {
      //success callback
      var workshops = [];
      workshopsSnapshot.forEach(workshop=>{
        var workshopDetails = workshop.val();
        var formattedWorkshop = {
          "title": workshopDetails.workshopName,
          "desc": workshopDetails.workshopDescription,
          "occupied": workshopDetails.workshopOccupied,
          "vacancy": workshopDetails.workshopVacancy,
          "location": workshopDetails.workshopLocation,
          "image": "workshopDetails.workshopImage",
          "date": workshopDetails.workshopDate,
          "time": workshopDetails.workshopTiming,
          "id": workshop.key
        };
        workshops.push(formattedWorkshop);
      });
      callback(workshops);
    });
  },

  //ADDD WORKSHOP TO DATABASE
  //0 is bronze, 1 is silver, 2 is gold

  createWorkshop: function (workshopName, workshopDescription, workshopVacancy,
     workshopTiming, workshopLocation, workshopCompletionLevel, workshopImage, callback) {
  	var values =
  	{
      workshopName: workshopName,
      workshopDescription: workshopDescription,
      workshopokVacancy: workshopVacancy,
      workshopTiming: workshopTiming,
      workshopLocation: workshopLocation,
      workshopCompletionLevel: workshopCompletionLevel,
      workshopImage: workshopImage
  	}
  	database.ref(DB_WORKSHOP).push(values).then(function(result) {
    	console.log("Workshop Add Success: " + result);
      callback(true);
  	}, function(error) {
    	console.log("Workshop Add: " + error);
      callback(false);
  	});
  },
  //UPDATE WORKSHOP
  updateWorkshop: function (key, workshopName, workshopDescription, workshopVacancy,workshopDate, workshopTiming, workshopLocation, workshopLevel, callback){
  	var values =
  	{
      workshopName: workshopName,
      workshopDescription: workshopDescription,
      workshopVacancy: workshopVacancy,
      workshopDate: workshopDate,
      workshopTiming: workshopTiming,
      workshopLocation: workshopLocation,
      workshopVacancy: workshopVacancy,
      workshopLevel: workshopLevel
  	}

  	database.ref(DB_WORKSHOP + '/' + key).update(values).then(function(result) {
    	console.log("Workshop Update Success");
      callback(true);
  	}, function(error) {
    	console.log("Workshop Update: " + error);
      callback(false);
  	});
  },
  //DELETE WORKSHOP FROM DATABASE
  deleteWorkshop: function (key){
  	database.ref(DB_WORKSHOP + '/' + key).remove();
  },
  //USER FUNCTIONS
  //CREATE Users
  createUser: function(name, emailAddress, password, mobileNumber, authCode, isAdmin, workshopName){
    var values =
  	{
      name: name,
      emailAddress: emailAddress,
      password: password,
      mobileNumber: mobileNumber,
      authCode: authCode,
      workshopsCompleted: workshopName,
      isAdmin: isAdmin
  	}
    database.ref(DB_USERS).push(values).then(function(result) {
    	console.log("User Add Success: " + result);
  	}, function(error) {
    	console.log("User Add: " + error);
  	});
  },
  //Login User
  loginUser: function(emailAddress, password, callback){
    //Get checked in user
    return database.ref(DB_USERS).once('value').then(function(snapshots) {
      snapshots.forEach(function(snapshot) {
        var user = snapshot.val();
        if(user.emailAddress===emailAddress && user.password===password && user.isAdmin){
          var user = {
            emailAddress: user.emailAddress,
            isAdmin: user.isAdmin
          }
          callback(user);
        }
      });
      callback(null);
    }, function(error) {
        callback(null);
    });
  },
  //GET CHECKED IN USERS
  getCheckedInUsers: function (callback){
    return database.ref(DB_CHECKED_IN).once('value').then(function(snapshots) {
      //Retrievd workshops
      var checkedInUsers = [];
      snapshots.forEach(function(snapshot) {
        var checkedInUser = snapshot.val();
        checkedInUsers.push(checkedInUser);
      });
      callback(checkedInUsers);
    }, function(error) {
      console.error(error);
      callback([]);
    });
  },
  //Check IN USER
  checkInUser: function (name, phoneNumber){
  	var values =
  	{
  		name: name,
  		phoneNumber: phoneNumber,
  	}
  	database.ref(DB_CHECKED_IN).push(values).then(function(result) {
  		console.log("Workshop Check In Success: " + result);
  	}, function(error) {
  		console.log("Workshop Check Out Error: " + error);
  	});
  },

  //CHECKOUT USER
  checkOutUser: function  (name, phoneNumber){
  	//Get checked in user
  	database.ref(DB_CHECKED_IN).once('value').then(function(snapshots) {
  		snapshots.forEach(function(snapshot) {
  			var checkedInUserKey = snapshot.key;
  			var checkedInUser = snapshot.val();
        if(checkedInUser.name===name && checkedInUser.phoneNumber===phoneNumber){
          database.ref(DB_CHECKED_IN + '/' + checkedInUserKey).remove();
        }
  		});
  	}, function(error) {
  	  console.error(error);
  	});
  }
}
