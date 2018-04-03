const firebase = require("firebase");
// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

const config = {
		apiKey: "AIzaSyDSuN1fqMhrv1-ozD2RL5YTt9xIclKHCXI",
		authDomain: "skillscraft-c5065.firebaseapp.com",
		databaseURL: "https://skillscraft-c5065.firebaseio.com",
		projectId: "skillscraft-c5065",
		storageBucket: "skillscraft-c5065.appspot.com",
		messagingSenderId: "584167045036"
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
