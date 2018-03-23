const host = '127.0.0.1';
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('client-sessions');
const firebase = require('firebase');
// const firebaseConfig = {
// 	apiKey: "AIzaSyBQZsMFuR4rYWWyq_NSVjzYeSpjWhEKGmY",
// 	authDomain: "skillcrafttesting.firebaseapp.com",
// 	databaseURL: "https://skillcrafttesting.firebaseio.com",
// 	projectId: "skillcrafttesting",
// 	storageBucket: "skillcrafttesting.appspot.com",
// 	messagingSenderId: "1013997108947"
// };
// firebase.initializeApp(firebaseConfig);

const qrUtils = require('./QRUtils');
const dbUtil = require('./firebaseCollection')
const app = express();

app.use(session({
	cookieName: 'session',
	secret: '/m/`/ |-|34r|27t /w/!g|_|_ 90 0|nn|',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	httpOnly: true,
	secure: true,
	ephemeral: true
}));

app.use(function(req, res, next) {
	if (req.session && req.session.user) {
		//get user details
		user = "";
		if (user) {
			req.user = user;
			delete req.user.password;
			req.session.user = user; 
			res.locals.user = user;
		}
		next();
	}else{
		next();
	}
});

//view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

// Static
app.use(express.static('./public'));
// app.use(express.static(path.join(__dirname, '/public')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./routes')(app);

app.listen(port, function(){
	console.log("Listening to port "+port);
	// dbUtil.checkOutUser("WERTYUIJHGFDSA", function(result){
	// 	console.log(result)
	// })
	//dbUtil.loginUser("skillcraft@sc.com","skillcraft");
});


