module.exports = function(app){
	//get functions
	app.get("/", function(req, res){
		//homepage
		res.render('index');
		res.end();
	});

	app.get("/checkin", function(req, res){
		//QR sign in page
	});

	app.get("/workshop/", function(req, res){
		//browse workshops
		res.render('workshop');
		res.end();
	});

	app.get("/workshop/ws", function(req, res){
		//workshop details
		console.log(req.query.ws);
		//fetch db using ws
		res.render('item');
		res.end();
	});

	//post functions
	app.post("/workshp/signup/ws", function(req,res){
		course = "";
		name = req.body.name;
		email = req.body.email;
		contact = req.body.contact;
		
		db.signUpCourse(course, name, email, contact);
	});
};


