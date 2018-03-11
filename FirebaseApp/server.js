const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var firebaseCollection = require('./firebaseCollection');

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.listen(3000, function () {
  //
  // firebaseCollection.createUser(
  //   "edwin",
  //   "edwinwong94@gmail.com",
  //   "123123123",
  //   "91380729",
  //   null,
  //   true
  // );

  // firebaseCollection.loginUser("edwinwong94@gmail.com", "123123123")
  // firebaseCollection.getWorkshop();
  // firebaseCollection.createWorkshop(
  //   "workshop1",
  //   "workshopdes",
  //   "workshopVacancy",
  //   "worstime",
  //   "worloca",
  //   0
  // );
  // firebaseCollection.updateWorkshop(
  //   "-L7IauqyqORwJhTvPreF",
  //   "updateedName",
  //   "upddesc",
  //   "updvac",
  //   "updt",
  //   "updaloc"
  // )
  // firebaseCollection.deleteWorkshop("-L7IauqyqORwJhTvPreF");

  // firebaseCollection.checkInUser("checkin use1r","usernuber");
  // firebaseCollection.checkOutUser("checkin use1r","usernuber");
	console.log('Example app listening on port 3000!')
})
