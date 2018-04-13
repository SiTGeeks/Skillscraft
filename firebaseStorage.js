//Google cloud storag
// Imports the Google Cloud client library
const fs = require('fs');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

const path = require('path');
const Storage = require('@google-cloud/storage');

const storageBucket = new Storage({
    projectId: 'skillcrafttesting',
    keyFilename: 'skillcraft_firebase_credentials.json',
});

const bucket = storageBucket.bucket('skillcrafttesting.appspot.com');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){ 
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = {
      getImage: function(imageName, callback){
        bucket.getFiles()
            .then(results => {
              const files = results[0];
              files.forEach(file => {
                console.log(file.name);
        				return file.getSignedUrl({
        					action: 'read',
        					expires: '03-09-2491'
        				}).then(signedUrls => {
        						// console.log('signed URL', signedUrls[0]); // this will contain the picture's url
                    callback(signedUrls[0]);
        		});
              });
            })
            .catch(err => {
              // console.error('ERROR:', err);
            });
      },
      //Image name would be the key for the workshop, path is path to image
      uploadImage: function (imageName, imagePath, callback){

        const file = fs.readFile(imagePath, 'utf8', function (err, data) {
          if (err) {
              console.log(err);
              throw err;
          }
         console.log('result read: ' + data.minetype);
    });
      },
}
