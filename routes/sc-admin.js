module.exports = function(app){
	//get functions
	app.get("/sc-admin", function(req, res){
		//admin login page
		res.render("admin");
		res.end();
	});

	// app.get("/sc-admin/home", requireLogin, function(req, res){
	// 	//admin logged in home
	// 	res.render('dashboard',adminDetail);
	// });
	// app.get("/sc-admin/workshop",requireLogin, function(req, res){
	// 	//admin logged in home
	// 	res.render('adminworkshop');
	// });
	// app.get("/sc-admin/create-workshop", requireLogin, function(req, res){
	// 	//admin logged in home
	// 	res.render('addnew');
	// });


	app.get("/sc-admin/home", function(req, res){
		//admin logged in home
		res.render('dashboard');
	});

	app.get("/sc-admin/workshop", function(req, res){
		//admin logged in home
		res.render('adminworkshop');
	});

	app.get("/sc-admin/create-workshop", function(req, res){
		//admin logged in home
		res.render('addnew');
	});


	app.get("/sc-admin/logout", function(req,req){
		req.session.reset();
		req.redirect("/sc-admin/");
	});

	//post functions
	app.post("/sc-admin/login", function(req, res){
		//admin login action

		user = loginValidate();
		if(!user){
			res.render('/sc-admin/login',{error: "Invalid E-mail or password"})
		}else{
			res.session.user = user;
			res.redirect('/sc-admin/home')
		}
	});

	app.post("/sc-admin/createAccounts",requireLogin, function(req,res){
		//create accounts for course attendees
	});

	app.post("/sc-admin/newAdmin", function(req,res){
		//new admin account
	});

}

function requireLogin(req,res,next){
	if(!req.user){
		res.redirect('/sc-admin');
	}else{
		next();
	}
}

