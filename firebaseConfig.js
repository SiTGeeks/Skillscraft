const firebase = require("firebase");

const config = {
	apiKey: "AIzaSyBQZsMFuR4rYWWyq_NSVjzYeSpjWhEKGmY",
    authDomain: "skillcrafttesting.firebaseapp.com",
    databaseURL: "https://skillcrafttesting.firebaseio.com",
    projectId: "skillcrafttesting",
    storageBucket: "skillcrafttesting.appspot.com",
    messagingSenderId: "1013997108947"
};

firebase.initializeApp(config)

module.exports = {
  database: firebase.database()
};
