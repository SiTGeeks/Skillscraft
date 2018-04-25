var firebase = require('./firebaseConfig');
const qrUtil = require('./QRUtils');
const database = firebase.database;

const DB_WORKSHOP = "Workshop";
const DB_USERS = "Users";
const DB_CHECKED_IN = "CheckedIn";
const DB_QUALIFICATIONS = "Qualifications";

module.exports = {
  getQualifications: function(callback){
    var ref = database.ref(DB_QUALIFICATIONS)
    return ref.once("value", function(snapshots){
      var retrievedQualificationList = [];
      snapshots.forEach(function(snapshot){
          retrievedQualification = snapshot.val();
          retrievedQualification["id"] = snapshot.key;
          retrievedQualificationList.push(retrievedQualification);
      });
      callback(retrievedQualificationList);
    });
  },

  getAllUsers: function(callback){
    var ref = database.ref(DB_USERS)
    return ref.once("value", function(usersSnapshot){
      var users = [];
      usersSnapshot.forEach(function(userSnapshot){
          var user = {};
          userDetails = userSnapshot.val();
          user["name"] = userDetails["name"];
          user["email"] = userDetails["emailAddress"];
          user["contact"] = userDetails["mobileNumber"];
          user["skills"] = userDetails["qualifications"];
          user["id"] = userSnapshot.key;
          users.push(user);
      });
      callback(users);
    });
  },

  getUserById: function(id, callback){
    var ref = database.ref(DB_USERS).child(id);
    return ref.once('value', function(userSnapshot) {
      //success callback
      var userDetails = userSnapshot.val();
      var formattedUser = {};
      if(userDetails){
        formattedUser = {
          "name": userDetails["name"],
          "email": userDetails["emailAddress"],
          "contact": userDetails["mobileNumber"],
          "skills": userDetails["qualifications"].split(','),
          "id":userSnapshot.key
        };
      }
      callback(formattedUser);
    });
  },

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
      var occupied = 0;
      if(workshopDetails.signedUp != undefined){
        occupied = workshopDetails.signedUp.length;
      }
      if(workshopDetails){
        formattedWorkshop = {
          "title": workshopDetails.workshopName,
          "desc": workshopDetails.workshopDescription,
          "occupied": occupied,
          "vacancy": workshopDetails.workshopVacancy,
          "location": workshopDetails.workshopLocation,
          "image": workshopDetails.workshopImage,
          "date": workshopDetails.workshopDate,
          "time": workshopDetails.workshopTiming,
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
      var occupied = 0;
      if(workshopDetails.signedUp != undefined){
        occupied = workshopDetails.signedUp.length;
      }
      if(workshopDetails){
        formattedWorkshop = {
          "title": workshopDetails.workshopName,
          "desc": workshopDetails.workshopDescription,
          "occupied": occupied,
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
  getWorkshops: function (callback){
    //Get all workshop info
    var ref = database.ref(DB_WORKSHOP);
    return ref.once('value', function(workshopsSnapshot) {
      //success callback
      var workshops = [];
      workshopsSnapshot.forEach(workshop=>{
        var workshopDetails = workshop.val();
        var occupied = 0;
        if(workshopDetails.signedUp != undefined){
          occupied = workshopDetails.signedUp.length;
        }
        var formattedWorkshop = {
          "title": workshopDetails.workshopName,
          "desc": workshopDetails.workshopDescription,
          "occupied": occupied,
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

  createWorkshop: function (workshopName, workshopDescription, workshopLocation,
     workshopVacancy, workshopDate, workshopTiming, workshopLevel, workshopImage, callback) {
    var values =
    {
      workshopName: workshopName,
      workshopDescription: workshopDescription,
      workshopLocation: workshopLocation,
      workshopVacancy: workshopVacancy,
      workshopDate: workshopDate,
      workshopTiming: workshopTiming,
      workshopLevel: workshopLevel,
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
  updateWorkshop: function (key, workshopName, workshopDescription, workshopVacancy, workshopTiming, workshopLocation, callback){
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
  checkInOutUser: function (authCode, callback){
    //Check if user exist in check in
    return database.ref(DB_CHECKED_IN).once('value').then(function(snapshots) {
      var isCheckInFound = false;
      //Check for checkin
      snapshots.forEach(function(snapshot) {
        var checkedInUserKey = snapshot.key;
        var checkedInUser = snapshot.val();

        //Checked in user found
        if(checkedInUser.authCode === authCode){
          //Checkout
          database.ref(DB_CHECKED_IN + '/' + checkedInUserKey).remove();
          isCheckInFound = true;
          callback(true);
        }
      });
      //No checkin user found. Check in current user with auth code
      if(!isCheckInFound){
        //Look for user
        database.ref(DB_USERS).once('value').then(function(snapshots) {
        var userFound = false;
        snapshots.forEach(function(snapshot) {
          var user = snapshot.val();
          //Check if authcode found
          if(user.authCode === authCode){
            userFound = true;
            //Authcode found. Add user to current user database
            var values =
              {
                name: user.name,
                contact: user.mobileNumber,
                authCode: user.authCode,
                qualifications: user.qualifications,
              }
              database.ref(DB_CHECKED_IN).push(values).then(function(result) {
                //Check in
                callback(true);
              }, function(error) {
                //Check in error
                callback(false);
              });
            }
          });
          //No user found
          if(!userFound){
            //Invalid auth code. no user found
            callback(false);
          }
        }, function(error) {
          //Retrieve user info error
          callback(false);
        });
      }
    }, function(error) {
      //Get checkin user error
      callback(false);
    });
  },

  createUpdateAccount: function(regDetails, workshop,callback){
    var ref =  database.ref(DB_USERS).once('value');
    ref.then(function(snapshots){
      var user = snapshots.orderByChild("emailAddress").equalTo(regDetails['email']);
      if(user!=null){
        user.qualifications = user.qualifications + "," + workshop;
        database.ref(DB_WORKSHOP + '/' + user.key).update(values).then(function(result) {
          console.log("User Update Success: " + result);
          callback(true);
        }, function(error) {
          console.log("User Update: " + error);
          callback(false);
        });
      }else{
        var newAccount = {
          authCode: qrUtil.generateAuthCode(),
          emailAddress: regDetails['email'],
          isAdmin: false,
          mobileNumber: regDetails['contact'],
          name: regDetails['name'],
          qualifications: workshop
        }
        ref.append(newAccount);
      }
    });
  },

  removeCompetencyFromUser: function(competency, id, callback){
    console.log("fbcollet remove");
    var ref = database.ref(DB_USERS).child(id);
    ref.once('value').then(function(snapshots){
      console.log(competency);
      var userInfo = snapshots.val();
      var qualificationList = userInfo.qualifications.split(',');
      //Check comeptency in list
      var index = qualificationList.indexOf(competency);
      if(index != -1){
        qualificationList.splice(index, 1);
        console.log(qualificationList);
        userInfo.qualifications = qualificationList.join();
      }
      console.log(userInfo);

      //Update user data
      ref.update(userInfo).then(function(result) {
        console.log("Competency Update Success: " + result);
        callback(true);
      }, function(error) {
        console.log("Competency Update: " + error);
        callback(false);
      });
    }, function(error) {
      console.log("Competency Update: " + error);
      callback(false);
    });
  },

  createCompetency: function(qualification){
    database.ref(DB_QUALIFICATIONS).push(qualification).then(function(result) {
      console.log("Qualification Add Success: " + result);
    }, function(error) {
      console.log("Qualification Add: " + error);
    });
  },

  removeCompetency: function(qualification, callback){
    console.log("remove competen:" + qualification);
    database.ref(DB_QUALIFICATIONS).once('value').then(function(snapshots){
      snapshots.forEach(function(snapshot) {
        if(snapshot.val() == qualification){
          snapshot.ref.remove();
        }
      });
      callback(true);
    }, function(error) {
      callback(false);
      console.log("Qualification remove: " + error);
    });
  }
}
