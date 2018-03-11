var firebase = require('./firebaseConfig');
const database = firebase.database;
const DB_WORKSHOP = "Workshop";
const DB_USERS = "Users";
const DB_CHECKED_IN = "CheckedIn";

module.exports = {
  //READ WORKSHOPS FROM FIREBASE
  getWorkshop: function (){
  	//Get all workshop info
  	database.ref(DB_WORKSHOP).once('value').then(function(workshopsSnapshot) {
      //Retrievd workshops
  		workshopsSnapshot.forEach(function(workshopSnapshot) {
  			var workshop = workshopSnapshot.val();
  			console.log(JSON.stringify(workshopSnapshot.key));
  		});
  	}, function(error) {
  	  console.error(error);
  	});
  },
  //ADDD WORKSHOP TO DATABASE
  //0 is bronze, 1 is silver, 2 is gold
  createWorkshop: function (workshopName, workshopDescription, workshopVacancy,
     workshopTiming, workshopLocation, workshopCompletionLevel) {
  	var values =
  	{
      workshopName: workshopName,
      workshopDescription: workshopDescription,
      workshopokVacancy: workshopVacancy,
      workshopTiming: workshopTiming,
      workshopLocation: workshopLocation,
      workshopCompletionLevel: workshopCompletionLevel
  	}
  	database.ref(DB_WORKSHOP).push(values).then(function(result) {
    	console.log("Workshop Add Success: " + result);
  	}, function(error) {
    	console.log("Workshop Add: " + error);
  	});
  },
  //UPDATE WORKSHOP
  updateWorkshop: function (key, workshopName, workshopDescription, workshopVacancy, workshopTiming, workshopLocation){
  	var values =
  	{
      workshopName: workshopName,
      workshopDescription: workshopDescription,
      workshopVacancy: workshopVacancy,
      workshopTiming: workshopTiming,
      workshopLocation: workshopLocation
  	}

  	database.ref(DB_WORKSHOP + '/' + key).update(values).then(function(result) {
    	console.log("Workshop Update Success: " + result);
  	}, function(error) {
    	console.log("Workshop Update: " + error);
  	});
  },
  //DELETE WORKSHOP FROM DATABASE
  deleteWorkshop: function (key){
  	database.ref(DB_WORKSHOP + '/' + key).remove();
  },
  //USER FUNCTIONS
  //CREATE Users
  createUser: function(name, emailAddress, password, mobileNumber, authCode, isAdmin){
    var values =
  	{
      name: name,
      emailAddress: emailAddress,
      password: password,
      mobileNumber: mobileNumber,
      authCode: authCode,
      skillsCompleted: null,
      isAdmin: isAdmin
  	}
    database.ref(DB_USERS).push(values).then(function(result) {
    	console.log("User Add Success: " + result);
  	}, function(error) {
    	console.log("User Add: " + error);
  	});
  },
  //Login User
  loginUser: function(emailAddress, password){
    //Get checked in user
    database.ref(DB_USERS).once('value').then(function(snapshots) {
      snapshots.forEach(function(snapshot) {
        var user = snapshot.val();
        if(user.emailAddress===emailAddress && user.password===password){
          console.log("login user");
          return;
        }
        console.log("user not fond");
      });
    }, function(error) {
      console.error(error);
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
  //GET CHECKED IN USERS
  getCheckedInUsers: function (){
  	database.ref(DB_CHECKED_IN).once('value').then(function(snapshots) {
      //Retrievd workshops
      snapshots.forEach(function(snapshot) {
        var checkedInUser = snapshot.val();
        console.log(JSON.stringify(checkedInUser.key));
      });
  	}, function(error) {
  		console.error(error);
  		return null;
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
