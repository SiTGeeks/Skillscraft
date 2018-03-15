const firebase = require("firebase");
// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

const config = {
	apiKey: "AIzaSyBQZsMFuR4rYWWyq_NSVjzYeSpjWhEKGmY",
    authDomain: "skillcrafttesting.firebaseapp.com",
    databaseURL: "https://skillcrafttesting.firebaseio.com",
    projectId: "skillcrafttesting",
    storageBucket: "skillcrafttesting.appspot.com",
    messagingSenderId: "1013997108947"
};


//Google cloud storag
const storage = new Storage({
    projectId: 'skillcrafttesting',
    keyFilename: 'skillcraft_firebase_credentials.json',
});

const bucket = storage.bucket('skillcrafttesting.appspot.com').getFiles()
    .then(results => {
      const files = results[0];
      console.log('Files:');
      files.forEach(file => {
        // console.log(file.name);
      });
    })
    .catch(err => {
      // console.error('ERROR:', err);
    });
firebase.initializeApp(config)
module.exports = {
  database: firebase.database(),
};
